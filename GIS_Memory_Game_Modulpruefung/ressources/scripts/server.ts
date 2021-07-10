import * as Http from "http"; 
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace foxServer {

    let scores: Mongo.Collection;
    let images: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }

    //const dbUrl: string = "mongodb://127.0.0.1:27017";
    const dbUrl: string = "mongodb+srv://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net";

    startServer(port);
    connectToDatabase(dbUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();

        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);

        console.log("Server is running!");
    }
    
    async function connectToDatabase(_url: string): Promise<void> {
        const options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        const mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        
        scores = mongoClient.db("foxMemory").collection("ScoreList");
        images = mongoClient.db("foxMemory").collection("Images");
        console.log("Database 'scores' connection ", scores != undefined);
        console.log("Database 'images' connection ", images != undefined);

    }

    function handleListen(): void {
        console.log("Listening...");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I'm about to do something...");

        _response.setHeader("content-type", "text/json; charset=utf-8"); 
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            const address: string = _request.url;
            const addressObj: Url.UrlWithParsedQuery = Url.parse(address, true);
            
            if (addressObj.pathname == "/list") {
                const pairData: string = JSON.stringify(addressObj.query);
                const mongoPromise: IScoreData[] = await getScoresByPairNumber(JSON.parse(pairData));
                const mongoData: IScoreData[] = await mongoPromise;
                _response.write(JSON.stringify(mongoData));

            } else if (addressObj.pathname == "/save") {
                const gameData: string = JSON.stringify(addressObj.query);
                storeData(JSON.parse(gameData));

            } else if (addressObj.pathname == "/add") {
                const imgurl: string = JSON.stringify(addressObj.query);
                const errormessage: object = await imagesAddUrl(JSON.parse(imgurl));
                console.log(errormessage);
                _response.write(JSON.stringify(errormessage));

            } else if (addressObj.pathname == "/delete") {
                const queryParams: IQueryParams = addressObj.query;
                const url: string = <string>queryParams.url;
                deleteEntry(url);

            } else if (addressObj.pathname == "/imgs") {
                const mongoPromise: string[] = await getImgs();
                const mongoData: string[] = mongoPromise;
                _response.write(JSON.stringify(mongoData));

            }

            _response.end(); 
        }
    }

    async function getScoresByPairNumber(_pairData: object): Promise<IScoreData[]> {
        console.log("I'm getting the highscore data.");
        const cursor: Mongo.Cursor = scores.find(_pairData).sort({"time": 1, "_id": 1}).limit(10);
        const list: IScoreData[] = await cursor.toArray();
        return list;
    }

    function storeData(_data: string): void { 
        console.log("I'm storing new score data.");
        scores.insertOne(_data);
    }

    async function deleteEntry(_urlToDelete: string): Promise<void> {
        console.log("I'm deleting one image with url: " + _urlToDelete);
        images.deleteOne({"url" : _urlToDelete });
    }

    async function imagesAddUrl(_url: IUrl): Promise<object> {
        const count: number = await images.find({"url": _url.url }).count();

        if (count >= 1) {
            return {"message": "Dieses Bild existiert bereits. Bitte füge ein anderes hinzu."};
        }
        console.log("I'm adding a image url.");
        images.insertOne(_url);
        return {"message": "success"};
    }

    async function getImgs(): Promise<string[]> {
        console.log("I'm getting the images.");
        const cursor: Mongo.Cursor = images.find();
        const urlList: string[] = await cursor.toArray();
        return urlList;
    }


    // ----- interface -----
    interface IScoreData {
        [key: string]: string;
    }

    interface IQueryParams {
        [key: string]: string | string[];
    }

    interface IUrl {
        url: string;
    }
}