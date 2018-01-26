const Character = require('../character');

class Bob extends Character {
  constructor () {
    super({
      startingHP: 25,
      currentHP: 25,
      name: 'Bob',
      speed: [10, 15],
      moves:
        [ 'basicattack'
        , { key: 'firestrike'
          , name: 'Super Flamestrike'
          }
        ]
    })
  }
}
module.exports = Bob;
