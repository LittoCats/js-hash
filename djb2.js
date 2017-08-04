/// @brief DJB Hash Function 2
/// @detail 由Daniel J. Bernstein 发明的另一种hash算法。
module.exports = exports = require('./_strong')(function DJB2Hash(str)
{
  var hash = 5381;
  var index = str.length
  while (index--)
  {
    var ch = str.charCodeAt(index);
    hash = hash * 33 ^ ch;
  }
  return hash;
})