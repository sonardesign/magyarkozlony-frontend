// ============================================
// Professional Dropdown Component
// ============================================
// Production-ready with accessibility, keyboard navigation, and best practices

export class Dropdown {
  constructor() {
    this.dropdowns = new Map();
    this.activeDropdown = null;
    this.init();
  }

  init() {
    try {
      // Find all dropdown triggers
      const triggers = document.querySelectorAll('[data-dropdown]');
      
      console.log(`🔍 Found ${triggers.length} dropdown trigger(s)`);
      
      if (triggers.length === 0) {
        console.warn('⚠️  No dropdown triggers found with [data-dropdown] attribute');
        return;
      }

      triggers.forEach(trigger => {
        const menuId = trigger.getAttribute('data-dropdown');
        const menu = document.getElementById(menuId);
        
        console.log(`🔍 Looking for menu: #${menuId}`);
        
        if (!menu) {
          console.error(`❌ Dropdown menu not found: #${menuId}`);
          return;
        }

        console.log(`✓ Found menu #${menuId}, creating dropdown...`);
        this.createDropdown(trigger, menu);
      });

      // Global event listeners
      this.bindGlobalEvents();
      
      console.log(`✅ ${this.dropdowns.size} Dropdown(s) initialized successfully!`);
    } catch (error) {
      console.error('❌ Error initializing dropdowns:', error);
    }
  }

  createDropdown(trigger, menu) {
    const wrapper = trigger.closest('.dropdown-wrapper');
    const hiddenInput = wrapper?.querySelector('input[type="hidden"]');
    const selectedTextEl = trigger.querySelector('.dropdown-selected-text');
    const items = Array.from(menu.querySelectorAll('.dropdown-item'));
    
    // Ensure wrapper has relative positioning
    if (wrapper) {
      const wrapperPosition = window.getComputedStyle(wrapper).position;
      if (wrapperPosition === 'static') {
        wrapper.style.position = 'relative';
      }
    }
    
    const dropdown = {
      trigger,
      menu,
      wrapper,
      hiddenInput,
      selectedTextEl,
      items,
      isOpen: false,
      focusedIndex: -1,
      selectedIndex: 0
    };

    // Setup initial state
    this.setupDropdown(dropdown);
    
    // Bind events
    this.bindTriggerEvents(dropdown);
    this.bindItemEvents(dropdown);
    
    // Store dropdown
    this.dropdowns.set(trigger, dropdown);
  }

  setupDropdown(dropdown) {
    const { menu, items, hiddenInput } = dropdown;
    
    // Set initial menu state with critical inline styles
    menu.style.display = 'none';
    menu.style.position = 'absolute';
    menu.style.zIndex = '1000';
    menu.style.minWidth = '100px';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('tabindex', '-1');
    
    // Get initial value
    const initialValue = hiddenInput ? hiddenInput.value : items[0]?.getAttribute('data-value');
    
    // Setup items and find selected one
    items.forEach((item, index) => {
      item.setAttribute('role', 'option');
      item.setAttribute('tabindex', '-1');
      item.setAttribute('data-index', index);
      
      // Check if this item matches the initial value
      const itemValue = item.getAttribute('data-value');
      if (itemValue === initialValue) {
        item.classList.add('is-active');
        dropdown.selectedIndex = index;
      }
    });
  }

