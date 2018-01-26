const console     = require('./helpers/console');
const randbetween = require('./helpers/randbetween');
const sleep       = require('sleep');

module.exports = function (player1, player2) {
  this.round = 1;
  this.over = false;
  this.p1 = player1;
  this.p2 = player2;
  this.p1.setInBattle(this);
  this.p2.setInBattle(this);

  this.p1.setTarget(this.p2);
  this.p2.setTarget(this.p1);

  this.waitMin = 500,
  this.waitMax = 601;

  this.end = function () {
    this.over = true;
    console.log('-'.red.repeat(40).red)
    console.log('FIGHT OVER!'.bold);
    console.log('-'.red.repeat(40).red)
    sleep.msleep(250);
    this.displayHealths();
    if(this.onEnd) {
      this.onEnd();
    }
  }

  this.getPlayerOrder = function () {
    return [this.p1, this.p2];
  }

  this.isOver = function () {
    if(this.p1.currentHP <= 0) {
      return true
    }
    if(this.p2.currentHP <= 0) {
      return true
    }
    return false
  }

  this.getWinner = function () {
    if(!this.over) {
      return false
    }

    if(this.p1.currentHP == this.p2.currentHP) {
      return false;
    }

    if(this.p1.currentHP > this.p2.currentHP) {
      return this.p1;
    }

    return this.p2;
  }

  this.displayHealths = function () {
    this.p1.displayHealth();
    this.p2.displayHealth();
  }

  this.doRound = function () {
    console.log('')
    sleep.msleep(randbetween(this.waitMin, this.waitMax));
    console.h2('Round ' + this.round)
    const turns = this.getPlayerOrder();

    this.displayHealths();
    sleep.msleep(randbetween(this.waitMin, this.waitMax));


    turns.forEach((player) => {
      if(this.over) {
        return
      }
      this.playerGo(player);
      if(this.isOver()) {
        this.end();
      }
    sleep.msleep(randbetween(this.waitMin, this.waitMax));
    });

    if(!this.over){
      sleep.msleep(randbetween(this.waitMin, this.waitMax));
      this.round++;
      if(this.round < 50) {
        this.doRound();
      }
    }
  }

  this.playerGo = function (p) {
    const move = this.getPlayerMove(p);
    const result = move.go(this.getOtherPlayer(p));
    console.md("**" + result.by.name + "** used " + (move.name || "basic attack")[move.color || "white"] +
      " and dealt " + result.damageInfo.amount.toString().red +
      " damage to " + result.target.name);
    if(result.extraInfo && result.extraInfo) {
      result.extraInfo.forEach((info) => {
        console.log('    ' + info.gray);
      })
    }
  }

  this.getOtherPlayer = function (p) {
    if(p.name == this.p1.name) {
      return this.p2;
    }

    return this.p1;
  }

  this.getPlayerMove = function (p) {
    const move = p.getChosenMove();
    return move;
  }

  this.start = function () {
    this.doRound();
  }
}