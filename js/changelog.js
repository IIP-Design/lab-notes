import { Remarkable } from 'remarkable';

// Get the div where the changelog content will be inserted.
const contentRoot = document.getElementById( 'changelog-content' );

// Update insert the returned Changelog content into the target div.
function updateContent( data ) {
  const md = new Remarkable( {
    html: true,
  } );

  contentRoot.innerHTML = md.render( data );
}

const loadChangelog = () => {
  // Pull the changelog source URL from the root element dataset.
  const source = contentRoot?.dataset?.url;
  const errorMessage = '<p align="center">Requested changelog file not found</p>';

  if ( source ) {
    try {
      fetch( source )
        .then( response => {
          if ( response.status === 200 ) {
            return response.text();
          }

          return errorMessage;
        } )
        .then( data => updateContent( data ) );
    } catch ( err ) {
      console.error( err );
      updateContent( errorMessage );
    }
  }
};

// If the root div is found, initialize pull of Changelog content.
if ( contentRoot ) {
  loadChangelog();
}
