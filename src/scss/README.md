# SCSS Structure Documentation

This directory contains the restructured SCSS files for the Magyar Közlöny website. The original monolithic CSS file has been split into logical, maintainable modules following the 7-1 architecture pattern.

## Directory Structure

```
scss/
├── abstracts/          # Variables, mixins, functions
│   ├── _variables.scss    # Colors, fonts, spacing, etc.
│   ├── _breakpoints.scss  # Media query breakpoints & mixins
│   └── _mixins.scss       # Reusable SCSS mixins
│
├── base/              # Base styles & resets
│   ├── _reset.scss       # CSS reset & normalize
│   ├── _fonts.scss       # Font-face declarations
│   └── _typography.scss  # Typography base styles
│
├── vendors/           # Third-party code
│   └── _webflow-base.scss # Essential Webflow framework
│
├── layout/            # Layout components
│   ├── _container.scss    # Containers & grid
│   └── _utilities.scss    # Helper classes
│
├── components/        # UI Components
│   ├── _button.scss       # Button styles
│   ├── _header.scss       # Header & logo
│   ├── _navigation.scss   # Navigation menus
│   ├── _search.scss       # Search component
│   ├── _form.scss         # Form elements
│   ├── _card.scss         # Card components (generic)
│   ├── _callout.scss      # Callout boxes (info boxes)
│   ├── _sidebar.scss      # Sidebar container
│   ├── _footer.scss       # Footer
│   ├── _mobile-menu.scss  # Mobile menu
│   ├── _dropdown.scss     # Dropdown component
│   └── _date-picker.scss  # Date picker component
│
├── pages/             # Page-specific styles
│   ├── _home.scss         # Homepage (index.html) specific
│   └── _tanusitvanyok.scss # Certificates page
│
└── main.scss          # Main entry point
```

## Architecture Pattern

This structure follows the **7-1 Pattern**:
- 7 folders for different types of files
- 1 main file (`main.scss`) that imports all partials

## Variables

All design tokens have been extracted to `abstracts/_variables.scss`:

### Colors
- Primary colors (`$color-font-primary`, `$color-font-inverse`)
- Brand colors (`$color-teal-1600`, `$color-accent-500/600/700`)
- UI colors (`$color-border`, `$color-gray-light`)

### Typography
- Font families (`$font-primary`, `$font-secondary`)
- Font sizes (`$font-size-10` through `$font-size-74`)

### Spacing
- Consistent spacing scale (`$spacing-4` through `$spacing-240`)

### Borders
- Border radius values (`$border-radius-s/m/l`)

## Responsive Design

Breakpoints are defined in `abstracts/_breakpoints.scss`:

```scss
$breakpoint-tiny: 479px;
$breakpoint-small: 767px;
$breakpoint-medium: 991px;
$breakpoint-large: 1200px;
```

Use the provided mixins for responsive styles:

```scss
.my-component {
  width: 100%;
  
  @include respond-to-medium {
    width: 50%;
  }
  
  @include respond-to-small {
    width: 100%;
  }
}
```

## Mixins

Common mixins are available in `abstracts/_mixins.scss`:

- `@include flex-center` - Flexbox centering
- `@include flex-between` - Flexbox space-between
- `@include flex-column` - Flex column layout
- `@include clearfix` - Classic clearfix
- `@include backdrop-blur($amount)` - Backdrop blur effect
- `@include truncate` - Text truncation

## Building

To compile the SCSS to CSS:

```bash
# Install dependencies
npm install

# Compile SCSS (development)
npm run scss:dev

# Compile SCSS (production - minified)
npm run scss:build

# Watch for changes
npm run scss:watch
```

## Component Organization

Each component is self-contained with:
1. Base styles
2. Modifier classes
3. Responsive styles (using mixins)

### Example: Button Component

```scss
// components/_button.scss

.button {
  padding: $spacing-12;
  font-family: $font-primary;
  border-radius: $border-radius-m;
  
  &.primary {
    background-color: $color-accent-500;
    
    &:hover {
      background-color: $color-accent-600;
    }
  }
  
  @include respond-to-small {
    width: 100%;
  }
}
```

## Module System ✨ NEW

**This project now uses modern Sass `@use/@forward` syntax!**

No more deprecation warnings - we're using `@use` instead of deprecated `@import`.

### Import Order

The import order in `main.scss` is critical:

1. **Abstracts** - `@use 'abstracts' as *;` (variables and mixins available globally)
2. **Base** - Resets and base styles  
3. **Vendors** - Third-party code (Webflow framework)
4. **Layout** - Structural components
5. **Components** - UI components

Each file that needs variables/mixins includes `@use '../abstracts' as *;` at the top!

## Benefits of This Structure

### Maintainability
- Easy to find and update specific components
- Clear separation of concerns
- Logical file organization

### Scalability
- Simple to add new components
- Easy to extend existing styles
- Modular architecture

### Performance
- Only import what you need
- Better caching (separate files)
- Easier code splitting

### Developer Experience
- Intuitive file structure
- Consistent naming conventions
- Well-documented variables and mixins

## Best Practices

1. **Use variables** - Always use defined variables for colors, spacing, etc.
2. **Use mixins** - Leverage mixins for common patterns
3. **BEM naming** - Use Block-Element-Modifier for class names where appropriate
4. **Mobile-first** - Write base styles for mobile, enhance for desktop
5. **Component isolation** - Each component should be independent
6. **Comments** - Add comments for complex logic

## Migration Notes

This SCSS structure was created from the original `magyarkolzony.webflow.shared.css` file. Key changes:

- ✅ CSS Custom Properties converted to SCSS variables
- ✅ Monolithic CSS split into logical modules
- ✅ Responsive styles organized with mixins
- ✅ Common patterns extracted to mixins
- ✅ Webflow framework essentials preserved
- ✅ All original styles maintained

The compiled CSS should be functionally identical to the original file.

