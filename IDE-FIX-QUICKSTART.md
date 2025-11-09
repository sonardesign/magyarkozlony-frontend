# 🚨 Quick Fix: IDE Not Recognizing SCSS Variables

## The Problem

Your IDE shows errors like:
- ❌ `$color-primary` - undefined variable
- ❌ `$spacing-16` - undefined variable
- ❌ No autocomplete for variables

**BUT:** The code compiles perfectly with `npm run dev` ✅

---

## ⚡ 3-Step Quick Fix

### Step 1: Install SCSS Extension

**Open Command Palette:** `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)

**Run:** `Extensions: Install Extensions`

**Install ONE of these:**

#### Option A: Some Sass (Recommended - Best @use support)
```
Search: "Some Sass"
Publisher: SomewhatStationery
Click "Install"
```

#### Option B: SCSS IntelliSense
```
Search: "SCSS IntelliSense"
Publisher: mrmlnc
Click "Install"
```

---

### Step 2: Reload VS Code

**Press:** `Ctrl+Shift+P`

**Run:** `Developer: Reload Window`

OR just close and reopen VS Code.

---

### Step 3: Verify

Open any SCSS file (e.g., `src/scss/components/_button.scss`)

**Check bottom-right corner:**
- Should show **"SCSS"** (not "Plain Text")
- If not, click it → "Configure File Association" → Select "SCSS"

**Type:** `$color-`
- Should see autocomplete suggestions ✅
- Variables should not have red underlines ✅

---

## ✅ Did It Work?

### YES! 🎉
You're all set! Variables should now be recognized.

### NO! 😞
Try these additional steps:

---

## 🔧 Advanced Troubleshooting

### If Using "Some Sass" Extension

Add to your `.vscode/settings.json`:

```json
{
  "somesass.scss.includePaths": [
    "${workspaceFolder}/src/scss",
    "${workspaceFolder}/src/scss/abstracts"
  ],
  "somesass.scss.scannerDepth": 30
}
```

**Then:** Reload window (`Ctrl+Shift+P` → Reload Window)

---

### If Using "SCSS IntelliSense" Extension

Add to your `.vscode/settings.json`:

```json
{
  "scss.scannerDepth": 30,
  "scss.scanImportedFiles": true,
  "css.validate": false,
  "scss.validate": true
}
```

**Then:** Reload window

---

### Nuclear Option: Restart Extension Host

**Press:** `Ctrl+Shift+P`

**Run:** `Developer: Restart Extension Host`

**Wait:** 10-20 seconds

**Check:** Open SCSS file again

---

## 🎯 Understanding the Issue

### Why This Happens

Modern `@use` syntax is relatively new:
```scss
@use '../abstracts' as *;
```

Some SCSS language servers don't fully support it yet, especially the `as *` part that makes variables globally available without a namespace.

### Your Code is CORRECT! ✅

The SCSS compiles perfectly. This is just an **IDE recognition issue**, not a code issue.

---

## 🔄 Workaround (If Nothing Else Works)

If you absolutely can't get IDE recognition working, you can use namespaced imports:

### Change from:
```scss
@use '../abstracts' as *;

.button {
  padding: $spacing-16;  // IDE doesn't recognize
}
```

### To:
```scss
@use '../abstracts';

.button {
  padding: abstracts.$spacing-16;  // IDE recognizes!
}
```

**Trade-off:** More verbose, but better IDE support.

**To apply everywhere:**
1. Remove `as *` from all `@use` statements
2. Prefix all variables with `abstracts.`

---

## 📦 Files We Created

To help your IDE recognize SCSS:

1. **`.vscode/settings.json`**
   - File associations
   - SCSS validation
   - Basic config

2. **`.vscode/extensions.json`**
   - Recommended extensions
   - VS Code will prompt to install

3. **`.sassrc.json`**
   - Sass compiler config
   - Include paths

4. **`.vscode/IDE-SETUP.md`**
   - Complete setup guide
   - Detailed troubleshooting

---

## 💡 Pro Tips

### Check Your Extension

1. Open Extensions panel: `Ctrl+Shift+X`
2. Search: "SCSS" or "Sass"
3. See what's installed
4. Make sure it's **enabled** and **up to date**

### Language Mode

Bottom-right corner of VS Code should say **"SCSS"** for `.scss` files.

If it says "Plain Text":
1. Click on it
2. Select "Configure File Association for '.scss'"
3. Choose "SCSS"

### Disable Conflicting Extensions

If you have multiple CSS/SCSS extensions, they might conflict:
1. Disable all except one SCSS extension
2. Reload window
3. Test

---

## ✅ Verification Checklist

After fixes, verify:

- [ ] Bottom-right shows "SCSS" (not "Plain Text")
- [ ] Typing `$color-` shows autocomplete
- [ ] Variables don't have red underlines
- [ ] `Ctrl+Click` on variable jumps to definition
- [ ] Hover over variable shows its value
- [ ] `npm run dev` still compiles successfully

---

## 🆘 Still Not Working?

### The Code WORKS! 

Even if your IDE doesn't recognize variables, **the code is 100% correct and compiles perfectly**.

Run this to verify:
```bash
npm run dev
```

**Output:** ✅ Clean compilation (0 warnings)

### You Can Keep Developing

You don't need IDE recognition to work effectively:
1. Variables are defined in `src/scss/abstracts/_variables.scss`
2. Look them up manually when needed
3. Compilation will catch any real errors
4. The site works perfectly!

---

## 📞 Quick Commands Reference

| Action | Command |
|--------|---------|
| **Open Command Palette** | `Ctrl+Shift+P` |
| **Reload Window** | Command Palette → "Developer: Reload Window" |
| **Restart Extensions** | Command Palette → "Developer: Restart Extension Host" |
| **Open Extensions** | `Ctrl+Shift+X` |
| **Configure File Association** | Click language mode (bottom-right) |
| **Test Compilation** | `npm run dev` |

---

## 🎓 Recommended Extension

**Some Sass** by SomewhatStationery

- ✅ Best @use/@forward support
- ✅ Variable autocomplete
- ✅ Go to definition
- ✅ Hover information
- ✅ Active development
- ✅ Modern Sass features

Install: `Ctrl+Shift+P` → Extensions → Search "Some Sass" → Install

---

**Need more help?** See `.vscode/IDE-SETUP.md` for detailed troubleshooting.

**Remember:** Your code is correct and working! This is just IDE tooling. 🚀

