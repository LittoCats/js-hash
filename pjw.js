/// @brief PJW Hash Function
/// @detail 本算法是基于AT&T贝尔实验室的Peter J. Weinberger的论文而发明的一种hash算法。

var TotalBits   = 32 * 8;
var ThreeQuarters = (TotalBits  * 3) / 4;
var OneEighth   = TotalBits / 8;
var HighBits    = (-1) << (TotalBits - OneEighth);  

module.exports = exports = require('./_strong')(function PJWHash(str)
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
      hash = ((hash ^ (magic >> ThreeQuarters)) & (~HighBits));
    }
  }
  return hash;
})