  bindTriggerEvents(dropdown) {
    const { trigger } = dropdown;
    
    // Click to toggle
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle(dropdown);
    });

    // Keyboard navigation on trigger
    trigger.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          if (!dropdown.isOpen) {
            this.open(dropdown);
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            this.focusItem(dropdown, 0);
          }
          break;
        case 'Escape':
          if (dropdown.isOpen) {
            e.preventDefault();
            this.close(dropdown);
          }
          break;
      }
    });
  }

  bindItemEvents(dropdown) {
    const { items } = dropdown;
    
    items.forEach((item, index) => {
      // Click selection
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectItem(dropdown, index);
      });

      // Hover
      item.addEventListener('mouseenter', () => {
        this.focusItem(dropdown, index);
      });

      // Keyboard navigation
      item.addEventListener('keydown', (e) => {
        this.handleItemKeydown(dropdown, e, index);
      });
    });
  }

  bindGlobalEvents() {
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.activeDropdown && !e.target.closest('.dropdown-wrapper')) {
        this.close(this.activeDropdown);
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeDropdown) {
        this.close(this.activeDropdown);
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.activeDropdown) {
          this.positionMenu(this.activeDropdown);
        }
      }, 150);
    });
  }

  handleItemKeydown(dropdown, e, currentIndex) {
    const { items } = dropdown;
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        this.focusItem(dropdown, nextIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        this.focusItem(dropdown, prevIndex);
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.selectItem(dropdown, currentIndex);
        break;
        
      case 'Home':
        e.preventDefault();
        this.focusItem(dropdown, 0);
        break;
        
      case 'End':
        e.preventDefault();
        this.focusItem(dropdown, items.length - 1);
        break;
        
      case 'Escape':
        e.preventDefault();
        this.close(dropdown);
        break;
        
      case 'Tab':
        this.close(dropdown);
        break;
        
      default:
        // Type to search
        this.handleTypeToSearch(dropdown, e.key);
    }
  }

  handleTypeToSearch(dropdown, key) {
    const { items } = dropdown;
    
    // Only handle single character keys
    if (key.length !== 1) return;
    
    const char = key.toLowerCase();
    const currentIndex = dropdown.focusedIndex;
    
    // Search from current position
    for (let i = currentIndex + 1; i < items.length; i++) {
      if (items[i].textContent.trim().toLowerCase().startsWith(char)) {
        this.focusItem(dropdown, i);
        return;
      }
    }
    
    // Wrap around to beginning
    for (let i = 0; i <= currentIndex; i++) {
      if (items[i].textContent.trim().toLowerCase().startsWith(char)) {
        this.focusItem(dropdown, i);
        return;
      }
    }
  }

  toggle(dropdown) {
    console.log(`🔄 Toggle dropdown (currently ${dropdown.isOpen ? 'open' : 'closed'})`);
    if (dropdown.isOpen) {
      this.close(dropdown);
    } else {
      this.open(dropdown);
    }
  }

  open(dropdown) {
    const { trigger, menu } = dropdown;
    
    // Close any other open dropdown
    if (this.activeDropdown && this.activeDropdown !== dropdown) {
      this.close(this.activeDropdown);
    }
    
    // Position menu
    this.positionMenu(dropdown);
    
    // Show menu
    menu.style.display = 'block';
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    
    // Force reflow for animation
    menu.offsetHeight;
    
    // Animate in
    menu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    menu.style.opacity = '1';
    menu.style.transform = 'translateY(0)';
    
    // Update state
    dropdown.isOpen = true;
    this.activeDropdown = dropdown;
    
    // Update ARIA
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('dropdown-open');
    
    // Focus first item or selected item
    const indexToFocus = dropdown.selectedIndex >= 0 ? dropdown.selectedIndex : 0;
    this.focusItem(dropdown, indexToFocus);
    
    console.log('🔽 Dropdown opened');
  }

  close(dropdown) {
    if (!dropdown || !dropdown.isOpen) return;
    
    const { trigger, menu } = dropdown;
    
    // Animate out
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    
    // Update state immediately
    dropdown.isOpen = false;
    dropdown.focusedIndex = -1;
    
    // Update ARIA
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('dropdown-open');
    
    // Hide after animation
    setTimeout(() => {
      menu.style.display = 'none';
    }, 200);
    
    // Return focus to trigger
    trigger.focus();
    
    // Clear active dropdown
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
    
    console.log('🔼 Dropdown closed');
  }

  focusItem(dropdown, index) {
    const { items, menu } = dropdown;
    
    if (index < 0 || index >= items.length) return;
    
    // Remove focus from all items
    items.forEach(item => {
      item.classList.remove('is-focused');
      item.setAttribute('aria-selected', 'false');
    });
    
    // Focus new item
    const item = items[index];
    item.classList.add('is-focused');
    item.setAttribute('aria-selected', 'true');
    item.focus();
    
    // Update focused index
    dropdown.focusedIndex = index;
    
    // Scroll into view if needed
    const menuRect = menu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    if (itemRect.bottom > menuRect.bottom) {
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (itemRect.top < menuRect.top) {
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  selectItem(dropdown, index) {
    const { items, selectedTextEl, hiddenInput, trigger } = dropdown;
    const item = items[index];
    
    if (!item) return;
    
    const value = item.getAttribute('data-value');
    const text = item.textContent.trim();
    
    // Update visual selection
    items.forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');
    
    // Update selected text
    if (selectedTextEl) {
      selectedTextEl.textContent = text;
    }
    
    // Update hidden input
    if (hiddenInput) {
      hiddenInput.value = value;
      
      // Trigger change event for form validation
      const event = new Event('change', { bubbles: true });
      hiddenInput.dispatchEvent(event);
    }
    
    // Update selected index
    dropdown.selectedIndex = index;
    
    // Close dropdown
    this.close(dropdown);
    
    console.log(`✓ Selected: ${text} (value: ${value})`);
  }

  positionMenu(dropdown) {
    const { trigger, menu, wrapper } = dropdown;
    
    if (!wrapper) return;
    
    const triggerRect = trigger.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const menuHeight = menu.offsetHeight || 300; // Fallback
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    
    // Determine if menu should open upward
    const openUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;
    
    // Position relative to wrapper
    if (openUpward) {
      menu.style.bottom = `${wrapper.offsetHeight - trigger.offsetTop}px`;
      menu.style.top = 'auto';
    } else {
      menu.style.top = `${trigger.offsetTop + trigger.offsetHeight}px`;
      menu.style.bottom = 'auto';
    }
    
    menu.style.left = `${trigger.offsetLeft}px`;
    menu.style.width = `${triggerRect.width}px`;
  }

  // Public API
  getValue(triggerId) {
    const trigger = document.getElementById(triggerId);
    const dropdown = this.dropdowns.get(trigger);
    return dropdown?.hiddenInput?.value || null;
  }

  setValue(triggerId, value) {
    const trigger = document.getElementById(triggerId);
    const dropdown = this.dropdowns.get(trigger);
    
    if (!dropdown) return;
    
    const index = dropdown.items.findIndex(item => 
      item.getAttribute('data-value') === value
    );
    
    if (index >= 0) {
      this.selectItem(dropdown, index);
    }
  }

  destroy() {
    this.dropdowns.forEach(dropdown => {
      if (dropdown.isOpen) {
        this.close(dropdown);
      }
    });
    this.dropdowns.clear();
    this.activeDropdown = null;
  }
}
