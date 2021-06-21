import { initHighlighting } from './highlight';
import { initializeTOC } from './toc';
import { navToggleListener } from './menu-toggle';
import { ready } from './document-ready';

initHighlighting();

/**
 * Set up the page event listeners once the page is loaded.
 */
ready( () => {
  initializeTOC();
  navToggleListener();
} );
