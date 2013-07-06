// Load in dependencies
var computedStyle = require('computed-style');

// Create our lineHeight calculator
function lineHeight(node) {
  // Grab the line-height via style
  var lineHeightStr = computedStyle(node, 'line-height'),
      lnHeight = parseInt(lineHeightStr, 10);

  // If the line-height is "normal", calculate by font-size
  if (lineHeightStr === 'normal') {
    var fontSizeStr = computedStyle(node, 'font-size'),
        fontSize = parseInt(fontSizeStr, 10);
    // Found via stack-overflow http://stackoverflow.com/questions/7849506/finding-setting-css-line-height-defaults
    // Proven via testling
    lnHeight = Math.floor(fontSize * 1.231);
  }

  // Return the calculated height
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;