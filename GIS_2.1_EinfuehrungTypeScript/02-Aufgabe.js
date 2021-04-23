// ---- Aufgabe 2 - Kontinuierliche Variablenmanipulation ----
function a2() {
    var i = 9; //2) i wird mit 9 initialisiert, let lässt vermuten, dass sich der Wert noch ändern wird
    do {
        console.log(i); //3) i wird in der Konsole ausgegeben. 1. Durchlauf: 9, 2. Durchlauf: 8, usw. Läuft insgesamt 10 mal durch, dass ist i = 0 und 'while (i > 0)' ergibt 'false'
        i = i - 1; //4) von i wird 1 subtrahiert
    } while (i > 0); //5) Prüfung, ob i größer Null ist. Nur solange das 'true' ist, wird der 'do' Code ausgeführt. Sprung zu 'do', da i aktuell 8 ist. 
}
a2(); //1) start
