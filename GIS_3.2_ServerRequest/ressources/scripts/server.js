"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2_1Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2_1Server;
(function (P_3_2_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // .setHeader() gibt an, in welchem Format die Antwort des S ist
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            const address = _request.url;
            const addressObj = Url.parse(address, true);
            if (addressObj.pathname == "/json") {
                _response.setHeader("content-type", "text/json; charset=utf-8");
                _response.write(JSON.stringify(addressObj.query));
            }
            else {
                for (let key in addressObj.query) {
                    _response.write("<p>" + key + ": " + addressObj.query[key] + "</p>");
                }
            }
            // .write() ist die Antwort des Servers
            _response.end();
        }
    }
})(P_3_2_1Server = exports.P_3_2_1Server || (exports.P_3_2_1Server = {}));
//# sourceMappingURL=server.js.map