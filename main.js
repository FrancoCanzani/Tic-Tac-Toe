const board = document.getElementById("gameBoard");
const form = document.querySelector("#form");
const winnerDisplay = document.getElementsByClassName("winnerDisplay")[0];
const winnerPopup = document.getElementsByClassName("winnerPopup")[0];
const movesFirst = document.getElementsByClassName("movesFirst")[0];
const circle = "⭕";
const cross = "❌";
let display, player1, player2;

// Factory function to create players
const PlayerFactory = (username, controller) => {
  return { username, controller };
};

// Game board object
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

// Reload the page to reset the game
function restart() {
  window.location.reload();
}

function playAgain() {
  // reset game board
  gameBoard.board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  // clear innerText of squares
  let squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
  }

  //hide winnerPopup
  winnerPopup.style.visibility = "hidden";

  board.style.opacity = "100%";

  // Initiate the game
  game.initGame();
}

const game = (() => {
  // Function to close the form
  function closeForm() {
    document.querySelector(".gameOptions").style.visibility = "hidden";
  }

  // Function to display the winner
  function showWinner(message) {
    winnerDisplay.innerText = message;
    winnerPopup.style.visibility = "visible";
    board.style.opacity = "50%";
  }

  function isBoardFull(board) {
    return board.every((row) => row.every((square) => square !== " "));
  }

  function checkWin(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== " "
      ) {
        if (board[i][0] === player1.controller) {
          showWinner(player1.username + " wins!");
        } else {
          showWinner(player2.username + " wins!");
        }
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== " "
      ) {
        if (board[0][i] === player1.controller) {
          showWinner(player1.username + " wins!");
        } else {
          showWinner(player2.username + " wins!");
        }
      }
    }

    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== " "
    ) {
      if (board[0][0] === player1.controller) {
        showWinner(player1.username + " wins!");
      } else {
        showWinner(player2.username + " wins!");
      }
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] !== " "
    ) {
      if (board[2][0] === player1.controller) {
        showWinner(player1.username + " wins!");
      } else {
        showWinner(player2.username + " wins!");
      }
    }

    // Check if the board is full and no one wins.
    if (isBoardFull(board)) {
      showWinner("It's a tie!");
    }
  }

  function handleSquareClick(id, row, col) {
    const square = document.getElementById(id);
    square.addEventListener("click", function () {
      if (gameBoard.board[row][col] === " ") {
        square.innerText = display;
        gameBoard.board[row][col] = display;
        checkWin(gameBoard.board);
        if (display === player1.controller) {
          display = player2.controller;
        } else {
          display = player1.controller;
        }
      }
    });
  }

  // Initialize game function
  function initGame() {
    player1Name = document.getElementById("player1Name").value;
    player2Name = document.getElementById("player2Name").value;
    player1 = PlayerFactory(player1Name, cross);
    player2 = PlayerFactory(player2Name, circle);

    movesFirst.innerText = `${display} moves first`;

    game.handleSquareClick("1", 0, 0);
    game.handleSquareClick("2", 0, 1);
    game.handleSquareClick("3", 0, 2);
    game.handleSquareClick("4", 1, 0);
    game.handleSquareClick("5", 1, 1);
    game.handleSquareClick("6", 1, 2);
    game.handleSquareClick("7", 2, 0);
    game.handleSquareClick("8", 2, 1);
    game.handleSquareClick("9", 2, 2);
  }

  return {
    closeForm,
    showWinner,
    isBoardFull,
    checkWin,
    handleSquareClick,
    initGame,
  };
})();

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  board.style.opacity = "100%";
  game.closeForm();
  game.initGame();
  display = player1.controller;
  movesFirst.innerText = `${display} moves first`;
});
