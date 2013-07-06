// Load in test dependencies
var lineHeight = require('../lib/line-height.js'),
    assert = require('assert'),
    computedStyle = require('computed-style');

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
      assert.strictEqual(typeof this.lineHeight, 'number');
      assert.notEqual(isNaN(this.lineHeight), true);
    });

    it('has a line-height equal to its height', function () {
      var heightStr = computedStyle(this.node, 'height'),
          height = parseInt(heightStr, 10);
      assert.strictEqual(height, this.lineHeight);
    });
  });
});


// TODO: Test all other CSS formats (%, em, px, cm, rem)