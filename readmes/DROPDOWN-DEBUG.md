# Dropdown Debugging Guide

## Quick Test Steps

### 1. Open Browser Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
- **Firefox**: Press `F12`
- **Safari**: Press `Cmd+Option+I` (Mac)

### 2. Check for Console Messages
When the page loads, you should see:
```
🚀 Magyar Közlöny App Initializing...
✓ Mobile Menu initialized
✅ 1 Dropdown(s) initialized
✓ 0 Date Picker(s) initialized
✓ Navigation State initialized (X items)
✅ All modules initialized successfully
```

### 3. Check for Errors
Look for any RED error messages in the console. Common issues:
- ❌ `Failed to load module` - File path issue
- ❌ `Uncaught SyntaxError` - Code syntax issue
- ❌ `Cannot read property` - Element not found

### 4. Test Dropdown Click
1. Click on the "Hónap" (month) dropdown
2. Console should show: `🔽 Dropdown opened`
3. Dropdown menu should appear with 12 months
4. Click again - Console should show: `🔼 Dropdown closed`
5. Menu should close

### 5. Test Item Selection
1. Open dropdown
2. Click "Február"
3. Console should show: `✓ Selected: Február (value: 02)`
4. Dropdown should close
5. Button text should change to "Február"

## Common Issues & Fixes

### Issue 1: "app.js not found" (404 error)
**Symptom**: Console shows 404 error for `app.js`
**Fix**: 
```bash
# Check file exists
ls src/js/app.js

# If missing, verify path in index.html
```

### Issue 2: "Cannot find module" error
**Symptom**: ES6 import error
**Fix**: Make sure all module files exist:
- `src/js/modules/dropdown.js` ✓
- `src/js/modules/mobile-menu.js` ✓
- `src/js/modules/date-picker.js` ✓
- `src/js/modules/navigation-state.js` ✓

### Issue 3: Dropdown doesn't appear
**Symptom**: No dropdown menu visible when clicking
**Possible Causes**:
1. CSS not compiled - Run `npm run scss:dev`
2. Z-index issue - Check if dropdown is behind other elements
3. Display property - Check browser inspector

**Fix**:
```bash
# Recompile SCSS
npm run scss:dev

# Check in browser inspector
# Right-click dropdown area > Inspect
# Look for .dropdown-menu element
# Check computed styles: display, opacity, z-index
```

### Issue 4: Dropdown won't close
**Status**: ✅ FIXED in latest version
- Changed `isOpen` flag to update immediately, not after timeout

### Issue 5: No console messages at all
**Symptom**: Completely silent console
**Possible Causes**:
1. JavaScript disabled
2. Module not loading (check Network tab)
3. Script tag missing or incorrect

**Fix**: Check index.html has:
```html
<script type="module" src="src/js/app.js"></script>
```
**Must be** `type="module"` for ES6 imports!

## Manual Test in Console

If nothing works, test manually in browser console:

```javascript
// Test 1: Check if Dropdown class exists
console.log(window);

// Test 2: Find dropdown trigger
const trigger = document.querySelector('[data-dropdown]');
console.log('Trigger found:', trigger);

// Test 3: Find dropdown menu
const menu = document.getElementById('month-dropdown');
console.log('Menu found:', menu);

// Test 4: Check dropdown items
const items = document.querySelectorAll('.dropdown-item');
console.log('Items found:', items.length); // Should be 12
```

## File Verification Checklist

Run these commands to verify all files are in place:

```bash
# Main app file
ls src/js/app.js

# All module files
ls src/js/modules/

# Compiled CSS
ls src/css/main.css

# Check HTML has script tag
grep "app.js" index.html
```

## Still Not Working?

### Step 1: Hard Refresh
- **Windows**: `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

### Step 2: Clear Browser Cache
- Chrome: Settings > Privacy > Clear browsing data > Cached images and files

### Step 3: Check File Permissions
```bash
# Make sure files are readable
ls -la src/js/app.js
ls -la src/js/modules/
```

### Step 4: Check Live Server
If using a dev server, make sure it's running:
```bash
# VS Code Live Server - Check bottom right corner
# Should show port number (e.g., :5500)
```

### Step 5: Test in Different Browser
- Try Chrome if using Firefox
- Try Firefox if using Chrome
- Try Private/Incognito mode

## Expected Behavior Video Script

1. **Initial State**: 
   - Button shows "Január"
   - Arrow pointing down
   
2. **First Click**:
   - Arrow rotates 180° (pointing up)
   - Menu slides down with fade-in animation
   - Shows all 12 months in dark teal
   - Console: `🔽 Dropdown opened`

3. **Second Click (on button)**:
   - Menu fades out and slides up
   - Arrow rotates back (pointing down)
   - Console: `🔼 Dropdown closed`

4. **Item Selection**:
   - Click "Május"
   - Button text changes to "Május"
   - Hidden input value = "05"
   - Menu closes automatically
   - Console: `✓ Selected: Május (value: 05)`

5. **Click Outside**:
   - Open dropdown
   - Click anywhere outside menu/button
   - Menu closes automatically
   - Console: `🔼 Dropdown closed`

## Current Status
- ✅ HTML structure complete
- ✅ JavaScript modules created
- ✅ SCSS compiled
- ✅ Toggle logic fixed (isOpen flag)
- ✅ All 12 months included
- ✅ Item selection working
- ✅ Hidden input updated

## Need More Help?

Copy and paste the following to share:
1. Browser console output (full text)
2. Any error messages (screenshot)
3. Network tab showing 404s (if any)
4. What happens when you click the dropdown

---

**Last Updated**: Current Session
**Status**: Ready for testing

