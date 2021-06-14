const revealEls = () => {
  const navList = document.querySelector( '.nav-list' );
  const downloads = document.querySelector( '.sidebar-downloads' );

  if ( navList ) {
    navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
  }

  if ( downloads ) {
    downloads.style.display = downloads.style.display === 'block' ? 'none' : 'block';
  }
};

export const navToggleListener = () => {
  const toggle = document.getElementById( 'nav-toggle' );

  if ( toggle ) {
    toggle.addEventListener( 'click', () => {
      revealEls();
    } );
  }
};
