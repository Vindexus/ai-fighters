const Move = require('./move');

class BladeOfResolve extends Move {
  constructor (config) {
    super({
      name: 'Blade of Resolve',
      color: 'green',
      frequency: Move.frequencies.never,
      damage: 2,
      healAmount: 20
    }, config);
  }

  getFrequencyScore (attacker, defender, battle) {
    let score = super.getFrequencyScore(attacker, defender, battle);
    if(attacker.healthIs('<50%')) {
      score = Move.frequencies.common;
    }
    else if(attacker.healthIs('<20%')) {
      score = Move.frequencies.mostcommon;
    }
    return score
  }

  go (target, opts={}) {
    let result = super.go(target, opts);
    if(this.owner.healthIs('<50%')) {
      const healAmount = this.getHealAmount();
      this.owner.heal(healAmount);
      result.extraInfo.push(this.owner.name + ' healed for ' + healAmount.toString().green);
    }

    return result;
  }

  getHealAmount () {
    return this.healAmount;
  }
}

module.exports = BladeOfResolve
