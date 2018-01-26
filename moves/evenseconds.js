const Move = require('./move');


class EvenSeconds extends Move {
  constructor (config = {}) {
    super({
      frequency: 5,
      damage: 3,
      name: 'Even Second Attack',
      color: 'yellow',
      evenSecondsBonus: 5
    }, config);
  }

  go (target) {
    const dmgInfo = this.getDamageInfo();
    let result = super.go(target, dmgInfo);
    if(dmgInfo.evenSeconds) {
      result.extraInfo.push(dmgInfo.secondsBonus + ' of the dmg was bonus for even seconds (' + dmgInfo.seconds + ')')
    }
    else {
      this.owner.damage(1);
      result.extraInfo.push(this.owner.name + ' dealt ' + '1'.red + ' damage to themselves for odd seconds (' + dmgInfo.seconds + ')')
    }
    return result;
  }

  getDamageInfo () {
    let damage = {};
    damage.amount = super.getDamageInfo().amount;
    const seconds = new Date().getSeconds();
    damage.seconds = seconds;

    if(seconds % 2 == 0) {
      damage.evenSeconds = true;
      damage.amount += this.evenSecondsBonus;
      damage.secondsBonus = this.evenSecondsBonus;
    }

    return damage;
  }
}

module.exports = EvenSeconds;
