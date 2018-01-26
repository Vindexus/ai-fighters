const randbetween = require('./randbetween');

class Move {
  constructor (stats) {
    Object.keys(stats).forEach((key) => {
      this[key] = stats[key];
    });
  } 

  setOwner (owner) {
    this.owner = owner;
  }

  getFrequencyScore () {
    return this.frequency;
  }

  go (target) {
    const damage = this.getDamage();
    target.damage(damage);
    return {
      by: this.owner,
      target: target,
      damage: damage
    }
  }

  getDamage () {
    if(typeof(this.damage) == 'number') {
      return this.damage;
    }
    else if(Array.isArray(this.damage)) {
      return randbetween(this.damage[0], this.damage[1]);
    }
  }
}

module.exports = Move;