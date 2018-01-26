const randarray = require('./helpers/randarray');
const console   = require('./helpers/console');
const die       = require('./helpers/die');
const moves     = require('../moves');

class Character {
  constructor (stats) {
    Object.keys(stats).forEach((key) => {
      this[key] = stats[key];
    });

    this.currentHP = this.startingHP;

    this.movesList = this.moves.reduce((list, moveInfo) => {
      let config = {};
      let move;

      if(typeof(moveInfo) == 'object') {
        move = new moves[moveInfo.key](moveInfo);
      }
      else {
        if(typeof moves[moveInfo] != 'function') {
          die('Move doesnt exist: ', moveInfo)
        }
        move = new moves[moveInfo]();
      }
      move.setOwner(this);
      list.push(move);
      return list;
    }, []);
  }

  setTarget (character) {
    this.target = character;
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

  heal (amount) {
    this.currentHP += amount;
    if(this.currentHP > this.startingHP) {
      this.currentHP = this.startingHP;
    }
  }

  displayHealth () {
    const currentPercent = this.getHealthPercent();
    const numBlocks = 40;
    const hpDisplay = this.currentHP + '/' + this.startingHP;
    const label = ((this.name + ' '.repeat(20)).substr(0, 10) + '(' + (' '.repeat(10) + hpDisplay).substr(-5) + ')')
    let blocks = "";
    for(let i = numBlocks; i >= 0; i--) {
      let blockPerc = Math.round(i / numBlocks * 100)
      if(blockPerc <= currentPercent && currentPercent > 0) {
        blocks += '▓'.red;
      }
      else {
        blocks += '░'.gray
      }
    }
    console.log(label + '    ' + blocks);
  }

  getHealthPercent (fixed=2) {
    return (this.currentHP / this.startingHP * 100).toFixed(fixed);
  }

  /**
   * Returns whether a character's health meets some critera
   *
   * @param String check A string representation of health. Ex: ">50", ">50%", "=10", "<=15%"
   * @returns Boolen
   */

  healthIs (check) {
    const re = new RegExp(/([^0-9]+)(\d+)(%)?/ig)
    const matches = re.exec(check);
    const amount = matches[3] == '%' ? this.getHealthPercent() : this.currentHP;
    const comparer = matches[1];
    const against = new Number(matches[2]);

    if(comparer.indexOf('=') > -1 && amount == against) {
      return true;
    }
    if(comparer.indexOf('>') > -1 && amount > against) {
      return true
    }
    if(comparer.indexOf('<') > -1 && amount < against) {
      return true
    }
    return false
  }

  getChosenMove () {
    const scores = [];
    const indexes = this.movesList.reduce((choices, move, index) => {
      const frequency = move.getFrequencyScore(this, this.target);
      for(var i = 1; i <= frequency; i++) {
        choices.push(index);
      }
      scores.push(frequency);
      return choices;
    }, []);
    const totalScores = scores.reduce((total, score)=> {
      return total + score;
    }, 0);
    scores.forEach((score, index) => {
      //console.plog(this.movesList[index].name.gray, (Math.round(score / totalScores * 100) + '%').gray, console.width - 2);
    });
    const index = randarray(indexes);
    return this.movesList[index];
  }
}

module.exports = Character;