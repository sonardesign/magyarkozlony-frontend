// ============================================
// Magyar Közlöny - Main Application
// ============================================
// Modern Vanilla JavaScript - No frameworks needed

import { MobileMenu } from './modules/mobile-menu.js';
import { Dropdown } from './modules/dropdown.js';
import { DatePicker } from './modules/date-picker.js';
import { NavigationState } from './modules/navigation-state.js';
import { initPaginator } from './modules/paginator.js';

class App {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    console.log('🚀 Magyar Közlöny App Initializing...');

    // Initialize Mobile Menu
    this.modules.mobileMenu = new MobileMenu();
    
    // Initialize Dropdowns
    this.modules.dropdown = new Dropdown();
    
    // Initialize Date Pickers
    this.modules.datePicker = new DatePicker();
    
    // Initialize Navigation State Management
    this.modules.navigationState = new NavigationState();
    
    // Initialize Paginator
    initPaginator();

    console.log('✅ All modules initialized successfully');
  }
}

// Initialize app
new App();

