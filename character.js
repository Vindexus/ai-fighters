const randarray = require('./randarray');
const console = require('./console');
const moves = require('./moves');

class Character {
  constructor (stats) {
    Object.keys(stats).forEach((key) => {
      this[key] = stats[key];
    });

    this.movesList = this.moves.reduce((list, moveInfo) => {
      let config = {};
      let move;
      if(typeof(moveInfo) == 'object') {
        move = new moves[moveInfo.key](moveInfo.config);
      }
      else {
        move = new moves[moveInfo]();
      }
      move.setOwner(this);
      list.push(move, config);
      return list;
    }, []);
  }
  
  setInBattle (battle) {
    this.currentBattle = battle;
  }

  damage (amount) {
    this.currentHP -= amount;
    if(this.currentHP < 0) {
      this.currentHP = 0;
    }
  }

  displayHealth () {
    console.labeldots(this.name, this.currentHP + '/' + this.startingHP);
  }

  getChosenMove () {
    const indexes = this.movesList.reduce(function (choices, move, index) {
      for(var i = 1; i <= move.frequency; i++) {
        choices.push(index);
      }
      return choices;
    }, []);

    const index = randarray(indexes);
    return this.movesList[index];
  }
}

module.exports = Character;