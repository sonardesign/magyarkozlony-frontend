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
  // NOTE: We don't prevent default here to allow the router to intercept the navigation
  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't do anything if clicking the already active page
      if (link.classList.contains('active')) {
        e.preventDefault();
        return;
      }
      
      // Let the router handle navigation by NOT preventing default
      // The visual state will be updated after navigation completes
      
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
  
  // Set initial button states based on currently active page
  const currentActive = paginator.querySelector('.paginator-page.active');
  if (currentActive) {
    updateNavigationButtons(paginator, pageLinks, currentActive);
  }
}

/**
 * Navigate to the previous page
 * @param {HTMLElement} paginator - The paginator container
 * @param {NodeList} pageLinks - All page link elements
 */
function navigateToPreviousPage(paginator, pageLinks) {
  const prevButton = paginator.querySelector('.paginator-button[aria-label*="Previous"]');
  
  if (!prevButton || prevButton.disabled) {
    return;
  }
  
  // Get the page number from the button's data attribute
  const targetPage = prevButton.getAttribute('data-page');
  
  if (targetPage) {
    // Navigate using the router
    const targetUrl = targetPage === '1' ? '/' : `/page/${targetPage}`;
    
    // Use router to navigate (it will handle everything)
    if (window.app && window.app.router) {
      window.app.router.navigate(targetUrl);
    } else {
      // Fallback: update URL directly
      window.location.href = targetUrl;
    }
  }
}

/**
 * Navigate to the next page
 * @param {HTMLElement} paginator - The paginator container
 * @param {NodeList} pageLinks - All page link elements
 */
function navigateToNextPage(paginator, pageLinks) {
  const nextButton = paginator.querySelector('.paginator-button[aria-label*="Next"]');
  
  if (!nextButton || nextButton.disabled) {
    return;
  }
  
  // Get the page number from the button's data-attribute
  const targetPage = nextButton.getAttribute('data-page');
  
  if (targetPage) {
    // Navigate using the router
    const targetUrl = targetPage === '1' ? '/' : `/page/${targetPage}`;
    
    // Use router to navigate (it will handle everything)
    if (window.app && window.app.router) {
      window.app.router.navigate(targetUrl);
    } else {
      // Fallback: update URL directly
      window.location.href = targetUrl;
    }
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

