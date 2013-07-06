// Create and expose assertion methods (node assertion messages suck in browser)
module.exports = {
  strictEqual: function (a, b) {
    if (a !== b) {
      throw new Error('Assertion error: ' + a + ' !== ' + b);
    }
  },
  notEqual: function (a, b) {
    if (a == b) {
      throw new Error('Assertion error: ' + a + ' == ' + b);
    }
  }
};
