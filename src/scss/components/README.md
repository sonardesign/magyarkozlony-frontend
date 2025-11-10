# Components Documentation

This directory contains all UI component styles for the Magyar Közlöny website.

## Available Components

### 1. **Button** (`_button.scss`)
Button styles with variants:
- `.button.primary` - Primary action button
- `.button-primary` - Alternative primary button
- `.button-outline` - Outlined button with border

### 2. **Header** (`_header.scss`)
Header and top navigation styles including logo, menu items, and responsive behavior.

### 3. **Navigation** (`_navigation.scss`)
Main navigation menu styles.

### 4. **Search** (`_search.scss`)
Search component styles.

### 5. **Form** (`_form.scss`)
Form elements including:
- `.input-field` - Text input fields (with focus states)
- `.label` - Form labels
- `.form-block` - Form containers
- Focus states match button primary style

### 6. **Card** (`_card.scss`)
Card components for content display.

### 7. **Callout** (`_callout.scss`) ✨ NEW
Information boxes with icon, text, and optional actions.

**Structure:**
```html
<div class="callout green">
  <div class="icon-container-2">
    <i class="ri-information-fill icon"></i>
  </div>
  <div class="content-style">
    <div class="text-3">
      <div class="text-4">Your message here</div>
    </div>
    <div class="actions">
      <div class="primary-action">
        <div class="link-text-4">Action Link</div>
      </div>
    </div>
  </div>
</div>
```

**Variants:**
- `.callout.green` - Green callout (currently implemented)

**Classes:**
- `.callout` - Base callout container
- `.icon-container-2` - Icon wrapper
- `.icon` - Icon element (use with RemixIcon)
- `.content-style` - Content wrapper
- `.text-3` - Text container
- `.text-4` - Main text content
- `.actions` - Actions container
- `.primary-action` - Primary action link wrapper
- `.link-text-4` - Link text styling

### 8. **Sidebar** (`_sidebar.scss`)
Sidebar container for callouts and other sidebar content.

### 9. **Footer** (`_footer.scss`)
Footer styles.

### 10. **Mobile Menu** (`_mobile-menu.scss`)
Mobile responsive menu styles.

### 11. **Dropdown** (`_dropdown.scss`)
Custom dropdown component with:
- `.dropdown-wrapper` - Container
- `.dropdown-trigger` - Trigger button (with focus states)
- `.dropdown-menu` - Dropdown menu
- `.dropdown-item` - Menu items
- Focus states match button primary style

### 12. **Date Picker** (`_date-picker.scss`)
Date picker component styles.

### 13. **Paginator** (`_paginator.scss`) ✨ NEW
Pagination navigation component for browsing through multiple pages.

**Structure:**
```html
<div class="paginator">
  <!-- Previous Button (disabled state) -->
  <button class="paginator-button disabled" disabled aria-label="Previous page">
    <i class="ri-arrow-left-s-line"></i>
  </button>

  <!-- Page Numbers -->
  <a href="#" class="paginator-page active" aria-current="page">1</a>
  <a href="#" class="paginator-page">2</a>
  <a href="#" class="paginator-page">3</a>
  <span class="paginator-page ellipsis">...</span>
  <a href="#" class="paginator-page">14</a>

  <!-- Next Button (enabled state) -->
  <button class="paginator-button enabled" aria-label="Next page">
    <i class="ri-arrow-right-s-line"></i>
  </button>
</div>
```

**Classes:**
- `.paginator` - Container for pagination
- `.paginator-button` - Arrow button (prev/next)
  - `.enabled` - Active arrow (clickable)
  - `.disabled` - Passive arrow (grayed out)
- `.paginator-page` - Page number link
  - `.active` - Current page (bold + underlined)
  - `.ellipsis` - Three dots separator (...)

**States:**
- **Disabled button**: Gray background (#a3abba), not clickable
- **Enabled button**: Teal background, interactive
- **Active page**: Bold, underlined, current page indicator
- **Hover states**: Interactive elements change on hover
- **Focus states**: Accessible keyboard navigation with focus rings

## Component Guidelines

### Adding a New Component

1. Create a new file in this directory: `_component-name.scss`
2. Add the import to `main.scss`:
   ```scss
   @use 'components/component-name';
   ```
3. Follow the structure:
   ```scss
   // ============================================
   // Component Name
   // ============================================
   // Brief description
   
   @use '../abstracts' as *;
   
   .component-name {
     // Your styles here
   }
   ```

### Best Practices

1. **Use Variables**: Always use SCSS variables from `abstracts/_variables.scss`
2. **Responsive Design**: Use mixins from `abstracts/_breakpoints.scss`
3. **BEM Naming**: Use Block-Element-Modifier methodology where appropriate
4. **Focus States**: Match the button primary focus style:
   ```scss
   &:focus {
     outline-color: $color-accent-500;
     outline-offset: 2px;
     outline-width: 2px;
     outline-style: solid;
   }
   ```
5. **Modifiers**: Use `&.modifier-name` for variants
6. **Comments**: Add clear comments for complex logic

### Styling Conventions

- Use `$spacing-*` variables for consistent spacing
- Use `$color-*` variables for all colors
- Use `$border-radius-*` for rounded corners
- Use `$font-*` variables for typography
- Use `$transition-*` for animations

## Focus States

All interactive components (buttons, inputs, dropdowns) should have consistent focus states for accessibility:

```scss
&:focus {
  outline-color: $color-accent-500; // Teal accent
  outline-offset: 2px;
  outline-width: 2px;
  outline-style: solid;
}
```

This ensures keyboard navigation is visible and follows WCAG accessibility guidelines.

