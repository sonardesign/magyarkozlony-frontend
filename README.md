# Magyar Közlöny Frontend

A static HTML + SCSS site built with Vite.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:3000` with hot module replacement (HMR).

### 3. Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

This will serve the production build locally for testing.

## Project Structure

```
magyarkozlony-frontend/
├── src/
│   ├── styles/
│   │   ├── components/
│   │   │   ├── _header.scss
│   │   │   ├── _hero.scss
│   │   │   ├── _card.scss
│   │   │   ├── _button.scss
│   │   │   └── _footer.scss
│   │   ├── _variables.scss
│   │   ├── _base.scss
│   │   └── main.scss
│   └── main.js
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Features

- ⚡ **Vite** - Lightning fast build tool
- 🎨 **SCSS** - Powerful CSS preprocessor with modular structure
- 📱 **Responsive Design** - Mobile-first approach
- 🔥 **Hot Module Replacement** - Instant updates during development
- 🎯 **Modern Tooling** - ES modules, optimized builds

## SCSS Organization

The SCSS files are organized using a modular approach:

- `_variables.scss` - Color palette, spacing, typography variables
- `_base.scss` - Reset styles and base element styling
- `components/` - Individual component styles (header, hero, cards, etc.)
- `main.scss` - Main entry point that imports all other styles

## Customization

### Changing Colors

Edit the color variables in `src/styles/_variables.scss`:

```scss
$primary-color: #2563eb;
$secondary-color: #1e40af;
```

### Adding New Components

1. Create a new SCSS file in `src/styles/components/`
2. Import it in `src/styles/main.scss`

### Modifying Layout

Adjust the spacing and layout variables in `src/styles/_variables.scss`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

