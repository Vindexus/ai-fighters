const console = require('./console');
const randbetween = require('./randbetween');
const sleep = require('sleep');

module.exports = function (player1, player2) {
  this.round = 1;
  this.over = false;
  this.p1 = player1;
  this.p2 = player2;
  this.p1.setInBattle(this);
  this.p2.setInBattle(this);
  this.end = function () {
    this.over = true;
    console.log('-'.red.repeat(40).red)
    console.h1('FIGHT OVER!');
    console.log('-'.red.repeat(40).red)
    sleep.msleep(500);
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
    sleep.msleep(500);
    this.p1.displayHealth();
    sleep.msleep(500);
    this.p2.displayHealth();
  }

  this.doRound = function () {
    console.log('')
    sleep.msleep(500);
    console.h1('Round ' + this.round)
    const turns = this.getPlayerOrder();

    this.displayHealths();
    sleep.msleep(500);


    turns.forEach((player) => {
      if(this.over) {
        return
      }
      this.playerGo(player);
      if(this.isOver()) {
        this.end();
      }
      sleep.sleep(1);
    });

    if(!this.over){
      sleep.sleep(2);
      this.round++;
      if(this.round < 50) {
        this.doRound();
      }
    }
  }

  this.playerGo = function (p) {
    const move = this.getPlayerMove(p);
    const result = move.go(this.getOtherPlayer(p));
    console.md("**" + result.by.name + "** used " + (move.name || "basic attack")[move.color || "white"] + " and dealt " + result.damage.toString().red + " damage to " + result.target.name)
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