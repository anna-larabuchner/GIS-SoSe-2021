import * as Http from "http"; 
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_4Server {

    interface IFormData {
        [key: string]: string | string[];
    }

    let dataCollection: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }  

    //const databaseUrl: string = "mongodb://127.0.0.1:27017";
    const databaseUrl: string = "mongodb+srv://alb:FM5yuYT3ZBUPSONT@gis.ux2wo.mongodb.net";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        console.log("Starting server");

        let server: Http.Server = Http.createServer();

        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    
    async function connectToDatabase(_url: string): Promise<void> {
        const options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        const mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        
        dataCollection = mongoClient.db("dreiPunktVier").collection("Preferences");
        console.log("Database connection ", dataCollection != undefined);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/json; charset=utf-8"); 
        // .setHeader() gibt an, in welchem Format die Antwort des S ist
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {
            const address: string = _request.url;
            const addressObj: Url.UrlWithParsedQuery = Url.parse(address, true);
            
            if (addressObj.pathname == "/get") {
                const mongoPromise: Promise<IFormData[]> = await getData();
                // Es funktioniert, auch wenn der linter meckert. Ich weiß, sollte so nicht sein,
                // aber ich hab's nicht anders hinbekommen und das Prax war schon vorbei.
                // Hatte vergessen zu fragen, als ich da war. :-/
                const mongoData: IFormData[] = await mongoPromise;
                _response.write(JSON.stringify(mongoData));

            } else if (addressObj.pathname == "/set") {
                const formData: string = JSON.stringify(addressObj.query);
                _response.write(formData);
                storeData(addressObj.query);

            } else if (addressObj.pathname == "/delete") {
                console.log(addressObj.query);
                const queryParams: IQueryParams = addressObj.query;
                console.log(queryParams.id);
                const id: string = <string>queryParams.id;
                deleteEntry(id);
            }    
            // .write() ist die Antwort des Servers
            _response.end(); 
        }
    }

    function storeData(_data: IFormData): void { 
        dataCollection.insert(_data);
    }

    async function getData(): Promise<IFormData[]> {
        const cursor: Mongo.Cursor = dataCollection.find();
        const result: IFormData[] = await cursor.toArray();
        return result;
    }

    async function deleteEntry(_idToDel: string): Promise<void> {
        //const d: IFormData = await dataCollection.findOne({"_id": _idToDel});
        dataCollection.deleteOne({"_id" : new Mongo.ObjectId(_idToDel)});
    }

    interface IQueryParams {
        [key: string]: string | string[];
    }
}