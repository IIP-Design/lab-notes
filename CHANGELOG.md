# Change Log

**All notable changes to this project will be documented in this file.**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/IIP-Design/lab-notes/compare/v1.1.0...HEAD)

_This sections lists changes committed since most recent release_

### Added:

- A changelog layout to fetch and render a remote changelog Markdown file
- A presentation layout to embed PowerPoint and PDF files
- A blog roll component
- Skip link in header for improved accessibility
- Link underline and hover effect within page and post content
- A Changelog file to track updates to this theme

### Changed:

- Use data files to dynamically generate navigation sidebar rather than requiring an `_includes` override
- Make logo and favicon relative URLs and default to those found in the assets directory
- Extracted the tag lists from the post layout into a reusable component
- Updated the theme documentation

### Security:

- Update Ruby and JavaScript dependencies

## [v1.1.0](https://github.com/IIP-Design/lab-notes/compare/v1.0.0...v1.1.0) - 2020.06.16

### Added:

- Support for emojis in Markdown files
- JavaScript linting using the GPA Lab ESLint config

### Fixed:

- Removed `.vscode` directory form source control

### Security:

- Update JavaScript dependencies

## [v1.0.0](https://github.com/IIP-Design/lab-notes/releases/tag/v1.0.0) - 2020.02.13 (Initial Release)

### Added:

- Three templates to allow for varied page configurations: default, page, and post
- Optional sidebar navigation component
- Syntax highlighting using `highlight.js` for the languages/filetypes commonly used by the GPA Lab team. Namely:
  - Apache
  - Bash
  - CSS
  - Dockerfile
  - HTTP
  - JavaScript
  - JSON
  - Less
  - Markdown
  - PHP
  - Plaintext
  - SASS/SCSS
  - Shell
  - SQL
  - Vim
  - XML
  - YAML
