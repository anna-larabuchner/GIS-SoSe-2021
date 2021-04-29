namespace Aufgabe02 {
    // ---- Aufgabe 2 - Arrays ----

    // a)
    function backwards(arr: number[]): number[] {
        let bwArr: number[] = [];
        for (let i: number = arr.length - 1; i >= 0; i--) {
            bwArr.push(arr[i]);
        }
        return bwArr;
    }
    const test: number[] = [1, 2, 3, 4];
    console.log("Ergebnis a): " + backwards(test));
    console.log("______________________________________");

    // b)
    function join(...arrs: number[][]): number[] {
        let joinedArr: number[] = [];
        //arrs.forEach(arr => joinedArr.push(arr)); // geht, würde aber einen mehrdimensionalen array erzeugen
        arrs.forEach(arr => arr.forEach(elem => joinedArr.push(elem)));
        return joinedArr;
    }
    const a1: number[] = [1, 2, 3];
    const a2: number[] = [4, 5, 6];
    const a3: number[] = [7, 8, 9];
    console.log("Ergebnis b): " + join(a1, a2, a3));
    console.log("______________________________________");

    // c)
    function split(arr: number[], index1: number, index2: number): number[] {
        let splittedArr: number[] = [];
        if (index1 >= 0 && index2 < arr.length && index1 < index2) {
            for (let i: number = index1; i <= index2; i++) {
                splittedArr.push(arr[i]);
            }
        } else {
            console.log("Sorry, index1 has to be smaller than index2 and both indices have to be within the array length - 1.");
        }
        return splittedArr;
    }
    const a4: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    console.log("Ergebnis c): " + split(a4, 1, 4));
    console.log("______________________________________");

    // Testcode
    let arr: number[] = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack: number[] = backwards(arr);
    console.log("unveränderter Array arr: " + arr);
    console.log("Array aus backwards(arr): " + arrBack);
    console.log("Join(arr) + array: " + join(arr, [15, 9001, -440] ));
    console.log("Join Aufruf 2: " + join([123, 666, -911], arr, [15, 9001, -440, 1024] )); // Bonus b)
    arr = split(arr, 0, 4);
    console.log("arr überschrieben mit split Aufruf: " + arr);
    console.log("Split Aufruf 2: " + split(arr, 1, 2));
    console.log("Split Aufruf 3: " + split(arr, 2, 0));     // Bonus c)
    console.log("Split Aufruf 4: " + split(arr, -1, 2));    // Bonus c)
    console.log("Split Aufruf 5: " + split(arr, 0, 7));     // Bonus c)
}