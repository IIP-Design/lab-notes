# Lab Notes

Lab Notes is the default theme for all [GPA/LAB](https://github.com/iip-design) documentation pages. It is an extensible markdown-driven Jekyll theme intended for use with GitHub Pages. It has built-in syntax highlighting and three layout options (default, page, and post). Additionally, the theme provides optional widgets for GitHub download links and navigation.

For full documentation or to see Lab Notes in action, take a look at our [docs page](https://iip-design.github.io/lab-notes/).

## Installation

When using this theme for GitHub Pages, we recommend placing all of your documentation in markdown files in a `docs` directory at the project root. Within this directory you will need a primary or entry page for your documentation called `index.md`. With this done, go to the repository's settings tab and find the GitHub Pages section:

![GitHub Pages admin settings](/assets/img/github-pages-settings.png)

From the source dropdown choose `master branch /docs folder` and save your changes. This will build your documentation site and serve it at `https://iip-design.github.io/repo-name/`. To apply the Lab Notes theme to this new documentation site, add the following line to the `_config.yml` file now found in your `docs` directory:

```yaml
remote_theme: IIP-Design/lab-notes
```

## Contributing

Bug reports and pull requests are welcome on our [issues page](https://github.com/IIP-Design/lab-notes/issues). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
