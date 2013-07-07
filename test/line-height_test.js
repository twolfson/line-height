// Load in test dependencies
var lineHeight = require('../lib/line-height.js'),
    assert = require('proclaim'),
    domify = require('domify'),
    cssControls = require('css-controls');

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

function styleBody(css) {
  before(function () {
    document.body.style.cssText = css;
  });
  after(function () {
    document.body.style.cssText = '';
  });
}

var styleSheet = cssControls.createStyleSheet();
function globalStyle(selector, rule) {
  var index;
  before(function () {
    index = cssControls.addRule(styleSheet, selector, rule);
  });
  after(function () {
    cssControls.removeRule(styleSheet, index);
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

// Intermediate tests
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
  styleBody('line-height: 40px;');
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to the inherited amount', function () {
      assert.strictEqual(this.lineHeight, 40);
    });
  });
});

// Advanced tests
describe('A globally styled body and an unstyled div', function () {
  before(function () {
    lineHeight._ratio = null;
    this.html = '<div>abc</div>';
  });
  styleBody('font-size: 40px;');
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});

// Kitchen sink tests
describe('A pt line-height div', function () {
  before(function () {
    this.html = '<div style="line-height: 27pt;">abc</div>';
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

describe('An em line-height with a pt font div', function () {
  before(function () {
    lineHeight._ratio = null;
    this.html = '<div style="line-height: 2.5em; font-size: 33pt;">abc</div>';
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

describe('A div-specific font-size style and an h2', function () {
  before(function () {
    lineHeight._ratio = null;
    this.html = '<h2>abc</h2>';
  });
  globalStyle('div', 'font-size: 34px;');
  fixtureNode();

  describe('processed by line-height', function () {
    processNode();

    it('has a line-height equal to its height', function () {
      var height = this.node.offsetHeight;
      assert.strictEqual(this.lineHeight, height);
    });
  });
});
