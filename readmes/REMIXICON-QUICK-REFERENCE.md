# Remixicon Quick Reference 🎨

Quick guide for using Remixicon icon font in this project.

## Usage Examples

### Icons Used in This Project

```html
<!-- External links -->
<i class="ri-external-link-line"></i>

<!-- Help/Question -->
<i class="ri-question-line"></i>

<!-- High contrast mode -->
<i class="ri-contrast-2-line"></i>

<!-- Menu -->
<i class="ri-menu-line"></i>

<!-- Arrows -->
<i class="ri-arrow-right-line"></i>
<i class="ri-arrow-right-s-line"></i>

<!-- Info/Sidebar -->
<i class="ri-information-line"></i>

<!-- PDF document -->
<i class="ri-file-pdf-line"></i>
```

## Common Icons You Might Need

### Navigation
```html
<i class="ri-home-line"></i>          <!-- Home -->
<i class="ri-arrow-left-line"></i>    <!-- Back -->
<i class="ri-arrow-right-line"></i>   <!-- Forward -->
<i class="ri-close-line"></i>         <!-- Close -->
<i class="ri-menu-line"></i>          <!-- Menu -->
```

### Actions
```html
<i class="ri-search-line"></i>        <!-- Search -->
<i class="ri-add-line"></i>           <!-- Add -->
<i class="ri-delete-bin-line"></i>    <!-- Delete -->
<i class="ri-edit-line"></i>          <!-- Edit -->
<i class="ri-save-line"></i>          <!-- Save -->
<i class="ri-download-line"></i>      <!-- Download -->
<i class="ri-upload-line"></i>        <!-- Upload -->
```

### Files & Documents
```html
<i class="ri-file-line"></i>          <!-- File -->
<i class="ri-file-pdf-line"></i>      <!-- PDF -->
<i class="ri-file-text-line"></i>     <!-- Text file -->
<i class="ri-folder-line"></i>        <!-- Folder -->
```

### User & Account
```html
<i class="ri-user-line"></i>          <!-- User -->
<i class="ri-account-circle-line"></i><!-- Account -->
<i class="ri-login-box-line"></i>     <!-- Login -->
<i class="ri-logout-box-line"></i>    <!-- Logout -->
```

### Communication
```html
<i class="ri-mail-line"></i>          <!-- Email -->
<i class="ri-phone-line"></i>         <!-- Phone -->
<i class="ri-message-line"></i>       <!-- Message -->
<i class="ri-notification-line"></i>  <!-- Notification -->
```

### Status & Feedback
```html
<i class="ri-check-line"></i>         <!-- Success -->
<i class="ri-close-circle-line"></i>  <!-- Error -->
<i class="ri-error-warning-line"></i> <!-- Warning -->
<i class="ri-information-line"></i>   <!-- Info -->
<i class="ri-question-line"></i>      <!-- Help -->
```

## Sizing

```html
<!-- Default size (inherits from parent) -->
<i class="ri-home-line"></i>

<!-- Relative sizes -->
<i class="ri-home-line ri-xxs"></i>   <!-- 0.5em -->
<i class="ri-home-line ri-xs"></i>    <!-- 0.75em -->
<i class="ri-home-line ri-sm"></i>    <!-- 0.875em -->
<i class="ri-home-line ri-lg"></i>    <!-- 1.33em -->
<i class="ri-home-line ri-xl"></i>    <!-- 1.5em -->

<!-- Multiplier sizes -->
<i class="ri-home-line ri-1x"></i>    <!-- 1em -->
<i class="ri-home-line ri-2x"></i>    <!-- 2em -->
<i class="ri-home-line ri-3x"></i>    <!-- 3em -->
<!-- ... up to ri-10x -->

<!-- Fixed width (useful for vertical lists) -->
<i class="ri-home-line ri-fw"></i>
```

## Styling with CSS/SCSS

```scss
// Change icon color
.my-icon {
  color: #007bff;
}

// Change icon size
.large-icon {
  font-size: 32px;
}

// Animate icon
.animated-icon {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }
}

// Icon in button
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  i {
    font-size: 20px;
  }
}
```

## Line vs Fill

Most Remixicon icons come in two styles:

- **`-line`** - Outlined/stroke version (lighter, more modern)
- **`-fill`** - Filled/solid version (bolder, more traditional)

```html
<i class="ri-heart-line"></i>  <!-- Outlined heart ♡ -->
<i class="ri-heart-fill"></i>  <!-- Filled heart ♥ -->
```

## Tips

1. **Use `-line` for most UI elements** - They're lighter and more modern
2. **Use `-fill` for emphasis** - Draw attention to important actions
3. **Keep icon size consistent** - Usually 16px, 20px, or 24px
4. **Add aria-hidden** for decorative icons:
   ```html
   <i class="ri-arrow-right-line" aria-hidden="true"></i>
   ```
5. **Add screen reader text** for icon-only buttons:
   ```html
   <button>
     <i class="ri-search-line" aria-hidden="true"></i>
     <span class="sr-only">Search</span>
   </button>
   ```

## Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)  
✅ IE 11+ (with WOFF2 support)  
✅ Mobile browsers (iOS Safari, Chrome Android)

## Resources

- 🔗 **Official Website:** https://remixicon.com
- 🔍 **Icon Search:** Browse all 2,700+ icons
- 📚 **GitHub:** https://github.com/Remix-Design/RemixIcon
- 📦 **CDN:** Already using local font file in this project

---

**Quick tip:** Visit https://remixicon.com to search for icons and copy the class names!

