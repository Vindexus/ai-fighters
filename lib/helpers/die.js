const colors = require('colors');
module.exports = function () {
  [].forEach.call(arguments, function (arg) {
    console.log(arg.toString().red);
  });
  process.exit();
}