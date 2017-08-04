/// @brief <a href="http://lib.csdn.net/base/javascript" class='replace_word' title="JavaScript知识库" target='_blank' style='color:#df3434; font-weight:bold;'>js</a> Hash Function
/// 由Justin Sobel发明的一种hash算法。
module.exports = exports = require('./_strong')(function JSHash(str)
{
  if(str.length === 0)    // 这是由本人添加，以保证空字符串返回哈希值0
    return 0;

  var hash = 1315423911;
  var index = str.length
  while (index--)
  {
    var ch = str.charCodeAt(index);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return hash;
})