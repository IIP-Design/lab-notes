---
title: About This Theme
layout: default
---

# About This Theme

Lab Notes is the default theme for all [GPA/LAB](https://github.com/iip-design) documentation pages. It is an extensible markdown-driven Jekyll theme intended for use with GitHub Pages. It has built-in syntax highlighting and three layout options (default, page, and post). Additionally, the theme provides optional widgets for GitHub download links and navigation.

## Installation

When using this theme for GitHub Pages, we recommend placing all of your documentation in markdown files in a `docs` directory at the project root. Within this directory you will need a primary or entry page for your documentation called `index.md`. With this done, go to the repository's settings tab and find the GitHub Pages section:

![GitHub Pages admin settings]({{ '/assets/img/github-pages-settings.png' | relative_url }})

From the source dropdown choose `master branch /docs folder` and save your changes. This will build your documentation site and serve it at `https://iip-design.github.io/repo-name/`. To apply the Lab Notes theme to this new documentation site, add the following line to the `_config.yml` file now found in your `docs` directory:

```yaml
remote_theme: IIP-Design/lab-notes
```

## Configuration

There are several configuration options built into the theme, specifically:

- **title**: Sets the title for the site, which appears in the header. If left blank this will default to the repository title (assuming you are hosting the site on GitHub Pages).
- **author**: Identifies the project maintainer in the "This project is maintained by..." line at the bottom of the page. If left blank, the project maintainer credit line will not be included.
- **author_homepage**: A link to the maintainer's homepage (or any other site) that is used to hyperlink the author name in the maintainer credit line.
- **description**: A description of the of the project/site. This is included near the top of the sidebar below the site logo. Omitted if left blank.
- **favicon**: Path to an image to use for the site's favicon. It can be a relative or absolute path. Note that when using relative paths on GitHub Pages the base url is `https://user-name.github.io`. Will default to the State Department seal if left blank.
- **logo**: Path to an image to use for the site's logo, which appears at the top of the sidebar. It can be a relative or absolute path. As with the favicon, on GitHub Pages the base url is `https://user-name.github.io`. Will default to the State Department seal if left blank. If you want to remove the logo entirely, set logo to `false`.
- **show_downloads**: For hosting on GitHub Pages. If set to true, this will add a widget to the sidebar with download links for .zip and .tar releases of the hosting repository as well as a link to the repository page on GitHub.
- **show_nav**: Used in conjunction with a `navigation.html` file (see the [Navigation section](#navigation) below) to add a navigation menu widget to the page sidebar.

These configurations should be set in the `_config.yml` at the root of your `docs` directory, and will look something like this:

```yml
title: My Project
author: My Name
author_homepage: https://github.com/my-name/
description: Documentation for My Project, a project that does something cool.
favicon: /my-project/assets/my-favicon.ico
logo: /my-project/assets/my-logo.svg
show_downloads: true
show_nav: true
```

## Layouts

There are four layouts included in Lab Notes:

1. **Default:** This is the base format as seen on this page, with a two column format - a sidebar with navigation and a main section for content. To identify a markdown file as a post, add `layout: default` to the file's frontmatter.
1. **Page:** The page format only differs from the default format in that it has a title field that can be populated using the `title` value in the post's frontmatter. To identify a markdown file as a post, add `layout: page` to the file's frontmatter.
1. **Post:** The post format is intended more for blog post-style content. It eliminates the sidebar element found on pages to provide more space for textual content. Like the page format, it has a title field that is populated by a `title` value in the post's frontmatter. It also includes `author`, `date`, and `tags` values that can also be populated in the post's frontmatter. To identify a markdown file as a post, add `layout: post` to the file's frontmatter.
1. **Changelog:** The changelog format is designed to fetch and render the Markdown content from a remote changelog file. To identify a markdown file as a changelog, add `layout: changelog` and set the `source` to the target changelog's raw GitHub content URL in the file's frontmatter. For example, in this repo the you would add `source: https://raw.githubusercontent.com/IIP-Design/lab-notes/main/CHANGELOG.md`

## Customization

Beyond the base configuration options [discussed above](#configuration), Lab Notes - like all Jekyll themes - can be customized for your site. Any core theme file can be replaced by an equivalent file locally.

For example, to change the included page layout, you can add a file called `page.html` to a `_layouts` at the root of your docs. This will override the equivalent file from the theme.

## Navigation

Perhaps the easiest and most common customization in Lab Notes is adding a navigation menu to the site sidebar. The sidebar navigation is automatically generated from a provided `main_nav` data file, which lists all the desired links.

To implement this navigation, add a file named `main_nav.yml` to the `_data` directory of your docs. Within `_data/main_nav.yml`, add an field called `nav_list`, under which you will list all the nave entries. Each nav entry should have a title and a URL. URLs can be anchor tags, internal links to other pages in the docs site, or links to external resources. By default, the navigation section will be titled `Contents`, but this can be changed by adding a `nav_title` entry to the `_data/main_nav.yml`. Finally, to display the sidebar navigation, set `show_nav` to `true` in your `_config.yml` file.

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

  # Links to external sites must by prepended with the http or https protocol.
  # Otherwise, it will be treated as an internal link.
  - title: External Link
    url: https://www.external-link.com
```

## Syntax Highlighting

Lab Notes provides syntax highlighting powered by [highlight.js](https://highlightjs.org/). Syntax highlighting is invoked by surrounding a block of text with three back ticks (```) and can be further augmented by tagging the first set of back ticks with the target language. For example, to add a JavaScript code block you could write:

````md
```javascript
var hi = 'Hello World';

console.log(hi);
// Expected result: 'hi'
```
````

While highlight.js supports a wide variety of programming languages, the majority of them are excluded to reduced the JavaScript bundle size. The following languages are most commonly used by the GPA/LAP team and therefore supported by Lab Notes out of the box:

| Language   | Tag                                                    |
| ---------- | ------------------------------------------------------ |
| Apache     | apache, apacheconf                                     |
| Bash       | bash, sh, zsh                                          |
| CSS        | css                                                    |
| Dockerfile | dockerfile, docker                                     |
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

## Development

Clone the repository to your local machine by running the command `git clone git@github.com:IIP-Design/lab-notes.git`.

Enter the newly created project directory (`cd lab-notes`) and run `bundle install && npm install` to install all the project dependencies.

With this done, you can test the theme by running `bundle exec jekyll serve`, which will start a Jekyll server running at `http://localhost:4000`. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh.

When the theme is released, only the files in `_layouts`, `_includes`, `_sass`, and `assets` tracked with Git will be bundled. To add a custom directory to the theme-gem, edit the regexp in `lab-notes.gemspec` accordingly.

The JavaScript used by Lab Notes is compiled into a single bundle using Webpack. To add to this bundle, import your JavaScript into the `js/index.js` file at the project root and recompile the bundle by running `npm run build`.

For more information on Jekyll themes and their development, please refer to the [Jekyll docs](https://jekyllrb.com/docs/themes/).
