const Character = require('../lib/character');

class Bob extends Character {
  constructor () {
    super({
      startingHP: 45,
      name: 'Bob',
      moves:
        [ 'basicattack'
        , { key: 'firestrike'
          , name: 'Bobstrike'
          , color: 'magenta'
          }
        , 'bladeofresolve'
        ]
    })
  }
}
module.exports = Bob;
