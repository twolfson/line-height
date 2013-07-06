// Load in dependencies
var computedStyle = require('computed-style');

// Create our lineHeight calculator
function lineHeight(node) {
  // Grab the line height via style, coerce it to a number, and return
  var lineHeightStr = computedStyle(node, 'line-height'),
      lnHeight = parseInt(lineHeightStr, 10);
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;