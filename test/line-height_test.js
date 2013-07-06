// Load in test dependencies
var lineHeight = require('../lib/line-height.js'),
    computedStyle = require('computed-style');

// Create assertion methods (at the time of writing Chai does not work in <=IE8)
function assertEqual(a, b) {
  if (a !== b) {
    throw new Error('Assertion error: ' + a + ' !== ' + b);
  }
}
function assertNotEqual(a, b) {
  if (a == b) {
    throw new Error('Assertion error: ' + a + ' == ' + b);
  }
}

// Basic tests
describe('An unstyled div', function () {
  before(function () {
    var node = document.createElement('div');
    node.className = 'test-div';
    node.innerHTML = 'abc';
    document.body.appendChild(node);
    this.node = node;
  });
  after(function () {
    document.body.removeChild(this.node);
  });

  describe('processed by line-height', function () {
    before(function () {
      this.lineHeight = lineHeight(this.node);
    });

    it('has a line-height which is a number', function () {
      assertEqual(typeof this.lineHeight, 'number');
      assertNotEqual(isNaN(this.lineHeight), true);
    });

    it('has a line-height equal to its height', function () {
      var heightStr = computedStyle(this.node, 'height'),
          height = parseInt(heightStr, 10);
      assertEqual(this.lineHeight, height);
    });
  });
});


// TODO: Test all other CSS formats (%, em, px, cm, rem)