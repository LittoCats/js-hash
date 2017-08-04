module.exports = exports = function (h) {
  hash.hash = h;
  return hash;

  function hash(s, a, b, c) {
    if (!s || s.length === 0) return 0;
    var c = h(s, a, b, c);
    return parseInt(''+c+s.length);
  }
}