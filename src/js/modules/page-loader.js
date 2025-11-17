/**
 * Page Loader Module
 * Handles fetching and managing page content
 */

export class PageLoader {
  constructor() {
    this.cache = new Map();
    this.templates = new Map();
  }

  /**
   * Register a page template
   * @param {string} path - Route path
   * @param {Function|string} template - Template function or HTML string
   */
  registerTemplate(path, template) {
    this.templates.set(path, template);
  }

  /**
   * Register multiple templates at once
   * @param {Object} templates - Object with path as key and template as value
   */
  registerTemplates(templates) {
    Object.entries(templates).forEach(([path, template]) => {
      this.registerTemplate(path, template);
    });
  }

  /**
   * Load page content
   * @param {string} path - Route path
   * @returns {Promise<string>} - HTML content
   */
  async loadPage(path) {
    // Check if template is registered
    if (this.templates.has(path)) {
      const template = this.templates.get(path);
      
      // If it's a function, call it
      if (typeof template === 'function') {
        return await template();
      }
      
      // Otherwise return the string
      return template;
    }

    // If no template registered, try to fetch from HTML file
    return await this.fetchPageContent(path);
  }

  /**
   * Fetch page content from HTML file
   * @param {string} path - Route path
   * @returns {Promise<string>} - HTML content
   */
  async fetchPageContent(path) {
    // Check cache first
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    try {
      // Convert route path to HTML file path
      const htmlPath = this.routePathToHtmlPath(path);
      
      // Fetch the HTML file
      const response = await fetch(htmlPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${htmlPath}: ${response.statusText}`);
      }
      
      const html = await response.text();
      
      // Extract main content
      const content = this.extractMainContent(html);
      
      // Cache it
      this.cache.set(path, content);
      
      return content;
      
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  }

  /**
   * Convert route path to HTML file path
   * @param {string} path - Route path like '/' or '/tanusitvanyok'
   * @returns {string} - HTML file path like 'index.html' or 'tanusitvanyok.html'
   */
  routePathToHtmlPath(path) {
    if (path === '/') {
      return 'index.html';
    }
    return path.substring(1) + '.html';
  }

  /**
   * Extract page content from full HTML
   * This extracts both header dynamic content and body section
   * @param {string} html - Full HTML string
   * @returns {Object} - Object with headerContent and bodyContent
   */
  extractMainContent(html) {
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const result = {
      headerContent: '',
      bodyContent: ''
    };
    
    // Extract header dynamic content (search form + mobile block)
    // Look for elements between secondary-nav and justicia image
    const headerSection = doc.querySelector('section.section.header');
    if (headerSection) {
      // Get the container div
      const container = headerSection.querySelector('.container');
      if (container) {
        // Get secondary-nav (last static element before dynamic content)
        const secondaryNav = container.querySelector('.secondary-nav');
        
        if (secondaryNav) {
          // Collect all elements after secondary-nav until justicia image
          let currentElement = secondaryNav.nextElementSibling;
          const headerElements = [];
          
          while (currentElement) {
            // Stop if we hit the justicia image
            if (currentElement.tagName === 'IMG' && currentElement.classList.contains('justicia')) {
              break;
            }
            headerElements.push(currentElement.outerHTML);
            currentElement = currentElement.nextElementSibling;
          }
          
          result.headerContent = headerElements.join('\n');
        }
      }
    }
    
    // Extract body section content
    const bodySection = doc.querySelector('section.section.body');
    if (bodySection) {
      result.bodyContent = bodySection.outerHTML;
    } else {
      // Fallback: Try to find main content section
      const mainSelectors = [
        '.main-content',
        'main',
        '[role="main"]',
        '#main',
        '.content-wrapper'
      ];
      
      for (const selector of mainSelectors) {
        const mainElement = doc.querySelector(selector);
        if (mainElement) {
          result.bodyContent = mainElement.innerHTML;
          break;
        }
      }
      
      // Last resort: extract body content excluding header/footer/mobile menu
      if (!result.bodyContent) {
        const body = doc.body;
        if (body) {
          const bodyClone = body.cloneNode(true);
          const elementsToRemove = bodyClone.querySelectorAll('header, footer, .mobile-menu, .section.header, .section.footer, nav, script');
          elementsToRemove.forEach(el => el.remove());
          result.bodyContent = bodyClone.innerHTML;
        }
      }
    }
    
    return result;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Clear cache for specific path
   * @param {string} path - Route path
   */
  clearCacheForPath(path) {
    this.cache.delete(path);
  }
}

// Export a singleton instance
export const pageLoader = new PageLoader();

