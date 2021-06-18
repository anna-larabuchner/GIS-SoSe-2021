namespace index34 {

    // ----- HTML Elemente -----
    const set: HTMLElement = document.getElementById("set");
    const get: HTMLElement = document.getElementById("get");
    const serverResponse: HTMLElement = document.getElementById("serverResponse");

    // ----- Event Listener -----
    set.addEventListener("click", function(e: MouseEvent): void {
        e.preventDefault();
        callServer("set");
        clearForm();
    });

    get.addEventListener("click", function(e: MouseEvent): void {
        e.preventDefault();
        callServer("get");
        clearForm();
    });

    // ----- async server call -----
    async function callServer(_pathType: string): Promise<void> {
        let url: string = "";
        const formData: FormData = new FormData(document.forms[0]);
        const query: URLSearchParams = new URLSearchParams(<any>formData);

        if (_pathType == "get") {
            //url = "http://127.0.0.1:8100/get" /*+ "?" + query.toString()*/;
            url = "https://annasgissosse21.herokuapp.com/get";
            const response: Response = await fetch(url);
            //console.log("response: ", response);
            const respArr: IJson[] = await response.json();
            //console.log("respArr: ", respArr);
            print(respArr);
        } else if (_pathType == "set") {
            clearResponse();
            //url = "http://127.0.0.1:8100/set" + "?" + query.toString();
            url = "https://annasgissosse21.herokuapp.com/set" + "?" + query.toString();
            const response: Response = await fetch(url);
            const receivedStr: IJson = await response.json();
            console.log(receivedStr);
        }
    }

    // ----- visible changes in html -----
    function print(_jsonArr: IJson[]): void {
        serverResponse.className = "response";

        for (const key in _jsonArr) {

            if (Object.prototype.hasOwnProperty.call(_jsonArr, key)) {
                const entry: IJson = _jsonArr[key];

                const container: HTMLDivElement = document.createElement("div");
                container.className = "container";

                const div: HTMLDivElement = document.createElement("div");
                div.className = "entry";

                const del: HTMLButtonElement = document.createElement("button");
                del.className = "delete";
                del.innerHTML = "Delet Entry";
                let id: string;

                for (const lineKey in entry) {
                    
                    if (Object.prototype.hasOwnProperty.call(entry, lineKey)) {
                        if (lineKey != "_id") {
                            id = <string>entry["_id"]; 
                            const lineValue: string | string[] = entry[lineKey];
                            //console.log(lineValue);
                            const pElem: HTMLParagraphElement = document.createElement("p");
                            pElem.innerHTML = lineKey + ": " + lineValue;
                            div.appendChild(pElem);
                        }
                    }
                }
                serverResponse.appendChild(container);
                del.id = id;
                container.appendChild(div);
                container.appendChild(del);
            }
        }
        addListener();
        console.log("after addListener()");   
    }

    // ----- EventListener for buttons -----
    function addListener(): void {
        console.log("in addListener()");
        const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(".delete");
        buttons.forEach(button => {
            console.log("in forEach()");
            button.addEventListener("click", function(e: MouseEvent): void {
                e.preventDefault();
                console.log("event listener added");
                callToDelete(button.id);
            });
        });
    }

    // ----- server call to delete one entry -----
    function callToDelete(_id: string): void {
        const query: URLSearchParams = new URLSearchParams(<any>_id);
        //const url: string = "http://127.0.0.1:8100/delete" + "?" + query.toString();
        const url: string = "https://annasgissosse21.herokuapp.com/delete" + "?" + query.toString();
        fetch(url);
    }

    // ----- clean up -----
    function clearResponse(): void {
        serverResponse.classList.remove("response");
        serverResponse.innerHTML = "";
    }

    function clearForm(): void {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
        form.reset();
    }

    // ----- interface for /json -----
    interface IJson {
        [key: string]: string | string[];
    }

}