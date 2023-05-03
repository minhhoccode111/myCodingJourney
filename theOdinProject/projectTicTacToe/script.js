// console.log("Hello, world");

//RECALL FACTORIES FUNCTION AND THE MODULE PATTERN
//to do Tic tac toe project
const Player = (name, level, id) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const getHealth = () => health;
  const getId = () => id;
  const die = () => alert(`Player ${getName()} died!`);
  const damage = (num) => {
    health -= num;
    if (health <= 0) die();
  };
  const attack = (anotherPlayer) => {
    if (getId() === anotherPlayer.getId()) {
      console.log(`Can't attack yourself`);
      return;
    }
    if (anotherPlayer.getHealth() <= 0) {
      console.log(`Can't attack a dead body`);
      return;
    }
    const levelGap = getLevel() - anotherPlayer.getLevel();
    if (levelGap <= -2) {
      console.log(
        `Player ${getName()} was damaged 2HP by Player ${anotherPlayer.getName()}. HP left: ${getHealth()}`
      );
      damage(2);
      return;
    }
    if (levelGap < 0) {
      console.log(
        `Player ${getName()} was damaged 1HP by Player ${anotherPlayer.getName()}. HP left: ${getHealth()}`
      );
      damage(1);
      return;
    }
    if (levelGap >= 2) {
      console.log(
        `Player ${anotherPlayer.getName()} was damaged 2HP by Player ${getName()}. HP left: ${anotherPlayer.getHealth()}`
      );
      anotherPlayer.damage(2);
      return;
    }
    if (levelGap >= 0) {
      console.log(
        `Player ${anotherPlayer.getName()} was damaged 1HP by Player ${getName()}. HP left: ${anotherPlayer.getHealth()}`
      );
      anotherPlayer.damage(1);
      return;
    }
  };
  return { getName, getLevel, getHealth, getId, damage, attack };
};

const Game = (() => {
  let player1 = Player(
    prompt("Please enter player 1 name", "Player 1"),
    +prompt("Please enter player 1 level", 5),
    Math.floor(Math.random() * 10000)
  );
  const getPlayer1 = () => player1;
  let player2 = Player(
    prompt("Please enter player 2 name", "Player 2"),
    +prompt("Please enter player 2 level", 5),
    Math.floor(Math.random() * 10000)
  );
  const getPlayer2 = () => player2;
  const restart = () => {
    player1 = Player(
      prompt("Please enter player 1 name", "Player 1"),
      +prompt("Please enter player 1 level", 5),
      Math.floor(Math.random() * 10000)
    );
    player2 = Player(
      prompt("Please enter player 2 name", "Player 2"),
      +prompt("Please enter player 2 level", 5),
      Math.floor(Math.random() * 10000)
    );
  };
  return { getPlayer1, getPlayer2, restart };
})();
