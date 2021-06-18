"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let dataCollection;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    //const databaseUrl: string = "mongodb://127.0.0.1:27017";
    //"mongodb://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net/"
    const databaseUrl = "mongodb+srv://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        console.log("Starting server");
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        dataCollection = mongoClient.db("dreiPunktVier").collection("Preferences");
        console.log("Database connection ", dataCollection != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/json; charset=utf-8");
        // .setHeader() gibt an, in welchem Format die Antwort des S ist
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            const address = _request.url;
            const addressObj = Url.parse(address, true);
            if (addressObj.pathname == "/get") {
                const mongoPromise = await getData();
                // Es funktioniert, auch wenn der linter meckert. Ich weiß, sollte so nicht sein,
                // aber ich hab's nicht anders hinbekommen und das Prax war schon vorbei.
                // Hatte vergessen zu fragen, als ich da war. :-/
                const mongoData = await mongoPromise;
                _response.write(JSON.stringify(mongoData));
            }
            else if (addressObj.pathname == "/set") {
                const formData = JSON.stringify(addressObj.query);
                _response.write(formData);
                storeData(addressObj.query);
            }
            else if (addressObj.pathname == "/delete") {
                const id = JSON.stringify(addressObj.query);
                console.log(id);
                deleteEntry(id);
            }
            // .write() ist die Antwort des Servers
            _response.end();
        }
    }
    function storeData(_data) {
        dataCollection.insert(_data);
    }
    async function getData() {
        const cursor = dataCollection.find();
        const result = await cursor.toArray();
        //console.log("result server: ", result);
        return result;
    }
    async function deleteEntry(_idToDel) {
        const d = await dataCollection.findOne({ "_id": _idToDel });
        //console.log(d);
        dataCollection.deleteOne(d);
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=server.js.map