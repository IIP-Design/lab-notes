import hljs from 'highlight.js/lib/core';
import hljsDefineGraphQL from 'highlightjs-graphql';

// Import required language definitions.
import apache from 'highlight.js/lib/languages/apache';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import http from 'highlight.js/lib/languages/http';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import scss from 'highlight.js/lib/languages/scss';
import sql from 'highlight.js/lib/languages/sql';
import shell from 'highlight.js/lib/languages/shell';
import vim from 'highlight.js/lib/languages/vim';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

export const initHighlighting = () => {
  hljsDefineGraphQL( hljs );

  hljs.registerLanguage( 'apache', apache );
  hljs.registerLanguage( 'bash', bash );
  hljs.registerLanguage( 'css', css );
  hljs.registerLanguage( 'diff', diff );
  hljs.registerLanguage( 'dockerfile', dockerfile );
  hljs.registerLanguage( 'http', http );
  hljs.registerLanguage( 'javascript', javascript );
  hljs.registerLanguage( 'json', json );
  hljs.registerLanguage( 'less', less );
  hljs.registerLanguage( 'markdown', markdown );
  hljs.registerLanguage( 'php', php );
  hljs.registerLanguage( 'plaintext', plaintext );
  hljs.registerLanguage( 'scss', scss );
  hljs.registerLanguage( 'shell', shell );
  hljs.registerLanguage( 'sql', sql );
  hljs.registerLanguage( 'vim', vim );
  hljs.registerLanguage( 'xml', xml );
  hljs.registerLanguage( 'yaml', yaml );

  hljs.highlightAll();
};
