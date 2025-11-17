// ============================================
// Paginator State Toggle
// ============================================
// Handles active state management for pagination controls

/**
 * Initialize paginator functionality
 * @param {string} selector - CSS selector for paginator containers
 */
export function initPaginator(selector = '.paginator') {
  const paginators = document.querySelectorAll(selector);
  
  if (paginators.length === 0) {
    console.log('No paginators found on this page');
    return;
  }
  
  paginators.forEach(paginator => {
    setupPaginator(paginator);
  });
}

/**
 * Set up a single paginator instance
 * @param {HTMLElement} paginator - The paginator container element
 */
function setupPaginator(paginator) {
  const pageLinks = paginator.querySelectorAll('.paginator-page:not(.ellipsis)');
  const prevButton = paginator.querySelector('.paginator-button[aria-label*="Previous"]');
  const nextButton = paginator.querySelector('.paginator-button[aria-label*="Next"]');
  
  if (pageLinks.length === 0) {
    return;
  }
  
  // Add click event listeners to all page links
  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Don't do anything if clicking the already active page
      if (link.classList.contains('active')) {
        return;
      }
      
      // Remove active state from current active page
      const currentActive = paginator.querySelector('.paginator-page.active');
      if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.removeAttribute('aria-current');
      }
      
      // Add active state to clicked page
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      
      // Update prev/next button states
      updateNavigationButtons(paginator, pageLinks, link);
      
      // Optional: Trigger custom event for external listeners
      const event = new CustomEvent('paginatorChange', {
        detail: {
          pageNumber: link.textContent.trim(),
          pageElement: link
        },
        bubbles: true
      });
      paginator.dispatchEvent(event);
    });
  });
  
  // Set up prev/next button handlers
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      navigateToPreviousPage(paginator, pageLinks);
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      navigateToNextPage(paginator, pageLinks);
    });
  }
}

/**
 * Navigate to the previous page
 * @param {HTMLElement} paginator - The paginator container
 * @param {NodeList} pageLinks - All page link elements
 */
function navigateToPreviousPage(paginator, pageLinks) {
  const currentActive = paginator.querySelector('.paginator-page.active');
  if (!currentActive) return;
  
  const pageLinksArray = Array.from(pageLinks);
  const currentIndex = pageLinksArray.indexOf(currentActive);
  
  if (currentIndex > 0) {
    // Trigger click on previous page
    pageLinksArray[currentIndex - 1].click();
  }
}

/**
 * Navigate to the next page
 * @param {HTMLElement} paginator - The paginator container
 * @param {NodeList} pageLinks - All page link elements
 */
function navigateToNextPage(paginator, pageLinks) {
  const currentActive = paginator.querySelector('.paginator-page.active');
  if (!currentActive) return;
  
  const pageLinksArray = Array.from(pageLinks);
  const currentIndex = pageLinksArray.indexOf(currentActive);
  
  if (currentIndex < pageLinksArray.length - 1) {
    // Trigger click on next page
    pageLinksArray[currentIndex + 1].click();
  }
}

/**
 * Update the enabled/disabled state of prev/next buttons
 * @param {HTMLElement} paginator - The paginator container
 * @param {NodeList} pageLinks - All page link elements
 * @param {HTMLElement} currentLink - Currently active page link
 */
function updateNavigationButtons(paginator, pageLinks, currentLink) {
  const prevButton = paginator.querySelector('.paginator-button[aria-label*="Previous"]');
  const nextButton = paginator.querySelector('.paginator-button[aria-label*="Next"]');
  
  if (!prevButton || !nextButton) return;
  
  const pageLinksArray = Array.from(pageLinks);
  const currentIndex = pageLinksArray.indexOf(currentLink);
  
  // Update Previous button
  if (currentIndex === 0) {
    // First page - disable prev button
    prevButton.classList.remove('enabled');
    prevButton.classList.add('disabled');
    prevButton.setAttribute('disabled', 'disabled');
  } else {
    // Not first page - enable prev button
    prevButton.classList.remove('disabled');
    prevButton.classList.add('enabled');
    prevButton.removeAttribute('disabled');
  }
  
  // Update Next button
  if (currentIndex === pageLinksArray.length - 1) {
    // Last page - disable next button
    nextButton.classList.remove('enabled');
    nextButton.classList.add('disabled');
    nextButton.setAttribute('disabled', 'disabled');
  } else {
    // Not last page - enable next button
    nextButton.classList.remove('disabled');
    nextButton.classList.add('enabled');
    nextButton.removeAttribute('disabled');
  }
}

/**
 * Programmatically set active page
 * @param {HTMLElement} paginator - The paginator container
 * @param {number|string} pageNumber - Page number to set as active
 */
export function setActivePage(paginator, pageNumber) {
  const pageLinks = paginator.querySelectorAll('.paginator-page:not(.ellipsis)');
  
  pageLinks.forEach(link => {
    if (link.textContent.trim() === String(pageNumber)) {
      link.click();
    }
  });
}

