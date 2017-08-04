// 由于在Unix的Extended Library Function被附带而得名的一种hash算法，它其实就是PJW Hash的变形。

var TotalBits   = 32 * 8;
var ThreeQuarters = (TotalBits  * 3) / 4;
var OneEighth   = TotalBits / 8;
var HighBits    = (-1) << (TotalBits - OneEighth);  
module.exports = exports = require('./_strong')(function ELFHash(str)
{
  
  var hash = 0;
  var magic = 0;
  var index = str.length
  while (index--)
  {   
    var ch = str.charCodeAt(index)
    hash = (hash << OneEighth) + ch;
    if ((magic = hash & HighBits) != 0)
    {
      hash ^= (magic >> ThreeQuarters);
      hash &= ~magic;
    }   
  }
  return hash;
})