# line-height [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Calculate line-height of an HTML element (IE6 compatible)

[![browser support](https://ci.testling.com/twolfson/line-height.png)](https://ci.testling.com/twolfson/line-height)

## Getting Started
Install the module with: `npm install line-height`

```javascript
var line_height = require('line-height');
line_height.awesome(); // "awesome"
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Solved problems
### `line-height: normal`
In a large amount of browsers, the [computed style][computed-style] for an element's `line-height` is `normal` by default.

// TODO: Make sure we have a test against parent sizing

If it is specified by any other means (e.g. ancestor has a `line-height` or the element has a `line-height` specified), it is either a [CSS length][css-length].

To solve this problem, we create a vanilla element of the same `tagName` (e.g. `h2` if it is an `h2`), and record the ratio of `offsetHeight` (height of the element) to computed `font-size`. Then, we take the `font-size` of the original element and multiply it by this ratio. The result is the height of 1 line of the element (i.e. `line-height`).

[computed-style]:
[css-length]:

### Converting `pt` to `px`

### `numeric` font-size in IE6
- In IE6, `numeric` `font-size`s (e.g. `font-size: 2.3`) are returned as the font-size. Fortunately, these are relative just like `em`s.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
