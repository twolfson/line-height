// Create and expose assertion methods (node assertion messages suck in browser)
module.exports = {
  strictEqual: function (a, b, msg) {
    if (a !== b) {
      msg = msg || ('Assertion error: ' + a + ' !== ' + b);
      throw new Error(msg);
    }
  },
  notEqual: function (a, b) {
    if (a == b) {
      msg = msg || ('Assertion error: ' + a + ' == ' + b);
      throw new Error(msg);
    }
  }
};
