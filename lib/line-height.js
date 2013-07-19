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
function lineHeight(node) {
  // Grab the line-height via style
  var lnHeightStr = computedStyle(node, 'line-height'),
      lnHeight = parseFloat(lnHeightStr, 10);

  // If the lineHeight did not contain a unit (i.e. it was numeric), convert it to ems (e.g. '2.3' === '2.3em')
  if (lnHeightStr === lnHeight + '') {
    // Save the old lineHeight style and update the em unit to the element
    var _lnHeightStyle = node.style.lineHeight;
    node.style.lineHeight = lnHeightStr + 'em';

    // Calculate the em based height
    lnHeightStr = computedStyle(node, 'line-height');
    lnHeight = parseFloat(lnHeightStr, 10);

    // Revert the lineHeight style
    if (_lnHeightStyle) {
      node.style.lineHeight = _lnHeightStyle;
    } else {
      delete node.style.lineHeight;
    }
  }

  // If the lineHeight is in pt, convert it to pixels
  // DEV: `em` units are converted to `pt` in IE6
  // Conversion ratio from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  if (lnHeightStr.indexOf('pt') !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === 'normal') {
    // Create a temporary node
    var nodeName = node.nodeName,
        _node = document.createElement(nodeName);
    _node.innerHTML = '&nbsp;';

    // Set the font-size of the element
    var fontSizeStr = computedStyle(node, 'font-size');
    _node.style.fontSize = fontSizeStr;

    // Append it to the body
    var body = document.body;
    body.appendChild(_node);

    // Assume the line height of the element is the height
    var height = _node.offsetHeight;
    lnHeight = height;

    // Remove our child from the DOM
    body.removeChild(_node);
  }

  // Return the calculated height
  return lnHeight;
}

// Export lineHeight
module.exports = lineHeight;