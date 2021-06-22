/**
 * Retrieves a list of all heading elements on the page.
 * @returns {HTMLElement[]} The headings on the page listed in order from the top of the page.
 */
const getHeadings = () => {
  // List of headings to search for.
  const hs = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  ];

  const headings = [];

  // Iterate over each heading type, finding all instances on the page.
  hs.forEach( h => {
    const found = document.querySelectorAll( h );

    headings.push( ...found );
  } );

  // Sort headers by where they appear on the page from top to bottom.
  headings.sort( ( a, b ) => ( a.offsetTop < b.offsetTop ? -1 : 1 ) );

  return headings;
};

/**
 * Adds the class "active" to a given element.
 * @param {HTMLElement} el The targeted DOM element.
 */
const makeActive = el => {
  el.classList.add( 'active' );
};

/**
 * Removes the class "active" to a given element.
 * @param {HTMLElement} el The targeted DOM element.
 */
const makeInactive = el => {
  el.classList.remove( 'active' );
};

/**
 * Checks whether the current scroll position is at or past a provided y-offset position.
 * @param {number} current The current vertical position on the page.
 * @param {number} target The vertical position to test against.
 * @returns {boolean} Whether the page is scrolled past the provided value.
 */
const passedOffset = ( current, target ) => current >= target;

/**
 * Checks whether the user has reached the end of the page.
 * @returns {boolean} Whether or not the user has scrolled to the bottom of the page.
 */
const atTheBottom = () => ( window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight;

/**
 * Toggles the active class on and off of TOC links as the user scrolls down the page.
 * @param {number} offset The current vertical position on the page.
 * @param {HTMLElement[]} links List of the links in the table of contents.
 */
const trackInToc = ( offset, links ) => {
  links.forEach( ( link, idx ) => {
    // Retrieve the y-offset of the next link and check whether it has been passed.
    const next = links[idx + 1];
    const passedNext = next?.dataset?.offset ? passedOffset( offset, next.dataset.offset ) : false;

    if ( idx === 0 && !passedOffset( offset, link.dataset.offset ) ) {
      // First link in TOC & not passed.
      makeActive( link );
    } else if ( passedOffset( offset, link.dataset.offset ) && !passedNext ) {
      // Has been passed and next link has not been passed.
      makeActive( link );
    } else if ( idx + 1 === links.length && atTheBottom() ) {
      // Final link in TOC and the user has scrolled all the way to the bottom.
      // Addresses the situation where the final heading is brought into view by scrolling,
      // but there is not enough content on the page for it to reach the top of the page.
      makeActive( link );
    } else {
      makeInactive( link );
    }
  } );
};

/**
 * Checks the vertical position on the page, toggling the active links as appropriate.
 */
const addScrollListener = () => {
  let lastKnownScrollPosition = 0;
  let ticking = false;

  document.addEventListener( 'scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if ( !ticking ) {
      window.requestAnimationFrame( () => {
        const links = document.querySelectorAll( '.toc-link' );

        trackInToc( lastKnownScrollPosition, links );

        ticking = false;
      } );

      ticking = true;
    }
  } );
};

/**
 * Convert a list of headings into the linked-list of the table of contents.
 * @param {HTMLElement[]} headings The list of headings on the page.
 * @returns {HTMLElement} A ul element with each heading converted into an anchor link.
 */
const buildTOC = headings => {
  // Create ul to wrap list of links.
  const list = document.createElement( 'ul' );

  list.classList.add( 'toc-list' );

  // Iterate through headings creating a link for each one.
  headings.forEach( ( heading, idx ) => {
    const link = document.createElement( 'a' );

    link.innerHTML = heading.innerHTML;
    link.href = `#${heading.id}`;
    link.classList.add( 'toc-link' );
    link.dataset.offset = heading.offsetTop;

    // Initialize the first link as active.
    if ( idx === 0 ) {
      makeActive( link );
    }

    const item = document.createElement( 'li' );

    item.classList.add( `from-${heading.tagName.toLowerCase()}` );

    item.appendChild( link );
    list.appendChild( item );
  } );

  return list;
};

/**
 * Construct the table of contents and add the scroll event listener to control it's behavior.
 */
export const initializeTOC = () => {
  // Ensure that the TOC element is present on the page.
  const wrapper = document.getElementById( 'toc' );

  if ( wrapper ) {
    const headings = getHeadings();

    // Only construct the table of contents if there is more than one heading on the page.
    if ( headings.length > 1 ) {
      // If populated, make TOC visible to screen readers.
      wrapper.setAttribute( 'aria-hidden', 'false' );

      // Add title to the floating table of contents.
      const title = document.createElement( 'strong' );

      title.innerHTML = 'Table of Contents';

      wrapper.appendChild( title );

      // Populate the contents of the TOC.
      const toc = buildTOC( headings );

      wrapper.appendChild( toc );

      // Add scrolling behavior.
      addScrollListener();
    }
  }
};
