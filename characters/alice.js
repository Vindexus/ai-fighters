const Character = require('../lib/character');

class Alice extends Character {
  constructor () {
    super({
    startingHP: 50,
    name: 'Alice',
    moves: ['evenseconds', 'basicattack', 'finalstrike']
  })
  }
}
module.exports = Alice;