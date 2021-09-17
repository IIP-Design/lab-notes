import lunr from 'lunr';

// The number of characters to use when padding search result highlights.
const SNIPPET_BUFFER = 100;

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
 * Creates a snippet highlighting the search term within it's text context.
 * @param {string} before The 75 characters before the term.
 * @param {string} highlight The term to highlight.
 * @param {string} after The 75 characters after the term.
 * @returns {HTMLElement} A paragraph containing the highlighted snippet.
 */
const createHighlightSpan = ( before, highlight, after ) => {
  const span = document.createElement( 'span' );

  const beforeText = before.length >= SNIPPET_BUFFER ? `...${before}` : before;
  const afterText = after.length >= SNIPPET_BUFFER ? `${after}...` : after;

  const textString = `${beforeText}${highlight}${afterText}`;

  span.innerHTML = textString;

  return span;
};

/**
 * Extracts the positions data from the Lunr results object.
 * @param {Object} result A search result returned from Lunr.
 * @returns {Array} List of positions arrays (each with a start position and an length).
 */
const getPositions = result => {
  const metadata = result?.matchData?.metadata;

  if ( metadata ) {
    // The term used by Lunr is not always the same as the raw
    const modifiedTerm = Object.keys( metadata )[0];

    const positions = metadata[modifiedTerm]?.content_text?.position || [];

    return positions;
  }

  return [];
};

/**
 * Create an array of highlights that should be mixed together.
 * @param {Array[]} positions List of positions arrays (each with a start position and an length).
 * @returns List of start positions of the terms that should be grouped together.
 */
const reducePositions = positions => {
  // We only need the first position value (i.e. the start position).
  const flattened = positions.map( pos => pos[0] );

  const grouped = [];

  // Callback function for the positions reducer.
  const groupPositions = ( prev, curr ) => {
    // Initialize a group array with the first position.
    if ( !prev ) {
      const group = [curr];

      grouped.push( group );

    // If the next item is not within the snippet buffer, initialize a new group.
    } else if ( curr - prev > ( 2 * SNIPPET_BUFFER ) ) {
      const group = [curr];

      grouped.push( group );

    // If the next item is within the snippet buffer, add it to the previous group.
    } else {
      const groupCount = grouped.length;

      grouped[groupCount - 1].push( curr );
    }

    return curr; // Make the current value the next prev value.
  };

  if ( flattened.length === 1 ) {
    // If there is only one position in the results no need to reduce.
    grouped.push( [flattened[0]] );
  } else {
    flattened.reduce( groupPositions, null );
  }

  return grouped;
};

/**
 * Create a string with highlighted text.
 * @param {number[]} group List of start positions of the terms that should be grouped together.
 * @param {number} termLength Number of characters in the search term.
 * @param {string} text The content text for a given post.
 * @returns {string} The combined text of the highlighted snippet.
 */
const generateSnippetText = ( group, termLength, text ) => {
  let snippetText = '';
  let overlap = null;

  for ( let i = 0; i < group.length; i++ ) {
    const start = overlap > 0 ? group[i] + overlap : group[i];
    const end = overlap > 0 ? start + termLength - overlap : start + termLength;
    const after = group[i + 1] ? text.slice( end, group[i + 1] ) : '';

    overlap = group[i + 1] ? end - group[i + 1] : null;

    snippetText += `<span class="highlighted">${text.slice( start, end )}</span>${after}`;
  }

  const snippetData = {
    start: group[0],
    end: group[group.length - 1] + termLength,
    snippetText,
  };

  return snippetData;
};

/**
 * Generate a list of snippets from the post content.
 * @param {string} text The content text for a given post.
 * @param {Object} result A search result returned from Lunr.
 * @param {string} term The text being searched for.
 * @returns {HTMLElement} The list of text snippets containing the search term.
 */
const generateSnippets = ( text, result, term ) => {
  const termLength = term.length;
  const positions = getPositions( result );

  const container = document.createElement( 'div' );

  container.setAttribute( 'class', 'highlight-snippet' );

  if ( positions.length ) {
    const grouped = reducePositions( positions );

    grouped.forEach( group => {
      const { start, end, snippetText } = generateSnippetText( group, termLength, text );

      // Calculate the start and end position snippet padding text.
      const beforeStart = start > SNIPPET_BUFFER ? start - SNIPPET_BUFFER : 0;
      const afterEnd = text.length > end + SNIPPET_BUFFER ? end + SNIPPET_BUFFER : null;

      const before = text.slice( beforeStart, start );
      const highlight = snippetText;
      const after = afterEnd ? text.slice( end, afterEnd ) : text.slice( end );

      const snippet = createHighlightSpan( before, highlight, after );

      container.appendChild( snippet );
    } );

    return container;
  }
};

