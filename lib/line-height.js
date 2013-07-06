// Load in dependencies
var computedStyle = require('computed-style');

// Free-flow of ideas
// Create same of node - styles could change, but this is for `normal` case
// Trim down node content - styles could change
// User-agent sniffing - Last resort
// Can we sniff on padding etc?
// Is there a constant for all browsers? Tried 19px. Disproven (IE10, Chrome).
// Is padding fucking with us? Nope (in Chrome).
// Try out 100% line-height. Acts as expected (for Chrome).
// Create a dummy node with font-size:normal!important,height:auto!important (double check if needed)
//    then, calculate font-size to height ratio

// TODO: For testing against need of CSS overrides, need to clean out ratio every time since it will be pre-cached otherwise.

// Create our lineHeight calculator
var _ratio;
function lineHeight(node) {
  // Grab the line-height via style
  var lineHeightStr = computedStyle(node, 'line-height'),
      lnHeight = parseInt(lineHeightStr, 10);

  // If the line-height is "normal", calculate by font-size
  if (lineHeightStr === 'normal') {
    var fontSizeStr = computedStyle(node, 'font-size'),
        fontSize = parseInt(fontSizeStr, 10);

    // If we don't yet have our ratio, calculate it
    if (_ratio === undefined) {
      // Create a temporary node
      var _node = document.createElement('div');
      _node.innerHTML = '&nbsp;';

      // Append it to the body
      var body = document.body;
      body.appendChild(_node);

      // TODO: Determine if we need CSS overrides since the styling has to be "normal" to even enter this case
      // Calculate the font-size and height
      var _fontSizeStr = computedStyle(_node, 'font-size'),
          _fontSize = parseInt(fontSizeStr, 10),
          _height = _node.offsetHeight;

      // Save our ratio
      _ratio = _height / _fontSize;
    }

    // Calculate the height with our ratio
    lnHeight = Math.round(fontSize * _ratio);
  }

  // Return the calculated height
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;