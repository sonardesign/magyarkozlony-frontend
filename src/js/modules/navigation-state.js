// ============================================
// Navigation State Module
// ============================================
// Best practice implementation for managing active navigation states
// Works for both desktop and mobile menus

export class NavigationState {
  constructor() {
    this.currentPage = null;
    this.desktopMenuItems = [];
    this.mobileMenuItems = [];
    this.init();
  }

  init() {
    console.log('📍 Navigation State: Initializing...');
    
    // Get current page from body data attribute
    this.currentPage = document.body.getAttribute('data-current-page');
    
    if (!this.currentPage) {
      console.warn('⚠️  No data-current-page attribute found on body');
      return;
    }
    
    console.log(`📄 Current page: ${this.currentPage}`);
    
    // Get all menu items (desktop and mobile)
    this.desktopMenuItems = Array.from(document.querySelectorAll('.secondary-menu-nav .menu-item[data-page]'));
    this.mobileMenuItems = Array.from(document.querySelectorAll('.menu-item-mobile[data-page]'));
    
    console.log(`🔗 Found ${this.desktopMenuItems.length} desktop menu items`);
    console.log(`📱 Found ${this.mobileMenuItems.length} mobile menu items`);
    
    // Set active states
    this.setActiveStates();
    
    console.log('✅ Navigation State: Initialized successfully');
  }

  setActiveStates() {
    // Process desktop menu items
    this.desktopMenuItems.forEach(item => {
      const itemPage = item.getAttribute('data-page');
      
      if (itemPage === this.currentPage) {
        item.classList.add('active');
        console.log(`✓ Set active: Desktop "${itemPage}"`);
      } else {
        item.classList.remove('active');
      }
    });
    
    // Process mobile menu items
    this.mobileMenuItems.forEach(item => {
      const itemPage = item.getAttribute('data-page');
      
      if (itemPage === this.currentPage) {
        item.classList.add('active');
        console.log(`✓ Set active: Mobile "${itemPage}"`);
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * Public method to programmatically change active state
   * Useful for SPA-like navigation without page reload
   * @param {string} pageName - The page identifier
   */
  setActivePage(pageName) {
    console.log(`🔄 Changing active page to: ${pageName}`);
    
    this.currentPage = pageName;
    document.body.setAttribute('data-current-page', pageName);
    this.setActiveStates();
  }

  /**
   * Get the currently active page
   * @returns {string} Current page identifier
   */
  getCurrentPage() {
    return this.currentPage;
  }
}

// Export a standalone initialization function for non-module usage
export function initNavigationState() {
  return new NavigationState();
}
