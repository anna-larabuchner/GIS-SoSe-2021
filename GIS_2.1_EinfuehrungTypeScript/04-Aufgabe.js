"use strict";
// ---- Aufgabe 4 - Gobal vs Lokal ----
//a)
let x = "Hallo"; //x wird mit 'Hallo' initialisiert, let -> neuer Wert kann zugewiesen werden
console.log(x); //'Hallo' wird in der Konsole ausgegeben
func3(x); //func3 wird mit x = 'Hallo' aufgerufen
console.log(x); //'Hallo' wird in der Konsole ausgegeben, die Veränderung durch func1 galt nur innerhalb func1
func4(); //func4 wird aufgerufen, kein Wert wird übergeben
func5(); //func5 wird aufgerufen, kein Wert wird übergeben
console.log(x); //'Test' wird in der Konsole ausgegeben
function func3(y) {
    y = "Bla"; //x wird innerhalb dieser Funktion y genannt und der Wert 'Bla' zugewiesen
    console.log(y); //'Bla' wird in der Konsole ausgegeben
} //Sprung in Zeile 5
function func4() {
    let x = "Blubb"; //neue Variable x mit dem Wert 'Blubb' wird angelegt
    console.log(x); //'Blubb' wird in der Konsole ausgegeben
} //Sprung in Zeile 7
function func5() {
    x = "Test"; //hier wird das x vom Anfang des Codes überschrieben und dessen Wert auf 'Test' gesetzt
} //Sprung in Zeile 8
//Warum kann man innerhalb eines Packages eine Funktion nur einmal deklarieren, obwohl sie in unterschiedlichen ts files liegen würde? 
//Vermutlich kann man innerhalb eines Packages file übergreifend auf die Funktionen zugreifen. Ähnlich wie bei Java je nach modifier
//b)
/*  Globale Variablen: Sind innerhalb des gesamten files verfügbar.
    Lokale Variablen: Sind nur innerhalb ihres Scropes verfügbar, also innerhalb einer Funktion.
    Übergabeparameter: Stehen in den runden Klammern() einer Funktion, sie geben nur an, welcher Typ Variable übergeben wird und wie die übergebene Variable innerhalb der Funktion heißt.
    "Normale" Variablen können deklariert und initialisiert werden, Funktionen auch. Variablen und Funktionen können entweder Global oder Lokal verfügbar sein.
    Variablen wird ein Wert zugewiesen. Dieser kann entweder nachträglich noch verändert werden (let) oder ist konstant (const). Wird z.B. innerhalb eines Loops ein Objekt einer Variablen zugewiesen,
    kann sich trotz 'const' der zugewiesene Wert verändern. Da das zugewiesene Objekt das gleiche bleibt und sich nur der Inhalt dessen ändert (call by reference).
    Funktionen können ausgeführt werden. Ihnen wird ein Wert übergeben, oder auch nicht, und anschließend können tolle Dinge gemacht werden. Allerhand verändert, neu aufgebaut, verschoben und z. B. sortiert werden.*/ 
//# sourceMappingURL=04-Aufgabe.js.map