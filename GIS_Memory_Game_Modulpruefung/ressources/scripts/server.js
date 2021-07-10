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
    const dbUrl = "mongodb://127.0.0.1:27017";
    //const dbUrl: string = "mongodb+srv://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net";
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
        if (_request.url) {
            const address = _request.url;
            const addressObj = Url.parse(address, true);
            if (addressObj.pathname == "/list") {
                const pairData = JSON.stringify(addressObj.query);
                const mongoPromise = await getScoresByPairNumber(JSON.parse(pairData));
                const mongoData = await mongoPromise;
                _response.write(JSON.stringify(mongoData));
            }
            else if (addressObj.pathname == "/save") {
                const gameData = JSON.stringify(addressObj.query);
                storeData(JSON.parse(gameData));
            }
            else if (addressObj.pathname == "/add") {
                const imgurl = JSON.stringify(addressObj.query);
                const errormessage = await imagesAddUrl(JSON.parse(imgurl));
                console.log(errormessage);
                _response.write(JSON.stringify(errormessage));
            }
            else if (addressObj.pathname == "/delete") {
                const queryParams = addressObj.query;
                const url = queryParams.url;
                deleteEntry(url);
            }
            else if (addressObj.pathname == "/imgs") {
                const mongoPromise = await getImgs();
                const mongoData = mongoPromise;
                _response.write(JSON.stringify(mongoData));
            }
            _response.end();
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
            return { "message": "Dieses Bild existiert bereits. Bitte füge ein anderes hinzu." };
        }
        console.log("I'm adding a image url.");
        images.insertOne(_url);
        return { "message": "success" };
    }
    async function getImgs() {
        console.log("I'm getting the images.");
        const cursor = images.find();
        const urlList = await cursor.toArray();
        return urlList;
    }
})(foxServer = exports.foxServer || (exports.foxServer = {}));
//# sourceMappingURL=server.js.map