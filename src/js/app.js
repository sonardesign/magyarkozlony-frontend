// ============================================
// Magyar Közlöny - Main Application (SPA)
// ============================================
// Modern Vanilla JavaScript - Single Page Application

import { MobileMenu } from './modules/mobile-menu.js';
import { Dropdown } from './modules/dropdown.js';
import { DatePicker } from './modules/date-picker.js';
import { NavigationState } from './modules/navigation-state.js';
import { initPaginator } from './modules/paginator.js';
import { router } from './modules/router.js';
import { pageLoader } from './modules/page-loader.js';
import { pages } from './modules/pages.js';
import { gazetteData } from './modules/gazette-data.js';
import { gazetteRenderer } from './modules/gazette-renderer.js';

class App {
  constructor() {
    this.modules = {};
    this.router = router;
    this.pageLoader = pageLoader;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  initialize() {
    console.log('🚀 Magyar Közlöny SPA Initializing...');

    // Initialize modules
    this.initializeModules();
    
    // Setup router
    this.setupRouter();
    
    // Initialize router (this will load the initial page)
    this.router.init();

    console.log('✅ SPA initialized successfully');
  }

  initializeModules() {
    console.log('📦 Initializing modules...');

    // Initialize Mobile Menu (persistent across pages)
    if (!this.modules.mobileMenu) {
      this.modules.mobileMenu = new MobileMenu();
    }
    
    // Initialize Dropdowns (need to reinit after page changes)
    if (this.modules.dropdown) {
      this.modules.dropdown.destroy();
    }
    this.modules.dropdown = new Dropdown();
    
    // Initialize Date Pickers (need to reinit after page changes)
    if (this.modules.datePicker) {
      this.modules.datePicker.destroy();
    }
    this.modules.datePicker = new DatePicker();
    
    // Initialize Navigation State Management (persistent)
    if (!this.modules.navigationState) {
      this.modules.navigationState = new NavigationState();
    } else {
      // Update active state for current page
      this.modules.navigationState.updateActiveState();
    }
    
    // Initialize Paginator (need to reinit after page changes)
    initPaginator();

    console.log('✅ Modules initialized');
  }

  setupRouter() {
    console.log('🔧 Setting up router...');

    // Register all routes
    pages.forEach(page => {
      this.router.addRoute(page.path, {
        name: page.name,
        title: page.title,
        isPattern: page.isPattern,
        loader: async (params = {}) => {
          // Handle dynamic pages (home page with pagination)
          if (page.dynamic) {
            return await this.loadDynamicPage(page, params);
          }
          
          // Load static page content from HTML file
          return await this.pageLoader.loadPage(page.path);
        }
      });
    });

    // Set up after navigation callback to reinitialize modules
    this.router.afterNavigate((path) => {
      console.log(`📍 Navigated to: ${path}`);
      
      // Close mobile menu if open
      if (this.modules.mobileMenu && this.modules.mobileMenu.isOpen) {
        this.modules.mobileMenu.close();
      }
      
      // Reinitialize modules that depend on page content
      this.reinitializePageModules();
      
      // Update navigation state
      if (this.modules.navigationState) {
        this.modules.navigationState.updateActiveState();
      }
    });

    console.log('✅ Router configured with', pages.length, 'routes');
  }

  /**
   * Load dynamic page content (e.g., paginated home page)
   * @param {Object} page - Page configuration
   * @param {Object} params - Route parameters
   * @returns {Object} - { headerContent, bodyContent }
   */
  async loadDynamicPage(page, params) {
    console.log('📄 Loading dynamic page:', page.name, 'params:', params);
    
    // Handle home page pagination
    if (page.name === 'index' || page.name === 'index-paginated') {
      const pageNumber = params.page ? parseInt(params.page, 10) : 1;
      
      // Validate page number
      if (isNaN(pageNumber) || pageNumber < 1) {
        console.error('Invalid page number:', params.page);
        return await this.pageLoader.loadPage('/');
      }
      
      // Get paginated data
      const pageData = gazetteData.getPage(pageNumber);
      
      // Render the content
      const bodyContent = `<section class="section body">
        <div class="container">
          ${gazetteRenderer.renderGazetteSection(pageData)}
        </div>
      </section>`;
      
      // Get header content from original HTML
      const originalContent = await this.pageLoader.loadPage('/');
      
      return {
        headerContent: originalContent.headerContent,
        bodyContent: bodyContent
      };
    }
    
    // Fallback: load static content
    return await this.pageLoader.loadPage(page.path);
  }

  reinitializePageModules() {
    console.log('🔄 Reinitializing page-specific modules...');

    // Reinitialize Dropdowns (for dropdowns in the new page content)
    if (this.modules.dropdown) {
      this.modules.dropdown.destroy();
    }
    this.modules.dropdown = new Dropdown();
    
    // Reinitialize Date Pickers (for date pickers in the new page content)
    if (this.modules.datePicker) {
      this.modules.datePicker.destroy();
    }
    this.modules.datePicker = new DatePicker();
    
    // Reinitialize Paginator (for paginators in the new page content)
    initPaginator();

    console.log('✅ Page modules reinitialized');
  }

  /**
   * Destroy the app and clean up all resources
   * Removes all event listeners and clears module state
   */
  destroy() {
    console.log('🧹 Destroying app and cleaning up resources...');
    
    // Clean up all modules
    Object.values(this.modules).forEach(module => {
      if (module && typeof module.destroy === 'function') {
        try {
          module.destroy();
        } catch (error) {
          console.error('Error destroying module:', error);
        }
      }
    });
    
    // Clear modules reference
    this.modules = {};
    
    // Clean up router (defensive check even though router is always defined)
    if (this.router && typeof this.router.destroy === 'function') {
      try {
        this.router.destroy();
      } catch (error) {
        console.error('Error destroying router:', error);
      }
    }
    
    // Clean up page loader cache
    if (this.pageLoader && typeof this.pageLoader.clearCache === 'function') {
      this.pageLoader.clearCache();
    }
    
    console.log('✅ App destroyed successfully');
  }
}

// Initialize app
const app = new App();

// Make app accessible for debugging
if (typeof window !== 'undefined') {
  window.app = app;
}

