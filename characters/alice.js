const Character = require('../character');

class Alice extends Character {
  constructor () {
    super({
    startingHP: 20,
    currentHP: 20,
    name: 'Alice',
    speed: [10, 20],
    moves: ['basicattack', 'firestrike']
  })
  }
}
module.exports = Alice;