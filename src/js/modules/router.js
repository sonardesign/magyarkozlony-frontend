/**
 * SPA Router Module
 * Handles client-side routing using the History API
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeNavigateCallbacks = [];
    this.afterNavigateCallbacks = [];
    
    // Bind methods
    this.navigate = this.navigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  /**
   * Register a route
   * @param {string} path - The route path (e.g., '/', '/tanusitvanyok', '/page/:page')
   * @param {Object} config - Route configuration
   * @param {string} config.name - Route name
   * @param {Function} config.loader - Function that returns the page content
   * @param {string} config.title - Page title
   * @param {boolean} config.isPattern - Whether this is a pattern route
   */
  addRoute(path, config) {
    this.routes.set(path, {
      ...config,
      pattern: config.isPattern ? this.pathToRegex(path) : null
    });
  }

  /**
   * Convert a path pattern to a regex
   * @param {string} path - Path pattern like '/page/:page'
   * @returns {RegExp} - Regular expression to match the path
   */
  pathToRegex(path) {
    // Convert /page/:page to /page/(\d+) or /page/([^/]+)
    const pattern = path
      .replace(/:[^/]+/g, '([^/]+)') // Replace :param with capture group
      .replace(/\//g, '\\/');         // Escape slashes
    return new RegExp(`^${pattern}$`);
  }

  /**
   * Extract parameters from a path using a pattern
   * @param {string} path - Actual path like '/page/2'
   * @param {string} pattern - Pattern like '/page/:page'
   * @returns {Object} - Object with parameter names and values
   */
  extractParams(path, pattern) {
    const paramNames = [];
    const paramPattern = /:([^/]+)/g;
    let match;
    
    // Extract parameter names from pattern
    while ((match = paramPattern.exec(pattern)) !== null) {
      paramNames.push(match[1]);
    }
    
    // Create regex from pattern
    const regex = this.pathToRegex(pattern);
    const values = path.match(regex);
    
    if (!values) return {};
    
    // Map parameter names to values
    const params = {};
    paramNames.forEach((name, index) => {
      params[name] = values[index + 1]; // +1 because first match is full string
    });
    
    return params;
  }

  /**
   * Find a route that matches the given path
   * @param {string} path - The path to match
   * @returns {Object|null} - Route config with params, or null
   */
  matchRoute(path) {
    // First try exact match
    if (this.routes.has(path)) {
      return {
        route: this.routes.get(path),
        params: {},
        path: path
      };
    }
    
    // Try pattern matching
    for (const [routePath, config] of this.routes) {
      if (config.pattern && config.pattern.test(path)) {
        return {
          route: config,
          params: this.extractParams(path, routePath),
          path: routePath
        };
      }
    }
    
    return null;
  }

  /**
   * Register multiple routes at once
   * @param {Array} routes - Array of route objects [{path, config}]
   */
  addRoutes(routes) {
    routes.forEach(({ path, config }) => {
      this.addRoute(path, config);
    });
  }

  /**
   * Initialize the router
   */
  init() {
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', this.handlePopState);
    
    // Intercept all link clicks
    document.addEventListener('click', this.handleLinkClick);
    
    // Load initial route
    const initialPath = window.location.pathname;
    this.loadRoute(initialPath, false);
  }

  /**
   * Handle browser back/forward button
   */
  handlePopState(event) {
    const path = window.location.pathname;
    this.loadRoute(path, false);
  }

  /**
   * Handle link clicks
   */
  handleLinkClick(event) {
    // Check if it's a navigation link
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    
    // Skip if it's an external link, anchor, or special protocol
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.hasAttribute('download') ||
      link.target === '_blank'
    ) {
      return;
    }

    // Check if it's a route we handle (using pattern matching)
    const path = this.htmlPathToRoutePath(href);
    const match = this.matchRoute(path);
    if (!match) {
      return;
    }

    // Prevent default navigation
    event.preventDefault();
    
    // Navigate to the route
    this.navigate(path);
  }

  /**
   * Convert HTML file path to route path
   * @param {string} htmlPath - Path like 'index.html' or 'tanusitvanyok.html'
   * @returns {string} - Route path like '/' or '/tanusitvanyok'
   */
  htmlPathToRoutePath(htmlPath) {
    // Remove leading './' or '/'
    htmlPath = htmlPath.replace(/^\.?\//, '');
    
    if (htmlPath === 'index.html' || htmlPath === '') {
      return '/';
    }
    
    // Remove .html extension
    return '/' + htmlPath.replace('.html', '');
  }

  /**
   * Navigate to a route
   * @param {string} path - Route path
   * @param {boolean} pushState - Whether to push to history (default: true)
   */
  async navigate(path, pushState = true) {
    // Normalize path
    if (path === 'index.html' || path === '') {
      path = '/';
    } else if (path.endsWith('.html')) {
      path = this.htmlPathToRoutePath(path);
    }

    // Check if route exists (using pattern matching)
    const match = this.matchRoute(path);
    if (!match) {
      console.error(`Route not found: ${path}`);
      return;
    }

    // Run before navigate callbacks
    const shouldNavigate = await this.runBeforeNavigateCallbacks(path);
    if (shouldNavigate === false) {
      return;
    }

    // Update history
    if (pushState) {
      window.history.pushState({ path }, '', path);
    }

    // Load the route
    await this.loadRoute(path, true);
  }

  /**
   * Load a route
   * @param {string} path - Route path
   * @param {boolean} isNavigation - Whether this is a user navigation
   */
  async loadRoute(path, isNavigation) {
    // Normalize path
    if (path === '/index.html') {
      path = '/';
    } else if (path.includes('.html')) {
      path = this.htmlPathToRoutePath(path);
    }

    // Match route (supports both exact and pattern matches)
    const match = this.matchRoute(path);
    
    if (!match) {
      console.error(`Route not found: ${path}`);
      // Try to load home page instead
      if (path !== '/') {
        this.navigate('/', false);
      }
      return;
    }
    
    const route = match.route;
    const params = match.params;

    try {
      // Update current route
      this.currentRoute = path;

      // Update page title
      if (route.title) {
        document.title = route.title;
      }

      // Update body data attribute for styling
      const pageName = path === '/' ? 'index' : path.substring(1);
      document.body.setAttribute('data-current-page', pageName);

      // Load page content (pass params to loader)
      if (route.loader) {
        const content = await route.loader(params);
        
        // Content should be an object with headerContent and bodyContent
        if (typeof content === 'object' && content !== null) {
          // Update header dynamic content
          const headerContent = document.querySelector('#app-header-content');
          if (headerContent && content.headerContent !== undefined) {
            headerContent.innerHTML = content.headerContent;
          } else if (!headerContent) {
            console.warn('Header content area #app-header-content not found');
          }
          
          // Update main body content
          const mainContent = document.querySelector('#app-content');
          if (mainContent && content.bodyContent !== undefined) {
            mainContent.innerHTML = content.bodyContent;
          } else if (!mainContent) {
            console.error('Main content area #app-content not found');
          }
        } else {
          // Fallback: old behavior (content is just a string)
          const mainContent = document.querySelector('#app-content');
          if (mainContent) {
            mainContent.innerHTML = content;
          } else {
            console.error('Main content area #app-content not found');
          }
        }
      }

      // Run after navigate callbacks
      await this.runAfterNavigateCallbacks(path);

      // Scroll to top
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error loading route:', error);
    }
  }

  /**
   * Register a callback to run before navigation
   * @param {Function} callback - Callback function
   */
  beforeNavigate(callback) {
    this.beforeNavigateCallbacks.push(callback);
  }

  /**
   * Register a callback to run after navigation
   * @param {Function} callback - Callback function
   */
  afterNavigate(callback) {
    this.afterNavigateCallbacks.push(callback);
  }

  /**
   * Run before navigate callbacks
   */
  async runBeforeNavigateCallbacks(path) {
    for (const callback of this.beforeNavigateCallbacks) {
      const result = await callback(path, this.currentRoute);
      if (result === false) {
        return false;
      }
    }
    return true;
  }

  /**
   * Run after navigate callbacks
   */
  async runAfterNavigateCallbacks(path) {
    for (const callback of this.afterNavigateCallbacks) {
      await callback(path, this.currentRoute);
    }
  }

  /**
   * Get current route path
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Destroy the router and clean up all resources
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('popstate', this.handlePopState);
    document.removeEventListener('click', this.handleLinkClick);
    
    // Clear all callbacks
    this.beforeNavigateCallbacks = [];
    this.afterNavigateCallbacks = [];
    
    // Clear routes
    this.routes.clear();
    
    // Reset current route
    this.currentRoute = null;
    
    console.log('🧹 Router destroyed');
  }
}

// Export a singleton instance
export const router = new Router();

