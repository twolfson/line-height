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
// TODO: Also test that ratio is used

// Create our lineHeight calculator
var _ratioCache = {};
function lineHeight(node) {
  // Grab the line-height via style
  var lnHeightStr = computedStyle(node, 'line-height'),
      lnHeight = parseFloat(lnHeightStr, 10),
      _multiplier = 1;

  // If the lineHeight is in pt, convert it to pixels
  // https://developer.mozilla.org/en-US/docs/Web/CSS/length
  if (lnHeightStr.indexOf('pt') !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
  } else if (lnHeightStr === lnHeight + '') {
  // TODO: Might need to check if this was actually a string
  // Otherwise, if the lineHeight did not contain a unit (i.e. it was numeric), treat it as "normal" with a multiplier
    lnHeightStr = 'normal';
    _multiplier = lnHeight;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === 'normal') {
    // If we don't yet have our ratio, calculate it
    var nodeName = node.nodeName,
        _ratio = _ratioCache[nodeName];
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
          _fontSize = parseFloat(_fontSizeStr, 10),
          _height = _node.offsetHeight;

      // Save our ratio
      _ratio = _height / _fontSize;
      alert(_ratio);
      _ratioCache[nodeName] = _ratio;

      // Remove our child from the DOM
      body.removeChild(_node);
    }

    // Calculate the height with our ratio
    var fontSizeStr = computedStyle(node, 'font-size'),
        fontSize = parseFloat(fontSizeStr, 10);
    lnHeight = Math.round(fontSize * _ratio * _multiplier);
  }

  // Return the calculated height
  return lnHeight;
}

// Utility method to clear out ratio cache
lineHeight.clearCache = function () {
  _ratioCache = {};
};

// Export lineHeight
module.exports = lineHeight;