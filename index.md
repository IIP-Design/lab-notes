---
title: Getting Started with Lab Notes
layout: page
---

Lab Notes is the default theme for all [GPA/LAB](https://github.com/iip-design) documentation pages. It is an extensible markdown-driven Jekyll theme intended for use with GitHub Pages. It has built-in syntax highlighting, a blog roll component for landing pages, and several [layout options](/features#layouts). Additionally, the theme provides optional widgets for GitHub download links and navigation.

## Installation

When using this theme for GitHub Pages, we recommend placing all of your documentation in markdown files in a `docs` directory at the project root. Within this directory you will need a primary or entry page for your documentation called `index.md`. With this done, go to the repository's settings tab and find the GitHub Pages section:

![GitHub Pages admin settings]({{ '/assets/img/github-pages-settings.png' | relative_url }})

From the source dropdown choose the `main` branch and the `/docs` folder and save your changes. This will build your documentation site and serve it at `https://iip-design.github.io/repo-name/`. To apply the Lab Notes theme to this new documentation site, add the following line to the `_config.yml` file now found in your `docs` directory:

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
- **show_nav**: Used in conjunction with a `main_nav.yaml` data file (see the [navigation section](/features#navigation)) to add a main site navigation menu widget to the page sidebar.

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
