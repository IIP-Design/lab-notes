---
title: Theme Features
layout: page
---

## Layouts

There are six layouts included in Lab Notes:

1. **Default:** This is the base format as seen on this page, with a two column format - a sidebar with site information and main navigation menu on the left and a main section for content. To identify a markdown file as a post, add `layout: default` to the file's frontmatter. This layout is rarely used outright and more commonly serves as the basis for more complex layouts.
1. **Page:** The page format extends the default layout and is the most commonly used layout. It is very similar to the default layout except that supports the addition of a `title` value in the post's frontmatter. When added, this title is rendered in an H1 element at the top of the page. Additionally, if there are more than two h1-h6 elements on the page, a table of contents will automatically be generated and rendered on the page. This table of contents appears to the right of the main content section on desktop sized screens. On smaller devices it is omitted. To identify a markdown file as a page, add `layout: page` to the file's frontmatter.
1. **Full Width Page:** The full width page layout is identical to the page layout except that it does not include a table of contents. To identify a markdown file as a full width page, add `layout: page_full` to the file's frontmatter.
1. **Post:** The post layout is intended for serialize blog post-style content. It eliminates the sidebar and main navigation elements found on pages to provide more space for textual content. Like the page format, it has a title field that is populated by a `title` value in the post's frontmatter. It also includes `author`, `published`, and `tags` metadata values that can also be populated in the post's frontmatter. By default posts do not include a table of contents. However, by adding `toc: true` to the post's frontmatter, one can be added. To identify a markdown file as a post, add `layout: post` to the file's frontmatter.
1. **Presentation:** The presentation layout extends the post layout and allows for the inclusion of embed slideshows. In addition to the frontmatter options provided by the post layout, presentations also accept `description`, `file`, and `type` values. The `description` field is used to provide a brief summary of the embedded slideshow which appears above the embedded slides. The `file` and `type` fields pertain to the embedded slides themselves. The `file` value expects a link to the a statically hosted version of the slides. The slides can take the form of either PDFs or PowerPoints an so the accepted values for `type` are `pdf`, `ppt`, and `pptx`. To identify a markdown file as a post, add `layout: presentation` to the file's frontmatter.
1. **Changelog:** The changelog format is designed to fetch and render the Markdown content from a remote changelog file. To identify a markdown file as a changelog, add `layout: changelog` and set the `source` to the target changelog's raw GitHub content URL in the file's frontmatter. For example, in this repo the you would add `source: https://raw.githubusercontent.com/IIP-Design/lab-notes/main/CHANGELOG.md`

## Navigation

Perhaps the easiest and most common customization in Lab Notes is adding a navigation menu to the site sidebar. The sidebar navigation is automatically generated from a provided `main_nav.yml` data file, which lists all the desired links.

To implement this navigation, add a file named `main_nav.yml` to the `_data` directory of your docs. Within `_data/main_nav.yml`, add an field called `nav_list`, under which you will list all the nave entries. Each nav entry should have a title and a URL. URLs can be anchor tags, internal links to other pages in the docs site, or links to external resources. The site nav supports one level of nesting, which can be added by means of a `subitems` property for a given nav item. Each nested link in the sub-menu should have its own title and url property. By default, the navigation section will be titled `Contents`, but this can be changed by adding a `nav_title` entry to the `_data/main_nav.yml`. Finally, to display the sidebar navigation, set `show_nav` to `true` in your `_config.yml` file.

**Example main_nav.yml:**

```yml
nav_title: My Contents
nav_list:
  # Anchor links need to be surrounded by quotation marks.
  # Otherwise, they will be treated as comments.
  - title: Anchor Link
    url: '#anchor-link'

  # Internal links are treated as relative URLs, and the provided URL
  # will be appended to the doc site's base URL.
  - title: Internal Link
    url: internal-link

  # Nested internal link to pages within subdirectories are also allowed.
  - title: Nested Internal Link
    url: nested/internal-link
    subitems: # Any nav item can include one level of sub-items.
      - title: Nested Internal Link Item One
        url: nested/internal-link#item-one

      - title: Nested Internal Link Item Two
        url: nested/internal-link#item-two

  # Links to external sites must by prepended with the http or https protocol.
  # Otherwise, it will be treated as an internal link.
  - title: External Link
    url: https://www.external-link.com
```

## Syntax Highlighting

Lab Notes provides syntax highlighting powered by [highlight.js](https://highlightjs.org/). Syntax highlighting is invoked by surrounding a block of text with three back ticks (```). The resulting codeblocks can be further augmented by tagging the first set of back ticks with the target language. For example, to add a JavaScript code block you could write:

````md
```javascript
var hi = 'Hello World';

console.log(hi);
// Expected result: 'Hello World'
```
````

which would then be rendered rendered with syntax highlighting as so:

```javascript
var hi = 'Hello World';

console.log(hi);
// Expected result: 'Hello World'
```

While highlight.js supports a wide variety of programming languages, the majority of them are excluded to reduced the JavaScript bundle size. The following languages are most commonly used by the GPA/LAP team and therefore supported by Lab Notes out of the box:

| Language   | Tag                                                    |
| ---------- | ------------------------------------------------------ |
| Apache     | apache, apacheconf                                     |
| Bash       | bash, sh, zsh                                          |
| CSS        | css                                                    |
| Dockerfile | dockerfile, docker                                     |
| Git Diff   | diff                                                   |
| GraphQL    | graphql, gql                                           |
| HTML       | xml, html, xhtml, rss, atom, xjb, xsd, xsl, plist, svg |
| HTTP       | http, https                                            |
| JavaScript | javascript, js, jsx                                    |
| JSON       | json                                                   |
| Less       | less                                                   |
| Markdown   | markdown, md, mkdown, mkd                              |
| PHP        | php, php3, php4, php5, php6, php7                      |
| Plaintext  | plaintext, txt, text                                   |
| SCSS       | scss                                                   |
| Shell      | shell, console                                         |
| SQL        | sql                                                    |
| Vim Script | vim                                                    |
| YAML       | yml, yaml                                              |

By default Jekyll themes on GitHub provide syntax highlighting using [Rouge](http://rouge.jneen.net/). While generally not a problem, in certain circumstances Rouge can conflict with highlight.js. To avoid this, we recommend disabling Rouge by adding the following snippet to your `_config.yml` file:

```yml
markdown: kramdown
kramdown:
  syntax_highlighter_opts:
    disable: true
```
