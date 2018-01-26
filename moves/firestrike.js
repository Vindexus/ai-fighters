const Move = require('../move');

class Firestrike extends Move {
  constructor (config = {}) {
    const defaults = {
      frequency: 5,
      damage: 10,
      name: 'Firestrike'
    }

    const stats = Object.assign(defaults, config);
    super(stats);
  }
}

module.exports = Firestrike;