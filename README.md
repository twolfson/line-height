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

If it is specified by any other means (e.g. ancestor has a `line-height` or the element has a `line-height` specified), it is either a [CSS length][css-length].

To solve this problem, we create a vanilla element of the same `nodeName` (e.g. `h2` if it is an `h2`), apply the original element's `font-size`, and return the element `offsetHeight`. This is the `height` of `1 line` of the element (i.e. `line-height`).

[computed-style]: https://developer.mozilla.org/en-US/docs/Web/API/window.getComputedStyle
[css-length]: https://developer.mozilla.org/en-US/docs/Web/CSS/length

### Converting `pt`, `pc`, `in`, `cm`, `mm` to `px`
In most browsers, when the `line-height` is specified in `pt`, `pc`, `in`, `cm` or `mm`, the `computedStyle` value is in the same unit.

To solve this problem, we use the [standard ratios of conversion to pixels][css-length] to make a conversion to pixels.

- 3pt to 4px
- 1pc to 16px
- 1in to 96px
- 2.54cm to 96px
- 25.4mm to 96px

### `numeric` font-size in IE6
In IE6, `numeric` `font-size`s (e.g. `font-size: 2.3`) are returned without a unit.

To solve this problem, we treat this number as an `em` since it is relative as well. To do that, we set the element's style to `"numeric value" + "em"`, compute and save the `font-size`, remove the temporary style. This conversion gives us the unit in `pt` which we know how to deal with from before.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
