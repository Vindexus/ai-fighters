const moves = ['basicattack', 'firestrike'].reduce((moves, name) => {
  moves[name] = require('./' + name);
  return moves
}, {});

module.exports = moves