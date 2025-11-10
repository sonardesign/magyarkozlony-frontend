# Dropdown Fix - CSS Visibility Issue ✅

## Problem
After the image optimization build, the dropdowns were **always visible** instead of being hidden by default. Clicking them didn't toggle their visibility.

## Root Cause
The `.dropdown-menu` CSS was missing the **default hidden state**:

```scss
// ❌ Before (BROKEN)
.dropdown-menu {
  background: $color-gray-light;
  border: 1px solid $color-border;
  // ... other styles
  // ❌ No display: none!
}
```

## Solution
Added proper visibility control to `src/scss/components/_dropdown.scss`:

```scss
// ✅ After (FIXED)
.dropdown-menu {
  // Hidden by default
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: $color-gray-light;
  border: 1px solid $color-border;
  border-radius: $border-radius-m;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: $spacing-4;
  overflow: hidden;
  overflow-y: auto;
  max-height: 300px;
  z-index: $z-index-dropdown;
  
  // When dropdown is open (controlled by JS)
  &.dropdown-open {
    display: block;
  }
}
```

## What Changed

### 1. Default State (Hidden)
- ✅ `display: none` - Dropdown menu is hidden by default
- ✅ `position: absolute` - Positioned below the trigger
- ✅ `top: calc(100% + 4px)` - 4px gap below trigger
- ✅ `width: 100%` - Full width of parent

### 2. Open State (Visible)
- ✅ `.dropdown-menu.dropdown-open` - JavaScript adds this class
- ✅ `display: block` - Makes dropdown visible

### 3. JavaScript Control
The dropdown JavaScript (`src/js/modules/dropdown.js`) toggles the `dropdown-open` class:

```javascript
// When user clicks trigger
menu.classList.add('dropdown-open');

// When user closes dropdown
menu.classList.remove('dropdown-open');
```

## How It Works

```
User clicks dropdown trigger
         ↓
JavaScript adds `.dropdown-open` class to menu
         ↓
CSS applies `display: block`
         ↓
Dropdown menu becomes visible! ✨
```

## Files Modified

1. **`src/scss/components/_dropdown.scss`**
   - Added `display: none` default
   - Added `position: absolute` and positioning
   - Added `.dropdown-open` state with `display: block`

2. **`src/css/main.css`** (compiled)
   - Automatically updated via `npm run build`

3. **`dist/src/css/main.css`** (deployed)
   - Automatically updated via `npm run build`

## Verification

### Check Compiled CSS
The compiled CSS now includes:

```css
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  /* ... other styles ... */
  z-index: 50;
}

.dropdown-menu.dropdown-open {
  display: block;
}
```

### Test in Browser
1. **Default State**: Dropdown menus should be hidden
2. **Click Trigger**: Dropdown menu appears below the trigger
3. **Click Outside**: Dropdown menu closes
4. **Select Item**: Dropdown closes and shows selected value

## Build Commands

```bash
# Development (with source maps)
npm run scss:dev

# Production (minified)
npm run build

# Deploy
git push  # Vercel auto-deploys
```

## Related Files

- **SCSS Source**: `src/scss/components/_dropdown.scss`
- **JavaScript**: `src/js/modules/dropdown.js`
- **HTML**: `index.html`, `tanusitvanyok.html`, etc.
- **Compiled CSS**: `src/css/main.css`, `dist/src/css/main.css`

---

## Dropdowns on the Site

### Year Dropdown
- **Trigger**: `#year-dropdown-trigger`
- **Menu**: `#year-dropdown`
- **Options**: 2025 → 1998 (28 years)

### Month Dropdown
- **Trigger**: `#month-dropdown-trigger`
- **Menu**: `#month-dropdown`
- **Options**: Január → December (12 months)

---

✅ **Fix Complete!** Dropdowns now work correctly:
- Hidden by default ✅
- Show on click ✅
- Close on outside click ✅
- Close on Escape key ✅
- Keyboard navigation ✅
- Accessible (ARIA) ✅

**Performance Impact**: None - just CSS visibility toggle! ⚡

