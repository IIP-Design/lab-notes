import lunr from 'lunr';

/**
 * Retrieve the search term from the window location.
 * @param {string} param The query param to be retrieved
 * @returns {string} The search term provided by the user.
 */
const getQueryParam = param => {
  if ( window?.location?.search ) {
    const params = window.location.search.substring( 1 );

    // Get an array of all the query params.
    const paramArr = params.split( '&' );

    let term = null;

    // Identify the key of each query param.
    // If it matches the provided param, then return it's value.
    paramArr.forEach( item => {
      const pair = item.split( '=' );

      if ( pair[0] === param ) {
        term = decodeURIComponent( pair[1].replace( /\+/g, '%20' ) ); // Encode spaces.
      }
    } );

    return term;
  }
};

/**
 * Ensure that a string does not exceed a maximum length.
 * Truncate, trim whitespace, and add trailing ellipsis if it does.
 * @param {string} str The string to be trimmed.
 * @param {number} length The maximum length of the excerpt.
 * @returns {string} The truncated string.
 */
const truncate = ( str, length ) => ( str.length < length ? str : `${str.substring( 0, length ).trim()}...` );

/**
 * Retrieves the element within which search should be rendered.
 * @returns {HTMLElement} The search results container.
 */
const getResultsContainer = () => document.getElementById( 'search-results-container' );

/**
 * Render the search results on the page.
 * @param {Object[]} results Matching posts returned by the lunr search.
 * @param {Object[]} documents All the posts being searched.
 */
const displaySearchResults = ( results, documents ) => {
  const container = getResultsContainer();

  const list = document.createElement( 'ul' );

  list.setAttribute( 'class', 'search-results' );
  list.setAttribute( 'id', 'search-results' );

  results.forEach( result => {
    const item = documents.filter( doc => doc.url === result.ref )[0];

    // Initialize all the components that constitute a list item.
    const listItem = document.createElement( 'li' );
    const title = document.createElement( 'a' );
    const excerpt = document.createElement( 'p' );

    // Populate the item title link.
    title.setAttribute( 'href', item.url );
    title.innerHTML = item.title;

    // Populate the item excerpt text.
    excerpt.innerHTML = truncate( item.content_text, 300 );

    // Populate the list item with the generated title and excerpt elements.
    listItem.setAttribute( 'class', 'search-result' );
    listItem.appendChild( title );
    listItem.appendChild( excerpt );

    // Append the list item to the bottom of the results list.
    list.appendChild( listItem );
  } );

  // And finally append the ul with it's children to the results container.
  container.appendChild( list );
};

/**
 * Renders a message when no results are found.
 */
const displayNoResults = () => {
  const container = getResultsContainer();

  if ( container ) {
    container.innerHTML = '<div class="no-results"><span>No results found</span></div>';
  }
};

/**
 * Retrieve a JSON version of the site content.
 * @returns {Object} The site content in JSON format.
 */
const getFeed = async () => {
  const response = await fetch( '/feed.json' );

  return response.json();
};

/**
 * Construct the search index and ready the site to accept search queries.
 */
export const initializeSearch = async () => {
  // Pull the desired search term from the URL query params.
  const searchTerm = getQueryParam( 'query' );

  if ( searchTerm ) {
    const feed = await getFeed();

    // Establish an index of documents to search against.
    const documents = feed?.items || [];

    document.getElementById( 'search-box' ).setAttribute( 'value', searchTerm );

    // Initialize lunr with the fields it should search.
    // The post title is boosted to indicate matches on this field are more important.
    const index = lunr( function() {
      this.field( 'url' );
      this.field( 'title', { boost: 10 } );
      this.field( 'tags' );
      this.field( 'content_text' );

      documents.forEach( doc => {
        this.add( doc );
      }, this );
    } );

    const results = index.search( searchTerm ); // Get lunr to perform a search

    if ( results.length ) {
      displaySearchResults( results, documents );
    } else {
      displayNoResults();
    }
  } else {
    displayNoResults();
  }
};
