"use strict";
var Aufgabe02;
(function (Aufgabe02) {
    // ---- Aufgabe 2 - Arrays ----
    // a)
    function backwards(arr) {
        let bwArr = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            bwArr.push(arr[i]);
        }
        return bwArr;
    }
    const test = [1, 2, 3, 4];
    console.log("Ergebnis a): " + backwards(test));
    console.log("______________________________________");
    // b)
    function join(...arrs) {
        let joinedArr = [];
        //arrs.forEach(arr => joinedArr.push(arr)); // geht, würde aber einen mehrdimensionalen array erzeugen
        arrs.forEach(arr => arr.forEach(elem => joinedArr.push(elem)));
        return joinedArr;
    }
    const a1 = [1, 2, 3];
    const a2 = [4, 5, 6];
    const a3 = [7, 8, 9];
    console.log("Ergebnis b): " + join(a1, a2, a3));
    console.log("______________________________________");
    // c)
    function split(arr, index1, index2) {
        let splittedArr = [];
        if (index1 >= 0 && index2 < arr.length && index1 < index2) {
            for (let i = index1; i <= index2; i++) {
                splittedArr.push(arr[i]);
            }
        }
        else {
            console.log("Sorry, index1 has to be smaller than index2 and both indices have to be within the array length - 1.");
        }
        return splittedArr;
    }
    const a4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log("Ergebnis c): " + split(a4, 1, 4));
    console.log("______________________________________");
    // Testcode
    let arr = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack = backwards(arr);
    console.log("unveränderter Array arr: " + arr);
    console.log("Array aus backwards(arr): " + arrBack);
    console.log("Join(arr) + array: " + join(arr, [15, 9001, -440]));
    console.log("Join Aufruf 2: " + join([123, 666, -911], arr, [15, 9001, -440, 1024])); // Bonus b)
    arr = split(arr, 0, 4);
    console.log("arr überschrieben mit split Aufruf: " + arr);
    console.log("Split Aufruf 2: " + split(arr, 1, 2));
    console.log("Split Aufruf 3: " + split(arr, 2, 0)); // Bonus c)
    console.log("Split Aufruf 4: " + split(arr, -1, 2)); // Bonus c)
    console.log("Split Aufruf 5: " + split(arr, 0, 7)); // Bonus c)
})(Aufgabe02 || (Aufgabe02 = {}));
//# sourceMappingURL=02-Aufgabe.js.map