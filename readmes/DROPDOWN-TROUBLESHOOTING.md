# Dropdown Troubleshooting Guide 🔧

## Quick Test

1. **Open the test file**: `TEST-DROPDOWN.html` in your browser
2. **Open DevTools Console** (F12)
3. **Click the dropdown**
4. **Check the console output**

---

## If Dropdowns Still Don't Work

### Step 1: Hard Refresh Browser 🔄

**Windows/Linux:**
- Chrome/Edge: `Ctrl + Shift + R` or `Ctrl + F5`
- Firefox: `Ctrl + Shift + R`

**Mac:**
- Chrome/Edge: `Cmd + Shift + R`
- Firefox: `Cmd + Shift + R`

### Step 2: Clear Browser Cache

**Chrome/Edge:**
1. Press `F12` to open DevTools
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Firefox:**
1. Press `F12` to open DevTools
2. Go to Network tab
3. Check "Disable Cache"
4. Refresh page

---

## Step 3: Check Console for Errors

Open DevTools Console (F12) and look for:

### Expected Output (✅ Working):
```
🚀 Magyar Közlöny App Initializing...
🔍 Found 2 dropdown trigger(s)
🔍 Looking for menu: #month-dropdown
✓ Found menu #month-dropdown, creating dropdown...
🔍 Looking for menu: #year-dropdown
✓ Found menu #year-dropdown, creating dropdown...
✅ 2 Dropdown(s) initialized successfully!
```

### Error Messages (❌ Problem):
```
❌ Dropdown menu not found: #month-dropdown
```
**Solution:** Check that dropdown HTML is correct.

---

## Step 4: Verify Files Are Updated

Check that the JavaScript has the fix:

```bash
# Search for the fix in the built file
findstr /C:"menu.classList.add('dropdown-open')" dist\src\js\modules\dropdown.js
```

**Expected:** Should find the line with `menu.classList.add('dropdown-open')`

---

## Step 5: Check CSS Classes

In the browser DevTools:

1. **Inspect the dropdown menu** (right-click → Inspect)
2. **Click the trigger button**
3. **Watch the menu element classes change**

**Before click:**
```html
<div id="month-dropdown" class="dropdown-menu" style="display: none;">
```

**After click (should show):**
```html
<div id="month-dropdown" class="dropdown-menu dropdown-open" style="display: block;">
```

If `dropdown-open` class is NOT added → JavaScript issue
If `dropdown-open` IS added but menu still hidden → CSS issue

---

## Step 6: Verify CSS Rules

In DevTools Console, run:

```javascript
const menu = document.getElementById('month-dropdown');
const styles = window.getComputedStyle(menu);
console.log('Display:', styles.display);
console.log('Position:', styles.position);
console.log('Z-index:', styles.zIndex);
```

**Expected output:**
```
Display: none  (when closed)
Display: block (when open with .dropdown-open class)
Position: absolute
Z-index: 50
```

---

## Step 7: Manual Test

In DevTools Console:

```javascript
// Get dropdown menu
const menu = document.getElementById('month-dropdown');

// Manually add the class
menu.classList.add('dropdown-open');

// Check if visible
console.log('Display:', window.getComputedStyle(menu).display);
// Should show: Display: block
```

If this works → JavaScript event listener issue
If this doesn't work → CSS not loaded properly

---

## Common Issues & Solutions

### Issue 1: Module Not Loading
**Error:** `Failed to load module script`

**Solution:**
- Ensure you're running from a local server (not `file://`)
- Run: `npm run dev`
- Open: `http://localhost:3000/`

### Issue 2: CSS Not Loaded
**Check:**
1. Open DevTools → Network tab
2. Refresh page
3. Look for `main.css` - should be 200 OK
4. If 404 → path is wrong in HTML

**Solution:**
```html
<!-- Correct path -->
<link href="src/css/main.css?v=1762775425792" rel="stylesheet" />
```

### Issue 3: JavaScript Not Executing
**Check DevTools Console for:**
- Syntax errors
- Module import errors
- Network errors (404 for JS files)

**Solution:**
1. Clear cache
2. Rebuild: `npm run build`
3. Hard refresh

### Issue 4: Wrong JavaScript Version Cached
**Solution:**
```bash
# Clean everything
powershell -Command "Remove-Item -Recurse -Force dist"

# Rebuild
npm run build

# Hard refresh browser (Ctrl+Shift+R)
```

---

## Files to Check

### 1. HTML (`index.html`)
```html
<!-- Dropdown structure must have: -->
<button data-dropdown="month-dropdown" class="dropdown-trigger">
  <span class="dropdown-selected-text">Select</span>
  <i class="ri-arrow-down-s-line dropdown-arrow"></i>
</button>

<div id="month-dropdown" class="dropdown-menu">
  <div class="dropdown-item" data-value="01">January</div>
</div>
```

### 2. CSS (`src/css/main.css`)
Should contain:
```css
.dropdown-menu{display:none;position:absolute;...}
.dropdown-menu.dropdown-open{display:block}
```

### 3. JavaScript (`dist/src/js/modules/dropdown.js`)
Should contain:
```javascript
menu.classList.add('dropdown-open');
```

---

## Still Not Working?

### Debug Mode

Add this to your HTML `<head>`:
```html
<script>
window.addEventListener('load', () => {
  console.log('=== DROPDOWN DEBUG ===');
  const triggers = document.querySelectorAll('[data-dropdown]');
  console.log('Found triggers:', triggers.length);
  
  const menus = document.querySelectorAll('.dropdown-menu');
  console.log('Found menus:', menus.length);
  
  menus.forEach(menu => {
    const style = window.getComputedStyle(menu);
    console.log(`Menu ${menu.id}:`, {
      display: style.display,
      position: style.position,
      classes: menu.className
    });
  });
});
</script>
```

### Check Network Tab

1. Open DevTools → Network
2. Refresh page
3. Filter by "JS"
4. Check that `dropdown.js` loads successfully (200 OK)
5. Check the file size - should be ~15KB

---

## Testing Checklist

- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Clear browser cache
- [ ] Check DevTools Console for errors
- [ ] Verify `dropdown-open` class is added when clicked
- [ ] Verify CSS `display: block` is applied when open
- [ ] Test with `TEST-DROPDOWN.html`
- [ ] Run from local server (`npm run dev`)
- [ ] Check all files are rebuilt (`npm run build`)

---

## Contact Information

If dropdowns still don't work after following all steps:

1. **Share Console Output**: Copy all console logs
2. **Share Network Tab**: Screenshot of JS files loading
3. **Share Element Inspector**: Screenshot of menu element when clicked
4. **Share CSS Styles**: Screenshot of computed styles for `.dropdown-menu`

---

## Quick Fix Commands

```bash
# Windows PowerShell

# Clean build
powershell -Command "Remove-Item -Recurse -Force dist"

# Rebuild everything
npm run build

# Start dev server
npm run dev

# Then in browser:
# 1. Open http://localhost:3000/
# 2. Hard refresh (Ctrl+Shift+R)
# 3. Open DevTools Console (F12)
# 4. Click dropdown
# 5. Check console output
```

---

✅ **Expected Behavior:**
- Click trigger → Menu appears
- Click outside → Menu closes
- Press Escape → Menu closes
- Keyboard navigation works
- Selected item shows checkmark

If you see all of these → **Dropdowns are working!** 🎉

