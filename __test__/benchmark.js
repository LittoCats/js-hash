const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const Tiock = require('tiock');

const algorithms = [
  'ap', 'bkdr', 'dek', 'djb', 'djb2', 'elf', 'fnv', 'js', 'pjw', 'rs'
].map(name=> ({name, hash: require(`../${name}`)}))

const MAX_FILES_NUMBER = 1000000;

const HOME = child_process.execSync('echo $HOME').toString().slice(0, -1);


/**
 *  Step 1. 从用户目录中获取 100W 个文件名
 *  Step 2. 计算不同算法的冲突率
 */
var dida = new Tiock().begin;

getFilesInDir(HOME)
.then(function (files) {
  return algorithms.map(hash=>  statistic(hash, files));
})
.then(function (results) {
  dida.end
  results.unshift(['\nname', 'total', 'conflict', 'percent'])
  results.forEach(function (result) {
    console.log(result.map(function (val) {
      return `${val}          `.slice(0, 10)
    }).join('   '))
  })
})
.catch(function (e) {
  dida.end
  console.log(e)
})

function statistic({name, hash}, strs) {
  process.stdout.write('\nstatistic => '+name);
  var map = strs.reduce(function (map, str) {
    var key = hash(str)
    var list = map[key] = map[key] || [];
    list.push(str)

    return map;
  }, {});

  var conflicts = Object.keys(map).reduce(function (conflicts, key) {
    return conflicts += map[key].length > 1 ? 1 : 0
  }, 0)

  return [name, strs.length, conflicts, `${conflicts/strs.length*100}`.slice(0, 8)+'%']
}

/**
 *  获取指定文件夹个的所有文件
 */
function getFilesInDir(dir) {
  const files = [];
  console.log('Collect test string from file system in '+HOME);
  return resolveFilesInDir(dir)
    .then(()=> process.stdout.write('\n'))
    .then(()=> files)

  /**
   *  递归遍历文件夹下的所有文件
   *  async
   */
  function resolveFilesInDir(dir) {
    return new Promise(function (resolve, reject) {
      fs.stat(dir, function (err, stat) {
        if (err) return resolve();

        if (stat.isFile()) return resolve(files.push(dir));

        if (files.length > MAX_FILES_NUMBER) return resolve();

        if (stat.isDirectory()) {
          return fs.readdir(dir, function (err, files) {
            if (err) return resolve();
            /**
             *  按随机的顺序抽取文件
             */
            files = files.sort(()=> Math.floor(Math.random()*0xFFFFFFFF)%3-1);
            return resolve(Promise.all(files.map(file=> resolveFilesInDir(path.resolve(dir, file)))));
          })
        }

        resolve()
      })
    })
  }
}