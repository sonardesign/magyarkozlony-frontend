// ============================================
// Mobile Menu Toggle
// ============================================

export class MobileMenu {
  constructor() {
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.menuIcon = document.querySelector('.menu-icon');
    this.closeButton = document.querySelector('.close-button');
    this.body = document.body;
    
    this.isOpen = false;
    
    this.init();
  }

  init() {
    if (!this.mobileMenu || !this.menuIcon) {
      console.warn('Mobile menu elements not found');
      return;
    }

    this.bindEvents();
    console.log('✓ Mobile Menu initialized');
  }

  bindEvents() {
    // Open menu when clicking hamburger icon
    this.menuIcon.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    // Close menu when clicking close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Close menu when clicking outside
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.mobileMenu) {
        this.close();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.mobileMenu.style.display = 'flex';
    this.body.style.overflow = 'hidden'; // Prevent body scroll
    this.isOpen = true;
    
    // Add animation class
    requestAnimationFrame(() => {
      this.mobileMenu.classList.add('is-open');
    });

    console.log('📱 Mobile menu opened');
  }

  close() {
    this.mobileMenu.classList.remove('is-open');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.mobileMenu.style.display = 'none';
      this.body.style.overflow = ''; // Restore body scroll
      this.isOpen = false;
    }, 300); // Match CSS transition duration

    console.log('📱 Mobile menu closed');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

