const Move = require('./move');

class BasicAttack extends Move {
  constructor (config = {}) {
    super({
      frequency: Move.frequencies.common,
      damage: [3,4],
      name: 'Basic Attack'
    }, config);
  }
}

module.exports = BasicAttack;