/**
 * Gazette Data Service
 * Generates and manages gazette listing data
 */

export class GazetteDataService {
  constructor() {
    this.gazettes = [];
    this.itemsPerPage = 10;
    this.totalItems = 150;
    this.startNumber = 21; // Start from number 21
    this.year = 2025;
    this.startDate = new Date(2025, 0, 1); // January 1, 2025
    
    this.generateData();
  }

  /**
   * Generate gazette data
   */
  generateData() {
    this.gazettes = [];
    
    for (let i = 0; i < this.totalItems; i++) {
      const number = this.startNumber + i;
      const daysToAdd = i * 1; // One gazette per day
      const gazetteDate = new Date(this.startDate);
      gazetteDate.setDate(gazetteDate.getDate() + daysToAdd);
      
      this.gazettes.push({
        id: i + 1,
        title: `Magyar Közlöny ${this.year}. évi ${number}. szám`,
        date: this.formatDate(gazetteDate),
        year: this.year,
        number: number,
        pdfUrl: `#gazette-${number}`,
        reasonsUrl: `#reasons-${number}`,
        attachmentsUrl: `#attachments-${number}`,
        isFeatured: i === 0 // First item is featured
      });
    }
    
    // Reverse so newest is first
    this.gazettes.reverse();
    
    console.log(`📊 Generated ${this.totalItems} gazette entries`);
  }

  /**
   * Format date to Hungarian format
   * @param {Date} date 
   * @returns {string}
   */
  formatDate(date) {
    const year = date.getFullYear();
    const months = [
      'január', 'február', 'március', 'április', 'május', 'június',
      'július', 'augusztus', 'szeptember', 'október', 'november', 'december'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${year}. ${month} ${day}.`;
  }

  /**
   * Get paginated gazettes
   * @param {number} page - Page number (1-based)
   * @returns {Object} - { items, currentPage, totalPages, totalItems }
   */
  getPage(page = 1) {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Validate page number
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const items = this.gazettes.slice(startIndex, endIndex);
    
    // Get featured item (first overall, shown separately on page 1)
    const featuredItem = page === 1 ? this.gazettes[0] : null;
    
    return {
      items: featuredItem ? items.slice(1) : items, // Skip featured on page 1
      featuredItem,
      currentPage: page,
      totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  }

  /**
   * Get all gazettes
   * @returns {Array}
   */
  getAll() {
    return this.gazettes;
  }

  /**
   * Get gazette by ID
   * @param {number} id 
   * @returns {Object|null}
   */
  getById(id) {
    return this.gazettes.find(g => g.id === id) || null;
  }

  /**
   * Get gazette by number
   * @param {number} number 
   * @returns {Object|null}
   */
  getByNumber(number) {
    return this.gazettes.find(g => g.number === number) || null;
  }

  /**
   * Search gazettes
   * @param {string} query 
   * @returns {Array}
   */
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.gazettes.filter(g => 
      g.title.toLowerCase().includes(lowerQuery) ||
      g.date.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export singleton instance
export const gazetteData = new GazetteDataService();

