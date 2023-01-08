# Tic-Tac-Toe

const personFactory = (name, age) => {
const sayHello = () => console.log("hello!");
return { name, age, sayHello };
};

const jeff = personFactory("jeff", 27);

console.log(jeff.name); // 'jeff'

jeff.sayHello();

const calculator = (() => {
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a \* b;
const div = (a, b) => a / b;
return {
add,
sub,
mul,
div,
};
})();

calculator.add(3, 5); // 8
calculator.sub(6, 2); // 4
calculator.mul(14, 5534); // 77476

Tic tac toe logic:

2 players
1 player X and 1 player O
Board has 3 rows and 3 columns of the same size
X always starts
Cant repeat any movement neither override a choice
First to have 3 in a row wins
If no one can make it, is a draw
