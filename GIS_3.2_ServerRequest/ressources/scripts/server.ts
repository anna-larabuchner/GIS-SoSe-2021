import * as Http from "http"; 
import * as Url from "url";

export namespace P_3_2_1Server {

    console.log("Starting server");

    let port: number = Number(process.env.PORT);

    if (!port) {
        port = 8100;
    }    

    let server: Http.Server = Http.createServer();

    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8"); 
        // .setHeader() gibt an, in welchem Format die Antwort des S ist
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {
            const address: string = _request.url;
            const addressObj: Url.UrlWithParsedQuery = Url.parse(address, true);
            
            if (addressObj.pathname == "/json") {
                _response.setHeader("content-type", "text/json; charset=utf-8");
                _response.write(JSON.stringify(addressObj.query));
            } else {
                for (let key in addressObj.query) {
                    _response.write("<p>" + key + ": " + addressObj.query[key] + "</p>");
                }
            }      
            // .write() ist die Antwort des Servers
            _response.end(); 
        }
    }
}