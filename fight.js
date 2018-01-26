const console = require('./console');
const colors = require('colors');

const Alice = require('./characters/alice');
const Bob = require('./characters/bob');

let player1 = new Alice();
let player2 = new Bob();

console.h1("START THE FIGHT");

const battleConst = require('./battle');
let battle = new battleConst(player1, player2);

battle.onEnd = function () {
  console.log('Winner is: ' + battle.getWinner().name.green.bold);
}

battle.start((err, result) => {
  if(err) {
    console.log('Oh no!', err);
  }
  else {
    console.log('Winner is: ' + result.winner.name.bold);
  }
});
