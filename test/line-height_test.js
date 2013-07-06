// Load in test dependencies
var lineHeight = require('../lib/line-height.js'),
    domify = require('domify');
    assert = require('./utils/assert');

// Create common fixture actions
function fixtureNode() {
  before(function () {
    var node = domify(this.html);
    document.body.appendChild(node);
    this.node = node;
  });
  after(function () {
    document.body.removeChild(this.node);
  });
}

function processNode() {
  before(function () {
    this.lineHeight = lineHeight(this.node);
  });

  it('has a line-height which is a number', function () {
    assert.strictEqual(typeof this.lineHeight, 'number');
    assert.notEqual(isNaN(this.lineHeight), true);
  });
}

// Basic tests
describe('An unstyled div', function () {
  before(function () {
    this.html = '<div>abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});

describe('A styled div', function () {
  before(function () {
    this.html = '<div style="line-height: 50px;">abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has the styled line-height\'s height', function () {
      assert.strictEqual(this.lineHeight, 50);
    });
  });
});

describe('A percentage line-height div', function () {
  before(function () {
    this.html = '<div style="line-height: 150%;">abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});

describe('An em based line-height div', function () {
  before(function () {
    this.html = '<div style="line-height: 1.3em;">abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height very close to its height', function () {
      var height = this.node.offsetHeight,
          lnHeight = this.lineHeight,
          withinBounds = Math.abs(lnHeight - height) <= 1;
      assert.strictEqual(withinBounds, true, 'Expected: ' + lnHeight + ', Actual: ' + height);
    });
  });
});

describe.skip('A numeric line-height div', function () {
  before(function () {
    this.html = '<div style="line-height: 2.3;">abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});

describe('An inherit line-height div', function () {
  before(function () {
    this.html = '<div style="line-height: inherit;">abc</div>';
  });
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});

// TODO: Actually use inherit
// TODO: Test pt due ot IE
// TODO: Test usage of pt in font-size for computation of ratios (IE troubles)