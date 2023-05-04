// console.log("Hello, world");

//RECALL FACTORIES FUNCTION AND THE MODULE PATTERN
//to do Tic tac toe project
// const G = (function () {
//   const Player = (name, level, id) => {
//     let health = level * 2;
//     const getLevel = () => level;
//     const getName = () => name;
//     const getHealth = () => health;
//     const getId = () => id;
//     const die = () => alert(`Player ${getName()} died!`);
//     const damage = (num) => {
//       health -= num;
//       if (health <= 0) die();
//     };
//     const attack = (anotherPlayer) => {
//       if (getId() === anotherPlayer.getId()) {
//         console.log(`Can't attack yourself`);
//         return;
//       }
//       if (anotherPlayer.getHealth() <= 0) {
//         console.log(`Can't attack a dead body`);
//         return;
//       }
//       const levelGap = getLevel() - anotherPlayer.getLevel();
//       if (levelGap <= -2) {
//         console.log(
//           `Player ${getName()} was damaged 2HP by Player ${anotherPlayer.getName()}. HP left: ${getHealth()}`
//         );
//         damage(2);
//         return;
//       }
//       if (levelGap < 0) {
//         console.log(
//           `Player ${getName()} was damaged 1HP by Player ${anotherPlayer.getName()}. HP left: ${getHealth()}`
//         );
//         damage(1);
//         return;
//       }
//       if (levelGap >= 2) {
//         console.log(
//           `Player ${anotherPlayer.getName()} was damaged 2HP by Player ${getName()}. HP left: ${anotherPlayer.getHealth()}`
//         );
//         anotherPlayer.damage(2);
//         return;
//       }
//       if (levelGap >= 0) {
//         console.log(
//           `Player ${anotherPlayer.getName()} was damaged 1HP by Player ${getName()}. HP left: ${anotherPlayer.getHealth()}`
//         );
//         anotherPlayer.damage(1);
//         return;
//       }
//     };
//     return { getName, getLevel, getHealth, getId, damage, attack };
//   };

//   const Game = (() => {
//     let player1 = Player(
//       prompt("Please enter player 1 name", "Player 1"),
//       +prompt("Please enter player 1 level", 5),
//       Math.floor(Math.random() * 10000)
//     );
//     const getPlayer1 = () => player1;
//     let player2 = Player(
//       prompt("Please enter player 2 name", "Player 2"),
//       +prompt("Please enter player 2 level", 5),
//       Math.floor(Math.random() * 10000)
//     );
//     const getPlayer2 = () => player2;
//     const restart = () => {
//       player1 = Player(
//         prompt("Please enter player 1 name", "Player 1"),
//         +prompt("Please enter player 1 level", 5),
//         Math.floor(Math.random() * 10000)
//       );
//       player2 = Player(
//         prompt("Please enter player 2 name", "Player 2"),
//         +prompt("Please enter player 2 level", 5),
//         Math.floor(Math.random() * 10000)
//       );
//     };
//     return { getPlayer1, getPlayer2, restart };
//   })();
//   return Game;
// })();

//LEARNING ARTICLE BUILDING A HOUSE FROM INSIDE OUT

//The gameBoard represents the state of the board
//Each square holds a Cell (defined later)
//And we expose a dropToken method to be able to all Cells to squares

function Gameboard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  //Create a 2d array that will represent the state of the game board
  //For this 2d array, row 0 will represent the top row and column 0 will represent the left-most column
  //This nested-loop technique is a simple and common way to create a 2d array

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  //This will be the method of getting the entire board that our UI will eventually need to render it.
  const getBoard = () => board;

  //In order to drop a token, we need to find what the lowest point of the selected column is, *then* change that cell's value to the player number
  const dropToken = (column, player) => {
    //we will find the lowest position of the given column in board
    let lowest;
    //Find it by loop from the bottom-most row of the board (rows - 1) to the top row (=== 0)
    for (let i = rows - 1; i >= 0; i--) {
      //if cell value === 0 (means that cell is empty)
      if (board[i][column].getValue() === "") {
        //mark lowest === i
        lowest = i;
        //then break the loop
        break;
      }
    }
    //if lowest didn't change (means all cells have been marked)
    if (!lowest) {
      //then alert
      alert("Invalid move!");
      //and return
      return;
    }
    //then mark the move
    board[lowest][column].addToken(player);
  };

  //This method will be used to print our board to the console.
  //It is helpful to see what the board looks like after turn as we play
  //But we won't need it after we build our UI
  const printBoard = () => {
    const boardWithCellValue = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValue);
  };

  //Here we provide an interface for the rest of our application to interact with the board
  return {
    printBoard,
    getBoard,
    dropToken,
  };
}

//A cell represents a square on the game board
//If its value==="" means it's empty
//value==="x" means its Player X token
//value==="o" means its Player O token
function Cell() {
  let value = "";
  //Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  //How we will retrieve the current value of this cell through closure
  const getValue = () => value;
  return { addToken, getValue };
}

//Factory function to create players
function Player(name, token) {
  const getName = () => name;
  const getToken = () => token;
  return { getName, getToken };
}

//The GameController will be responsible for controlling the flow and state of the game's turns, as well as whether anybody has won the game
function GameController(p1Name = "Player One", p2Name = "Player Two") {
  const board = Gameboard();
  const players = [Player(p1Name, "x"), Player(p2Name, "o")];
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;
  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().getName()}'s turn.`);
  };
  const playTurn = (column) => {
    //Drop a token for the current player
    console.log(
      `Dropping ${getActivePlayer().getName()}'s token into column ${column}...`
    );
    board.dropToken(column, getActivePlayer().getToken());

    //This is where we would check for a winner and handle that logic

    //Such as a win message

    //Switch player turn
    switchTurn();
    printNewRound();
  };

  //Initial play game message
  printNewRound();

  //For the console version, we will only use playTurn, but we will need getActivePlayer for the UI version, so I'm revealing it now
  return {
    playTurn,
    getActivePlayer,
  };
}

const game = GameController();
