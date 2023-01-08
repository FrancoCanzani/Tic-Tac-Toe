const PlayerFactory = (username, controller) => {
  return { username, controller };
};

const player1 = PlayerFactory("carlos", "X");
console.log(player1.username);
console.log(player1.controller);

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

console.log(gameBoard.board);
