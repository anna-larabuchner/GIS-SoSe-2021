// ---- Aufgabe 1 - Basics ----
function a1() {
    var x = "Alles";
    console.log(x);
    func2();
    console.log(x);
    func1();
    console.log(x);
    console.log("Logo!");
}
a1();
function func1() {
    console.log("Klar?");
}
// a) Ausagbe: Alles Klar? Logo! (jeweils in einer neuen Zeile)
// a) Unzulässige Variablen-/Funktionsnamen: -a1, #a1, b1 a1, a1/b1
/* b) Code-Lauf: Bei a1() wird die Funktion a1() aufgerufen (Aufruf muss nach Funktion stehen, sonst Funktion noch nicht definiert).
In a1() wird zuerst eine Variable mit dem Namen x deklariert und mit dem string "Alles" initialisiert. Danach folgt ein console.log(),
dass den in der Variable x gespeicherten string in der Konsole ausgibt. Anschließend wird die func1() aufgerufen. Diese gibt in der
Konsole den string "Klar?" aus. func1() ist hiermit zuende und es geht in a1() weiter. Hier wird nun die letzte Zeile der Funktion
ausgeführt. "Logo!" wird in der Konsole ausgegeben. */
// c):
function func2() {
    console.log("Gute!");
}
