/// @brief FNV Hash Function
/// @detail Unix system系统中使用的一种著名hash算法，后来微软也在其hash_map中实现。
module.exports = exports = require('./_strong')(function FNVHash(str)
{
  if(str.length === 0) // 这是由本人添加，以保证空字符串返回哈希值0
    return 0;

  var hash = 2166136261;
  var index = str.length
  while (index--)
  {
    var ch = str.charCodeAt(index);
    hash *= 16777619;
    hash ^= ch;
  }
  return hash;
})