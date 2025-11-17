/**
 * Gazette Renderer
 * Renders gazette data using HTML templates
 */

export class GazetteRenderer {
  /**
   * Render a single gazette card
   * @param {Object} gazette - Gazette data object
   * @param {boolean} isFeatured - Whether this is a featured card
   * @returns {string} - HTML string
   */
  renderCard(gazette, isFeatured = false) {
    return `
      <div class="card">
        <div class="gazette-card-content">
          <div class="gazette-card-header">
            <a href="${gazette.pdfUrl}" class="gazette-title-link">${gazette.title}</a>
            <p class="bodysmallregular">${gazette.date}</p>
            <a href="${gazette.pdfUrl}" class="button-outline inline-block">
              <span class="button-label">PDF letöltése</span>
              <div class="high-contrast-mode-border-2"></div>
            </a>
          </div>
          <div class="gazette-card-actions">
            <a href="${gazette.reasonsUrl}" class="gazette-action-link">
              <span class="link-text-small">Indoklás(ok)</span>
              <i class="ri-arrow-right-line action-icon"></i>
            </a>
            <a href="${gazette.attachmentsUrl}" class="gazette-action-link">
              <span class="link-text-small">Melléklet(ek)</span>
              <i class="ri-arrow-right-line action-icon"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render featured gazette section (for page 1 only)
   * @param {Object} gazette - Featured gazette data
   * @returns {string} - HTML string
   */
  renderFeaturedSection(gazette) {
    if (!gazette) return '';
    
    return `
      <div class="flex-column listing">
        <h2 class="h2 inverse desktop-only">Legfrissebb Közlönyök</h2>
        <h2 class="h2 inverse mobile-only">További Közlönyök</h2>
        
        <div class="new-gazettes-desktop flex-column list-items">
          ${this.renderCard(gazette, true)}
        </div>
      </div>

      <h2 class="h2 desktop-only">További Közlönyök</h2>
    `;
  }

  /**
   * Render gazette list
   * @param {Array} gazettes - Array of gazette objects
   * @returns {string} - HTML string
   */
  renderList(gazettes) {
    return gazettes.map(g => this.renderCard(g)).join('\n');
  }

  /**
   * Render paginator
   * @param {number} currentPage - Current page number
   * @param {number} totalPages - Total number of pages
   * @returns {string} - HTML string
   */
  renderPaginator(currentPage, totalPages) {
    const pages = this.calculatePageNumbers(currentPage, totalPages);
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;
    
    return `
      <div class="paginator">
        <!-- Previous Button -->
        <button class="paginator-button prev ${prevDisabled ? 'disabled' : ''}" 
                ${prevDisabled ? 'disabled' : ''} 
                aria-label="Previous page"
                data-page="${currentPage - 1}">
          <i class="ri-arrow-left-s-line"></i>
        </button>

        <!-- Page Numbers -->
        ${pages.map(page => {
          if (page === '...') {
            return '<span class="paginator-page ellipsis">...</span>';
          }
          const isActive = page === currentPage;
          const href = page === 1 ? '/' : `/page/${page}`;
          return `<a href="${href}" 
                     class="paginator-page ${isActive ? 'active' : ''}" 
                     ${isActive ? 'aria-current="page"' : ''}
                     data-page="${page}">${page}</a>`;
        }).join('\n        ')}

        <!-- Next Button -->
        <button class="paginator-button next ${nextDisabled ? 'disabled' : ''}" 
                ${nextDisabled ? 'disabled' : ''} 
                aria-label="Next page"
                data-page="${currentPage + 1}">
          <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>
    `;
  }

  /**
   * Calculate which page numbers to show in paginator
   * Shows: 1 ... 4 5 [6] 7 8 ... 15
   * @param {number} current - Current page
   * @param {number} total - Total pages
   * @returns {Array} - Array of page numbers and '...' strings
   */
  calculatePageNumbers(current, total) {
    const pages = [];
    const delta = 2; // Number of pages to show on each side of current
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    // Add pages around current
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < total - 1) {
      pages.push('...');
    }
    
    // Always show last page (if more than 1 page)
    if (total > 1) {
      pages.push(total);
    }
    
    return pages;
  }

  /**
   * Render complete gazette listing section
   * @param {Object} pageData - Data from GazetteDataService.getPage()
   * @returns {string} - Complete HTML string
   */
  renderGazetteSection(pageData) {
    const { items, featuredItem, currentPage, totalPages } = pageData;
    
    return `
      <div class="flex-column content">
        <!-- Main Gazette Listing -->
        <div class="gasette-listing">
          ${featuredItem ? this.renderFeaturedSection(featuredItem) : '<h2 class="h2 inverse">További Közlönyök</h2>'}
          
          <!-- All Gazettes Listing -->
          <div class="flex-column listing">
            <div class="flex-column list-items">
              ${this.renderList(items)}
            </div>

            <!-- Paginator -->
            ${this.renderPaginator(currentPage, totalPages)}
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <div class="callout blue">
            <i class="ri-information-fill callout-icon"></i>
            <div class="callout-content">
              <p class="callout-text">
                A Magyar Közlöny Magyarország hivatalos lapja, amelyben a jogszabályokat és 
                más fontos állami döntéseket és közleményeket hirdetnek ki. A Magyar Közlöny 
                digitálisan aláírt és időbélyegzővel ellátott, ez garantálja tartalmának 
                hitelességét és eredetiségét.
              </p>
              <a href="jogszabalyi-hatter.html" class="callout-action">További információk</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Export singleton instance
export const gazetteRenderer = new GazetteRenderer();

