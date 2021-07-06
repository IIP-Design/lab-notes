---
title: Customize This Theme
layout: page
---

Beyond the base configuration options discussed in the [configuration section]({{ '/#configuration' | relative_url }}), Lab Notes - like all Jekyll themes - can be customized for your site. Any core theme file can be replaced by an equivalent file locally.

For example, to change the included page layout, you can add a file called `page.html` to a `_layouts` at the root of your docs. This will override the equivalent file from the theme.

## Development

To get started augmenting/developing this theme, clone the repository to your local machine by running the command `git clone git@github.com:IIP-Design/lab-notes.git`.

Enter the newly created project directory (`cd lab-notes`) and run `bundle install && npm install` to install all the project dependencies.

With this done, you can test the theme by running `bundle exec jekyll serve`, which will start a Jekyll server running at `http://localhost:4001`. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh. Note that any changes to the `_config.yml` file will requiring restarting the Jekyll server before taking effect.

When the theme is released, only the files in `_layouts`, `_includes`, `_sass`, and `assets` tracked with Git will be bundled. To add a custom directory to the theme-gem, edit the regexp in `lab-notes.gemspec` accordingly.

The JavaScript used by Lab Notes is compiled into a single bundle using Webpack. To add to this bundle, import your JavaScript into the `js/index.js` file at the project root and recompile the bundle by running `npm run build`.

For more information on Jekyll themes and their development, please refer to the [Jekyll docs](https://jekyllrb.com/docs/themes/).
