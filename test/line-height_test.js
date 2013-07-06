// Load in test dependencies
var lineHeight = require('../lib/line-height.js');

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
    node.innerHTML = 'abc';
    document.body.appendChild(node);
    this.node = node;
  });
  after(function () {
    // document.body.removeChild(this.node);
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
      var height = this.node.offsetHeight;
      assertEqual(this.lineHeight, height);
    });
  });
});

describe('A styled div', function () {
  before(function () {
    var node = document.createElement('div');
    node.innerHTML = 'abc';
    node.style.cssText = 'line-height: 50px;';
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

    it('has a height of 50px', function () {
      var height = this.node.offsetHeight;
      assertEqual(typeof height, 'number');
      assertEqual(height, 50);
    });

    it('has the styled line-height', function () {
      assertEqual(this.lineHeight, 50);
    });
  });
});


// TODO: Test all other CSS formats (%, em, px, cm, rem)