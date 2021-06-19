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

export const buildTOC = () => {
  const wrapper = document.getElementById( 'toc' );

  const list = document.createElement( 'ul' );

  list.classList.add( 'toc-list' );

  getHeadings().forEach( heading => {
    const link = document.createElement( 'a' );

    link.innerHTML = heading.innerHTML;
    link.href = `#${heading.id}`;
    link.classList.add( 'toc-link' );
    link.dataset.offset = heading.offsetTop;

    const item = document.createElement( 'li' );

    item.appendChild( link );
    list.appendChild( item );
  } );

  wrapper.appendChild( list );
};
