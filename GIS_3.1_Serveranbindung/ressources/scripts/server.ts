import * as Http from "http"; 
// importiert sämtliche Funktionalitäten (*) des zusätzlichen Moduls http

export namespace P_3_1_1Server {
// export namespace wird aufgrund des "import" verlangt, tut jedoch nichts zur Sache
    console.log("Starting server");
    // gibt "Starting server" in der Konsole aus, sobald über npm start der Server angesprochen wird
    let port: number = Number(process.env.PORT);
    // deklariert die Variable "port" vom Typ Nummer und
    // initialisiert sie mit dem PORT, auf den der Server hören soll
    if (!port) {
    // wenn port undefined ist, dann soll port der Wert 8100 zugewiesen werden
    // 8100 ist der LocalHost Port des Servers 
        port = 8100;
    }    

    let server: Http.Server = Http.createServer();
    // deklariert die Variable "server" vom Typ Http.Server und kreiert einen neuen Server
    server.addListener("request", handleRequest);
    // fügt einen "request" Listener hinzu, der die Funktion handleRequest aufruft
    server.addListener("listening", handleListen);
    // fügt einen "listening" Listener hinzu, der die Funktion handleListen aufruft
    server.listen(port);
    // sagt dem Server, auf welchen Port er hören soll. 

    function handleListen(): void {
        console.log("Listening");
        // gibt "Listening" in der Konsole aus
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        // gibt "I hear voices!" in der Konsole aus
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // setzt einen header mit dem name "content-type" und dem value "text/html; charset=utf-8"
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // setzt einen weiteren header mit dem name "Access-Control-Allow-Origin" und dem value "*"
        _response.write(_request.url, () => {
            console.log(_request.url);
        });
        // da .writeHead() nicht aufgerufen wurde, wechselt .write() in den implicit header mode
        // beim ersten Aufruf wird die header Information an den Client übergeben
        // beim zweiten Aufruf nimmt Node.js an, dass Daten gestreamed werden und sendet die neuen Daten separat
        // der return value ist boolean. True für alle Daten wurden erfolgreich an den kernel buffer übergeben und false,
        // wenn alle oder Teile der Daten im user memory zwischengespeichert wurden, da der kernel buffer voll ist. 
        // Gibt in diesem konkreten Fall die URL auf der Website und der Konsole aus
        _response.end();
        // sendet ein Signal zum Server, dass der komplette header gesendet wurde.
    }
}