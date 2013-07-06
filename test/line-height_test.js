// Load in test dependencies
var lineHeight = require('../lib/line-height.js'),
    assert = require('./utils/assert');

// Create common fixture actions
function fixtureNode() {
  before(function () {
    var node = document.createElement('div');
    node.innerHTML = this.input;
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
    this.input = 'abc';
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
    this.input = 'abc';
  });
  fixtureNode();
  before(function () {
    this.node.style.cssText = 'line-height: 50px;';
  });

  describe('processed by line-height', function () {
    processNode();

    it('has the styled line-height\'s height', function () {
      assert.strictEqual(this.lineHeight, 50);
    });
  });
});


// TODO: Test all other CSS formats (%, em, px, cm, rem)