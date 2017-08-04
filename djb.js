/// @brief DJB Hash Function
/// @detail 由Daniel J. Bernstein教授发明的一种hash算法。
module.exports = exports = require('./_strong')(function DJBHash(str)
{
  hash = 5381;
  var index = str.length
  while (index--)
  {
    var ch = str.charCodeAt(index);
    hash += (hash << 5) + ch;
  }
  return hash;
})