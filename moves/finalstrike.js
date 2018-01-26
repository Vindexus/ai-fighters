const Move = require('./move');


class EvenSeconds extends Move {
  constructor (config = {}) {
    super({
      frequency: Move.frequencies.rarest,
      damage: 3,
      name: 'Final Strike',
      color: 'yellow'
    }, config);
  }

  getFrequencyScore (attacker, defender, battle) {
    let score = super.getFrequencyScore(attacker, defender, battle);
    if(defender.healthIs('<50%')) {
      score = Move.frequencies.verycommon;
    }
    return score
  }

  go (target) {
    const dmgInfo = this.getDamageInfo(target);
    let result = super.go(target, dmgInfo);
    if(dmgInfo.woundedBonus) {
      result.extraInfo.push(dmgInfo.woundedBonus + ' of it was bonus because ' + target.name + ' was < 50% hp')
    }
    return result;
  }

  getDamageInfo (target) {
    let damage = {};
    damage.amount = super.getDamageInfo().amount;
    if(target.healthIs('<50%')) {
      damage.woundedBonus = 10;
      damage.amount += damage.woundedBonus;
    }
    return damage;
  }
}

module.exports = EvenSeconds;
