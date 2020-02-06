---
title: How To Use This Theme
layout: default
---

## How To Use This Theme

This is the default documentation theme for GPA/LAB documentation pages.

### Navigation

To add a navigation menu to the sidebar, add a file named `navigation.html` to the `_includes` directory of your docs. To use the built in styling for this navigation, use the below template in your `navigation.html`:

```html
<div class="nav-container">
  <p class="nav-header">Contents</p>
  <nav role="navigation">
    <ul class="nav" role="list">
      <li class="nav-item" role="listitem">
        <a href="{{ site.github.url }}/page1">Page 1</a>
      </li>
      <li class="nav-item" role="listitem">
        <a href="{{ site.github.url }}/page2">Page 2</a>
      </li>
    </ul>
  </nav>
</div>
```
