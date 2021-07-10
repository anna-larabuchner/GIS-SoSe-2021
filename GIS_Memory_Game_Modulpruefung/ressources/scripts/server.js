"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foxServer = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var foxServer;
(function (foxServer) {
    let scores;
    let images;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    //const dbUrl: string = "mongodb://127.0.0.1:27017";
    const dbUrl = "mongodb+srv://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net";
    startServer(port);
    connectToDatabase(dbUrl);
    function startServer(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
        console.log("Server is running!");
    }
    async function connectToDatabase(_url) {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        scores = mongoClient.db("foxMemory").collection("ScoreList");
        images = mongoClient.db("foxMemory").collection("Images");
        console.log("Database 'scores' connection ", scores != undefined);
        console.log("Database 'images' connection ", images != undefined);
    }
    function handleListen() {
        console.log("Listening...");
    }
    async function handleRequest(_request, _response) {
        console.log("I'm about to do something...");
        _response.setHeader("content-type", "text/json; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("Access-Control-Allow-Methods", "DELETE");
        if (_request.url) {
            const address = _request.url;
            const addressObj = Url.parse(address, true);
            if (addressObj.pathname == "/list") {
                const pairData = JSON.stringify(addressObj.query);
                const mongoPromise = await getScoresByPairNumber(JSON.parse(pairData));
                const mongoData = await mongoPromise;
                _response.write(JSON.stringify(mongoData));
                _response.end();
            }
            else if (addressObj.pathname == "/save") {
                if (_request.method == "POST") {
                    let body = "";
                    _request.on("data", data => {
                        body += data;
                    });
                    _request.on("end", async () => {
                        let post = JSON.parse(body);
                        storeData(post);
                    });
                    _response.write(JSON.stringify({ "success": true }));
                    _response.end();
                }
            }
            else if (addressObj.pathname == "/delete") {
                const queryParams = addressObj.query;
                const url = queryParams.url;
                deleteEntry(url);
                _response.end();
            }
            else if (addressObj.pathname == "/imgs") {
                if (_request.method == "GET") {
                    const mongoPromise = await getImgs();
                    const mongoData = mongoPromise;
                    _response.write(JSON.stringify(mongoData));
                    _response.end();
                }
                else if (_request.method == "POST") {
                    let responseMessage;
                    let body = "";
                    _request.on("data", data => {
                        body += data;
                    });
                    _request.on("end", async () => {
                        let post = JSON.parse(body);
                        responseMessage = await imagesAddUrl(post);
                        if (responseMessage) {
                            _response.write(JSON.stringify(responseMessage));
                            _response.end();
                        }
                    });
                }
            }
        }
    }
    async function getScoresByPairNumber(_pairData) {
        console.log("I'm getting the highscore data.");
        const cursor = scores.find(_pairData).sort({ "time": 1, "_id": 1 }).limit(10);
        const list = await cursor.toArray();
        return list;
    }
    function storeData(_data) {
        console.log("I'm storing new score data.");
        scores.insertOne(_data);
    }
    async function deleteEntry(_urlToDelete) {
        console.log("I'm deleting one image with url: " + _urlToDelete);
        images.deleteOne({ "url": _urlToDelete });
    }
    async function imagesAddUrl(_url) {
        const count = await images.find({ "url": _url.url }).count();
        if (count >= 1) {
            return { "success": false, "message": "Dieses Bild existiert bereits. Bitte füge ein anderes hinzu." };
        }
        console.log("I'm adding a image url.");
        images.insertOne(_url);
        return { "success": true, "message": "" };
    }
    async function getImgs() {
        console.log("I'm getting the images.");
        const cursor = images.find();
        const urlList = await cursor.toArray();
        return urlList;
    }
})(foxServer = exports.foxServer || (exports.foxServer = {}));
//# sourceMappingURL=server.js.map