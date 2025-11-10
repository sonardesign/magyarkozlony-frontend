# Button Component Documentation

Based on [NJT Design System](https://www.figma.com/design/yAPY9JioFbqufwJpcBE9D6/NJT-New-Design-System?node-id=40002160-8360)

## Overview

A comprehensive button component with multiple variants, sizes, and states that follows the NJT Design System specifications.

## Button Variants

### Primary Button (Default)
The main call-to-action button with accent color background.

```html
<button class="btn btn--primary">Button label</button>
```

**States:**
- **Enabled**: Accent-400 (#37f0bf) background
- **Hover**: Accent-600 (#33cc9d) background
- **Pressed**: Accent-700 (#2ebf96) background
- **Focused**: Focus ring with accent-400 outline
- **Disabled**: Grey background with reduced opacity
- **Loading**: Shows spinner, pointer events disabled

### Secondary Button
Outlined button with transparent background.

```html
<button class="btn btn--secondary">Button label</button>
```

### Tertiary Button
Text-only button with no border.

```html
<button class="btn btn--tertiary">Button label</button>
```

### Danger Button
For destructive actions (delete, remove, etc.).

```html
<button class="btn btn--danger">Delete</button>
```

### Success Button
For positive confirmations.

```html
<button class="btn btn--success">Confirm</button>
```

## Button Sizes

### Small
```html
<button class="btn btn--primary btn--small">Small</button>
```
- Height: 32px
- Padding: 8px 16px
- Font size: 14px

### Medium (Default)
```html
<button class="btn btn--primary">Medium</button>
```
- Height: 40px
- Padding: 12px
- Font size: 16px

### Large
```html
<button class="btn btn--primary btn--large">Large</button>
```
- Height: 48px
- Padding: 16px 32px
- Font size: 18px

## Width Variants

### Full Width
```html
<button class="btn btn--primary btn--full">Full Width</button>
```

### Icon Only
Square button for icons.

```html
<button class="btn btn--primary btn--icon" aria-label="Add">
  <svg><!-- icon --></svg>
</button>
```

## Button States

### Disabled
```html
<button class="btn btn--primary" disabled>Disabled</button>
<!-- OR -->
<button class="btn btn--primary btn--disabled">Disabled</button>
```

### Loading
```html
<button class="btn btn--primary btn--loading">
  Loading
  <span class="btn__spinner"></span>
</button>
```

## Button Groups

### Horizontal Group
```html
<div class="btn-group">
  <button class="btn btn--secondary">Left</button>
  <button class="btn btn--secondary">Middle</button>
  <button class="btn btn--secondary">Right</button>
</div>
```

### Attached Group
Buttons connected without gaps.

```html
<div class="btn-group btn-group--attached">
  <button class="btn btn--secondary">Left</button>
  <button class="btn btn--secondary">Middle</button>
  <button class="btn btn--secondary">Right</button>
</div>
```

### Vertical Group
```html
<div class="btn-group btn-group--vertical">
  <button class="btn btn--secondary">Top</button>
  <button class="btn btn--secondary">Middle</button>
  <button class="btn btn--secondary">Bottom</button>
</div>
```

## JavaScript Integration

### Toggle Loading State

```javascript
const button = document.querySelector('.btn');

// Start loading
button.classList.add('btn--loading');
button.disabled = true;

// Stop loading
setTimeout(() => {
  button.classList.remove('btn--loading');
  button.disabled = false;
}, 2000);
```

### Handle Click Events

```javascript
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log('Button clicked:', e.target);
  });
});
```

## Accessibility

### Required Attributes

For icon-only buttons:
```html
<button class="btn btn--primary btn--icon" aria-label="Add item">
  <svg><!-- icon --></svg>
</button>
```

### Keyboard Navigation

- **Tab**: Focus next/previous button
- **Enter/Space**: Activate button
- **Escape**: Remove focus

### Focus Indicators

All buttons have visible focus indicators that meet WCAG 2.1 guidelines:
- Focus ring with 2px width
- High contrast color (accent-400)
- Inner white ring for visibility on colored backgrounds

## Design Tokens Used

### Colors
- **Primary**: `$accent-400`, `$accent-600`, `$accent-700`
- **Text**: `$teal-1600`, `$cold-grey-100`
- **Disabled**: `$cold-grey-800`
- **Semantic**: Red, Green, Orange variants

### Sizing
- **Height**: `$spacing-800`, `$spacing-1000`, `$spacing-1200`
- **Padding**: `$spacing-200`, `$spacing-300`, `$spacing-400`
- **Border Radius**: `$radius-base` (8px)

### Typography
- **Font Family**: `$font-family-primary` (Inter)
- **Font Size**: `$font-size-sm`, `$font-size-base`, `$font-size-lg`
- **Font Weight**: `$font-weight-bold` (700)

### Transitions
- **Speed**: `$transition-speed` (0.2s)
- **Easing**: `$transition-ease` (ease-in-out)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

### Form Submission
```html
<form id="myForm">
  <input type="text" name="username" required>
  <div class="btn-group">
    <button type="button" class="btn btn--secondary">Cancel</button>
    <button type="submit" class="btn btn--primary">Submit</button>
  </div>
</form>
```

### Confirmation Dialog
```html
<div class="dialog">
  <h3>Delete Item?</h3>
  <p>This action cannot be undone.</p>
  <div class="btn-group">
    <button class="btn btn--secondary">Cancel</button>
    <button class="btn btn--danger">Delete</button>
  </div>
</div>
```

### Loading Action
```html
<button class="btn btn--primary" onclick="handleSubmit(this)">
  <span>Save Changes</span>
  <span class="btn__spinner"></span>
</button>

<script>
async function handleSubmit(button) {
  button.classList.add('btn--loading');
  button.disabled = true;
  
  try {
    await saveData();
    alert('Success!');
  } catch (error) {
    alert('Error!');
  } finally {
    button.classList.remove('btn--loading');
    button.disabled = false;
  }
}
</script>
```

## Demo

View all button variants in action:
```bash
npm run dev
```
Then navigate to `http://localhost:3000/button-demo.html`

