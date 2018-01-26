const die = require('../lib/helpers/die');

const names = ['basicattack', 'firestrike', 'evenseconds', 'finalstrike', 'bladeofresolve'];

const moves = names.reduce((moves, name) => {
  moves[name] = require('./' + name);
  if(!moves[name]) {
    die('Invalid move: ' + name);
  }
  return moves
}, {});

module.exports = moves