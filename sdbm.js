// 本算法是由于在开源项目SDBM（一种简单的数据库引擎）中被应用而得名，它与BKDRHash思想一致，只是种子不同而已。
module.exports = exports = require('./_strong')(function(str)
{
  hash = 0;
  var index = str.length
  while (index--)
  {
    hash = 65599 * hash + str.charCodeAt(index);
    //hash = (size_t)ch + (hash << 6) + (hash << 16) - hash;
    hash >>>= 0
  }
  return hash;
})