// ---- Aufgabe 6 - Mehr Schleifen und Funktionen ----
//a)
console.log("Ergebnis a):");
var hash = "#";
// 1. Ansatz
/*for (let i: number = 0; i < 7; i++) {
    console.log(hash);
    hash += "#";
}*/
// 2. Ansatz
do {
    console.log(hash);
    hash += "#";
} while (hash.length < 8);
//b)
//The good old FissBuzz :D
console.log("Ergebnis b):");
fizzBuzz();
function fizzBuzz() {
    var i = 1;
    do {
        if (i % 3 === 0) {
            console.log("Fizz");
        }
        else if (i % 5 === 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
        i = i + 1;
    } while (i < 100);
}
//c)
console.log("Ergebnis c):");
smarterFizzBuzz();
function smarterFizzBuzz() {
    var i = 1;
    do {
        if (i % 3 === 0 || i % 5 === 0) {
            console.log("FizzBuzz");
        }
        else {
            console.log(i);
        }
        i = i + 1;
    } while (i < 100);
}
//d)
var cb = chessboardMaker();
function chessboardMaker() {
    var chessboard = "";
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (!chessboard) {
                chessboard += " ";
            }
            else if (chessboard.length % 2 !== 0) {
                chessboard += "#";
            }
            else {
                chessboard += " ";
            }
        }
        chessboard += "\n";
    }
    return chessboard;
}
console.log("Ergebnis d): \n" + cb);
//e)
var variableCb = variableChessboardMaker(10, 20);
function variableChessboardMaker(rows, columns) {
    var chessboard = "";
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            if (!chessboard) {
                chessboard += " ";
            }
            else if (chessboard.length % 2 !== 0) {
                chessboard += "#";
            }
            else {
                chessboard += " ";
            }
        }
        chessboard += "\n";
    }
    return chessboard;
}
console.log("Ergebnis e): \n" + variableCb);
