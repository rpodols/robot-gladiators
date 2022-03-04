//function to set player name
var getPlayerName = function() {
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
}

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
},
refillHealth: function() {
  if (this.money >= 7) {
  this.health += 20;
  this.money -= 7;
  }
  else {
    window.alert("You don't have enough money.");
  }
},
upgradeAttack: function() {
  if (this.money >= 7) {
  this.attack += 6;
  this.money -= 7;
  }
  else {
    window.alert("You don't have enough money.")
  }
}
};

// declare random num function
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

/*console.log(enemy.names);
console.log(enemy.names.length);
console.log(enemy.names[0]);
console.log(enemy.names[3]);*/

var fightOrSkip = function() {
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter FIGHT or SKIP to choose.");
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer, please try again!");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
      playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
      return true;
      shop();
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  console.log(enemy);
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (fightOrSkip()) {
      break;
    }
    // ask player if they'd like to fight or run
    // var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // // if player picks "skip" confirm and then stop the loop
    // if (promptFight === "skip" || promptFight === "SKIP") {
    //   // confirm player wants to skip
    //   var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //   // if yes (true), leave fight
    //   if (confirmSkip) {
    //     window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
    //     // subtract money from playerInfo.money for skipping
    //     playerInfo.money = Math.max(0, playerInfo.money - 10);
    //     console.log("playerInfo.money", playerInfo.money);
    //     break;
    //   }
    // }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// end game function
var endGame = function() {
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game!  You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost the robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robo Gladiators!  Come back soon!");
  }
};

//shop logic
var shop = function() {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE?"
  );
  //switch action in the shop
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
        playerInfo.refillHealth();
        break;
    case "upgrade":
    case "UPGRADE":
      playerInfo.upgradeAttack();
        break;
    case "leave":
    case "LEAVE":
        window.alert("Leaving the store.");
        break;
    default:
      window.alert("You did not picka valid option, try again.");
      shop();
      break;
  }
};

// start game logic
var startGame = function() {
  // reset player stats
playerInfo.reset();
  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);
    
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          var storeConfirm = window.confirm("The fight is over, visit the store?");
          if (storeConfirm) {}
          shop();
        }    
    }
    // if player isn't alive, stop the game
        else {
          window.alert('You have lost your robot in battle! Game Over!');
          break;
    }
  }
  endGame();
}


//start the game when the page loads
startGame();