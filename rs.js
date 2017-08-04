// 因Robert Sedgwicks在其《Algorithms in C》一书中展示而得名。
module.exports = exports = require('./_strong')(function(str)
{
  hash = 0;
  magic = 63689; 
  var index = str.length
  while (index--)
  {
    var code = str.charCodeAt(index)
    hash = hash * magic + code;
    magic *= 378551;

    hash >>>= 0
    magic >>>= 0
  }
  return hash;
})