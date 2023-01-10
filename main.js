const board = document.getElementById("gameBoard");

const circle = "⭕";
const cross = "❌";

const PlayerFactory = (username, controller) => {
  return { username, controller };
};

const player1 = PlayerFactory("carlos", cross);
const player2 = PlayerFactory("Roberto", circle);

const gameBoard = (() => {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  return {
    board,
  };
})();

let displayController = player1.controller;

let game = (function () {
  const checkWin = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== " "
      ) {
        alert(board[i][0] + " wins!");
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== " "
      ) {
        alert(board[0][i] + " wins!");
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== " "
    ) {
      alert(board[0][0] + " wins!");
      return;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] !== " "
    ) {
      alert(board[2][0] + " wins!");
      return;
    }

    // Check if the board is full and no one wins.
    if (isBoardFull(board)) {
      alert("It's a tie!");
    }
  };

  const isBoardFull = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          return false;
        }
      }
    }
    return true;
  };

  let display = player1.controller;

  const handleSquareClick = (id, row, col) => {
    const square = document.getElementById(id);
    square.addEventListener("click", function () {
      if (gameBoard.board[row][col] === " ") {
        square.innerHTML = display;
        gameBoard.board[row][col] = display;
        if (display === player1.controller) {
          display = player2.controller;
        } else {
          display = player1.controller;
        }
      }
      checkWin(gameBoard.board);
    });
  };

  handleSquareClick("1", 0, 0);
  handleSquareClick("2", 0, 1);
  handleSquareClick("3", 0, 2);
  handleSquareClick("4", 1, 0);
  handleSquareClick("5", 1, 1);
  handleSquareClick("6", 1, 2);
  handleSquareClick("7", 2, 0);
  handleSquareClick("8", 2, 1);
  handleSquareClick("9", 2, 2);
})();
