// @brief AP Hash Function
// @detail 由Arash Partow发明的一种hash算法。
module.exports = exports = require('./_strong')(function(str)
{
  hash = 0;
  var index = str.length
  while (index--)
  {
    var code = str.charCodeAt(index)
    if ((index & 1) == 0)
    {
      hash ^= ((hash << 7) ^ code ^ (hash >> 3));
    }
    else
    {
      hash ^= (~((hash << 11) ^ code ^ (hash >> 5)));
    }
  }
  return parseInt(`${hash < 0 ? ~hash : hash}${str.length}`);
})