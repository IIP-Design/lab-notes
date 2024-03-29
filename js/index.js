import { initHighlighting } from './highlight';
import { initializeSearch } from './search';
import { initializeTOC } from './toc';
import { navToggleListener } from './menu-toggle';
import { ready } from './document-ready';

/**
 * Set up the page event listeners once the page is loaded.
 */
ready( () => {
  initHighlighting();
  initializeSearch();
  initializeTOC();
  navToggleListener();
} );
