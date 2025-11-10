// ============================================
// Navigation State Management
// ============================================
// Best practice for active/default menu states

export class NavigationState {
  constructor() {
    this.currentPath = window.location.pathname;
    this.menuItems = [];
    this.init();
  }

  init() {
    // Find all menu items (both desktop and mobile)
    this.menuItems = [
      ...document.querySelectorAll('.main-menu-items'),
      ...document.querySelectorAll('.menu-item'),
      ...document.querySelectorAll('.menu-item-mobile'),
      ...document.querySelectorAll('.secondary-menu-nav .menu-item')
    ];

    if (this.menuItems.length === 0) {
      console.warn('No menu items found');
      return;
    }

    this.setInitialState();
    this.bindEvents();
    this.handleBrowserNavigation();

    console.log(`✓ Navigation State initialized (${this.menuItems.length} items)`);
  }

  setInitialState() {
    this.menuItems.forEach((item) => {
      const link = item.getAttribute('href') || item.querySelector('a')?.getAttribute('href');
      
      if (link && this.isCurrentPage(link)) {
        this.setActive(item);
      }
    });
  }

  bindEvents() {
    this.menuItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const link = item.getAttribute('href');
        
        // Only handle internal links
        if (link && link.startsWith('#')) {
          e.preventDefault();
          this.handleNavigation(item, link);
        } else if (link && !link.startsWith('http')) {
          // Internal page navigation
          this.handleNavigation(item, link);
        }
      });

      // Hover effects
      item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) {
          item.classList.add('hover');
        }
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
      });
    });
  }

  handleNavigation(item, link) {
    // Remove active from all items
    this.clearAllActive();
    
    // Set clicked item as active
    this.setActive(item);
    
    // Update URL (for hash links)
    if (link.startsWith('#')) {
      history.pushState(null, '', link);
      
      // Smooth scroll to section
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    console.log('📍 Navigated to:', link);
  }

  setActive(item) {
    item.classList.add('active');
    item.classList.remove('default', 'hover');
    
    // Add visual indicator (optional - style in CSS)
    item.setAttribute('data-state', 'active');
  }

  setDefault(item) {
    item.classList.remove('active', 'hover');
    item.classList.add('default');
    item.setAttribute('data-state', 'default');
  }

  clearAllActive() {
    this.menuItems.forEach((item) => {
      this.setDefault(item);
    });
  }

  isCurrentPage(link) {
    // Check if link matches current page
    if (link === this.currentPath) return true;
    if (link === '/' && this.currentPath === '') return true;
    if (link.startsWith('#') && window.location.hash === link) return true;
    
    return false;
  }

  handleBrowserNavigation() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
      this.setInitialState();
      console.log('🔙 Browser navigation:', this.currentPath);
    });
  }

  // Public API for manual state updates
  updateState(itemSelector, state = 'active') {
    const item = document.querySelector(itemSelector);
    
    if (!item) {
      console.warn('Menu item not found:', itemSelector);
      return;
    }

    if (state === 'active') {
      this.clearAllActive();
      this.setActive(item);
    } else {
      this.setDefault(item);
    }
  }
}

