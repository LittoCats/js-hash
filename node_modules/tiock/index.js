const child_process = require('child_process');
const path = require('path');

module.exports = class TickTock {
  get begin() {
    this.UID = this.UID || beginTickTock();
    return this;
  }

  get end() {
    this.UID = this.UID && endTickTock(this.UID);
    return this;
  }
}

function beginTickTock() {
  var child = child_process.fork(path.resolve(__dirname, __filename));
  exports[child.pid] = child;
  return child.pid
}

function endTickTock(id) {
  var child = exports[id];
  child && child.kill();
}

if (module === require.main) {
  setInterval(id=> process.stdout.write('.'), 1000);
}