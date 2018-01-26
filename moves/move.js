const randbetween = require('../lib/helpers/randbetween');
const _ = require('underscore');

class Move {
  constructor (defaults, config) {
    const stats = _.extend(defaults, config);
    Object.keys(stats).forEach((key) => {
      this[key] = stats[key];
    });
  }

  setOwner (owner) {
    this.owner = owner;
  }

  getFrequencyScore (attacker, defender, battle) {
    return this.frequency;
  }

  go (target, opts={}) {
    let damageInfo;
    if(opts.hasOwnProperty('damageInfo')) {
      damageInfo = opts.damageInfo;
    }
    else {
      damageInfo = this.getDamageInfo(target);
    }
    target.damage(damageInfo.amount);
    return {
      by: this.owner,
      target: target,
      damageInfo: damageInfo,
      extraInfo: []
    }
  }

  getDamageInfo (target) {
    let amount;
    if(typeof(this.damage) == 'number') {
      amount = this.damage;
    }
    else if(Array.isArray(this.damage)) {
      amount = randbetween(this.damage[0], this.damage[1]);
    }

    if(typeof(amount) == undefined) {
      amount = 0;
    }

    return {
      amount: amount
    }
  }
}

Move.frequencies = {
  never: 0,
  rarest: 3,
  rare: 5,
  uncommon: 8,
  common: 13,
  verycommon: 21,
  mostcommon: 34
}


module.exports = Move;
