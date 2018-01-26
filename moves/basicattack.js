const Move = require('../move');

class BasicAttack extends Move {
  constructor (config = {}) {
    const defaults = {
      frequency: 10,
      damage: [3,4],
      name: 'Basic Attack'
    }

    const stats = Object.assign(defaults, config);
    super(stats);
  }
}

module.exports = BasicAttack;