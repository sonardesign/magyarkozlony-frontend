/**
 * Pages Configuration
 * Defines all routes and their metadata
 */

export const pages = [
  {
    path: '/',
    name: 'index',
    title: 'Magyar Közlöny',
    htmlFile: 'index.html',
    dynamic: true, // This page has dynamic content
    page: 1
  },
  {
    path: '/page/:page',
    name: 'index-paginated',
    title: 'Magyar Közlöny',
    htmlFile: 'index.html',
    dynamic: true, // This page has dynamic content
    isPattern: true // This is a route pattern
  },
  {
    path: '/tanusitvanyok',
    name: 'tanusitvanyok',
    title: 'Tanúsítványok - Magyar Közlöny',
    htmlFile: 'tanusitvanyok.html'
  },
  {
    path: '/segitseg',
    name: 'segitseg',
    title: 'Segítség - Magyar Közlöny',
    htmlFile: 'segitseg.html'
  },
  {
    path: '/rss',
    name: 'rss',
    title: 'RSS - Magyar Közlöny',
    htmlFile: 'rss.html'
  },
  {
    path: '/impresszum',
    name: 'impresszum',
    title: 'Impresszum - Magyar Közlöny',
    htmlFile: 'impresszum.html'
  },
  {
    path: '/kapcsolat',
    name: 'kapcsolat',
    title: 'Kapcsolat - Magyar Közlöny',
    htmlFile: 'kapcsolat.html'
  },
  {
    path: '/jogszabalyi-hatter',
    name: 'jogszabalyi-hatter',
    title: 'Jogszabályi háttér - Magyar Közlöny',
    htmlFile: 'jogszabalyi-hatter.html'
  },
  {
    path: '/akadalymentesitesi-nyilatkozat',
    name: 'akadalymentesitesi-nyilatkozat',
    title: 'Akadálymentesítési nyilatkozat - Magyar Közlöny',
    htmlFile: 'akadalymentesitesi-nyilatkozat.html'
  }
];

/**
 * Get page config by path
 * @param {string} path - Route path
 * @returns {Object|null} - Page config or null
 */
export function getPageByPath(path) {
  return pages.find(page => page.path === path) || null;
}

/**
 * Get page config by name
 * @param {string} name - Page name
 * @returns {Object|null} - Page config or null
 */
export function getPageByName(name) {
  return pages.find(page => page.name === name) || null;
}

