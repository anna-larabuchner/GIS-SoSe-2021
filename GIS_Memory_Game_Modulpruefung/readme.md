--- Disclaimer ---

Bei einer Spielzeit von mehr als ca. 50 Sekunden reagiert der heroku Server nicht mehr und das Spiel wird nicht in der Datenbank gespeichert. Ein Spiel mit über 9/10 Paaren ist daher über heroku leider wenig sinnvoll. 
Zum Testen der Funktionalität mit über 9 Paaren sollte lokal getestet werden.



--- Ausführung des Fox Memorys ---

Die index.html im Browser öffnen und die server.ts bitte über den NodeJS-Server aufrufen. Es wird eine Verbindung zu einer Mongo Datenbank benötigt. Bitte hierfür mongod starten  und einen Zielordner für die Daten angeben. 

Ein LiveServer wird nicht benötigt.



--- Erklärung des Aufbaus und der Funktion ---

Die index.html enthält die Navigation des Spiels. Unter "Zum Memory" kann ein Memoryspiel mit 8 bis 15 Pärchen gestartet werden. Die Zeit wird während des Spiels gestoppt. Sollte der Spieler oder die Spielerin vorzeitig aufgeben wollen, befindet sich auf der Seite ein "Aufgeben" Button. 

Über das Logo im Header gelangen Nutzer:innen direkt wieder zurück auf die index.html und damit zurück zur Navigation. 

Unter "Bestenliste" befinden sich die Highscore-Listen für die verschiedenen Anzahlen von Pärchen. Per default wird die Bestenliste für acht Paare angezeigt, über das Dropdown können die anderen Paar-Anzahlen abgerufen werden. Wurde bereits ein Memory gespielt, wird, wenn nicht manuell anders ausgewählt, die Liste der Menge an Paaren angezeigt, die der Spieler/die Spielerin gespielt hat. 

Unter "Einstellungen" können über das URL Input Feld eigene Bilder für das Memory hinzugefügt werden. Diese können durch Klicken auf das jeweilige Bild auch wieder gelöscht werden. Es ist nicht nötig, dass die gleiche Anzahl eigens hinzugefügte Bilder vorhanden sind, wenn ein Spiel gestartet wird. Sind zu wenig Bilder in der Datenbank, wird auf Platzhalter zurückgegriffen und das Spiel kann trotzdem gespielt werden.



--- Datenbankstruktur ---

Es bestehen zwei MongoDB Collections innerhalb einer Datenbank ("foxMemory"). Eine für die Highscore Daten ("ScoreList") und eine für die von den Nutzer:innen hinzugefügten Bilder ("Images");


foxMemory: {

    ScoreList: {
        "_id": "wird von MongoDB automatisch vergeben",
        "pairs": "Anzahl der gespielten Paare",
        "time": "Gespielte Zeit in 'lesbarem' Format",
        "timeInSec": "Gespielte Zeit in Sekunden für die Highscore auswertung",
        "player": "Name des Spielers"
    },

    Images: {
        "_id": "wird von MongoDB automatisch vergeben",
        "url": "Url des Bildes"
    }

}




Projektaufgabe in der Vorlesung Gestaltung Interaktiver Systeme, Dozent: Prof. Dr. Norbert Schnell, im Studiengang OnlineMedien B.Sc, an der Fakultät Digitale Medien. Projektaufgabe von Anna-Lara Buchner, Matrikelnr.: 266157