/**
 * If tags are present, create a list element to display them.
 * @param {string[]} tags A list of tags associated with a given item.
 * @param {string} searchTerm The text being searched for.
 * @returns {HTMLElement} The list of tags as an HTML element.
 */
const generateTags = ( tags, searchTerm ) => {
  if ( tags?.length ) {
    // Initialize all the components that constitute a tag list.
    const container = document.createElement( 'div' );
    const list = document.createElement( 'ul' );

    container.setAttribute( 'class', 'tags-search' );
    list.setAttribute( 'class', 'tags-list' );
    list.setAttribute( 'role', 'list' );

    // Loop over tags, creating a list item for each.
    tags.forEach( tag => {
      const item = document.createElement( 'li' );

      item.setAttribute( 'class', 'tag' );
      item.setAttribute( 'role', 'listitem' );
      if ( tag.toLowerCase().includes( searchTerm.toLowerCase() ) ) {
        item.setAttribute( 'class', 'tag highlighted' );
      }

      item.innerHTML = tag;
      list.appendChild( item );
    } );

    // Append the list of tags to the tags container.
    container.appendChild( list );

    return container;
  }
};

/**
 * Render the search results on the page.
 * @param {Object[]} results Matching posts returned by the Lunr search.
 * @param {Object[]} documents All the posts being searched.
 */
const displaySearchResults = ( results, documents, searchTerm ) => {
  const container = getResultsContainer();

  const list = document.createElement( 'ul' );

  list.setAttribute( 'class', 'search-results' );
  list.setAttribute( 'id', 'search-results' );

  results.forEach( result => {
    const item = documents.filter( doc => doc.url === result.ref )[0];

    if ( item ) {
      // Initialize all the components that constitute a list item.
      const listItem = document.createElement( 'li' );
      const title = document.createElement( 'a' );
      const excerpt = document.createElement( 'p' );
      const snippets = generateSnippets( item.content_text, result, searchTerm );
      const tags = generateTags( item.tags, searchTerm );

      // Populate the item title link.
      title.setAttribute( 'href', item.url );
      title.innerHTML = item.title;

      // Populate the item excerpt text.
      excerpt.innerHTML = truncate( item.content_text, 300 );

      // Populate the list item with the generated title and excerpt elements.
      listItem.setAttribute( 'class', 'search-result' );
      listItem.appendChild( title );
      if ( snippets ) {
        listItem.appendChild( snippets );
      } else {
        listItem.appendChild( excerpt );
      }
      if ( tags ) {
        listItem.appendChild( tags );
      }

      // Append the list item to the bottom of the results list.
      list.appendChild( listItem );
    }
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
const getFeed = async feedURL => {
  const response = await fetch( feedURL );

  return response.json();
};

/**
 * Construct the search index and ready the site to accept search queries.
 */
export const initializeSearch = async () => {
  // Pull the desired search term from the URL query params.
  const searchTerm = getQueryParam( 'query' );

  if ( searchTerm ) {
    const searchBox = document.getElementById( 'search-box' );

    searchBox.setAttribute( 'value', searchTerm );

    // Get the feed URL data attribute and use it to fetch the site's feed data.
    const feedURL = searchBox.dataset.feed;
    const feed = await getFeed( feedURL );

    // Establish an index of documents to search against.
    const documents = feed?.items || [];

    // Initialize Lunr with the fields it should search.
    // The post title is boosted to indicate matches on this field are more important.
    const index = lunr( function() {
      this.field( 'url' );
      this.field( 'title', { boost: 10 } );
      this.field( 'tags' );
      this.field( 'content_text' );
      this.metadataWhitelist = ['position'];

      documents.forEach( doc => {
        this.add( doc );
      }, this );
    } );

    const results = index.search( searchTerm ); // Use Lunr to perform a search

    if ( results.length ) {
      displaySearchResults( results, documents, searchTerm );
    } else {
      displayNoResults();
    }
  } else {
    displayNoResults();
  }
};
