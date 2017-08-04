/// @brief DEK Function
/// @detail 本算法是由于Donald E. Knuth在《Art Of Computer Programming Volume 3》中展示而得名。
module.exports = exports = require('./_strong')(function DEKHash(str)
{
  if(str.length === 0)    // 这是由本人添加，以保证空字符串返回哈希值0
    return 0;
  
  var hash = 1315423911;
  var index = str.length
  while (index--)
  {
    var ch = str.charCodeAt(index);
    hash = ((hash << 5) ^ (hash >> 27)) ^ ch;
  }
  return hash;
})