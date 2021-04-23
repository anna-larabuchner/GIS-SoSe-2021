// ---- Aufgabe 5 - Schleifen, Funktionen und andere Kontrollstrukturen ----

const num1: number = 5;
const num2: number = 10;

//a)
const multi: number = multiply(num1, num2);
function multiply(a: number, b: number): number {
    return a * b;
}
console.log("Ergebnis a): " + multi);

//b)
const maxNumber: number = max(num1, num2);
function max(c: number, d: number): number {
    if (c > d) {
        return c;
    } else {
        return d;
    }
}
console.log("Ergebnis b): " + maxNumber);

//c)
count();
function count(): void {
    let i: number = 1;
    do {
        i = i + 1;
    } while (i < 100);
    console.log("Ergebnis c): " + i);
}

//d)
console.log("Ergebnisse d):");
for (let i: number = 0; i < 11; i++) {
    console.log(Math.floor(Math.random() * 100));
}

//e)
const fac: number = factorial(num1);
function factorial(n: number): number {
    let e: number = 1;

    if (n < 1) {
        return e;
    } else {
        for (let i: number = 1; i < n; i++) {
            
            e = e * (i + 1);
        }
    }
    return e;
}
console.log("Ergebnis e): " + fac);

//f)
console.log("Ergebnisse f):");
leapyears();
function leapyears(): void {
    for (let i: number = 1900; i < 2022; i++) {
        if ((i % 4) === 0 && (i % 100) !== 0) {
            console.log(i);
        }
    }
}