const Move = require('./move');

class Firestrike extends Move {
  constructor (config = {}) {
    super({
      frequency: 5,
      damage: 10,
      name: 'Firestrike'
    }, config);
  }
}

module.exports = Firestrike;