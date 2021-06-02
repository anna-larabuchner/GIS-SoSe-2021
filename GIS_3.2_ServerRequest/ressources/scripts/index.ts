namespace index32 {

    // ----- HTML Elemente -----
    const html: HTMLElement = document.getElementById("html");
    const json: HTMLElement = document.getElementById("json");
    const serverResponse: HTMLElement = document.getElementById("serverResponse");

    // ----- Event Listener -----
    html.addEventListener("click", function(e: MouseEvent): void {
        e.preventDefault();
        callServer("html");
        clearForm();
    });

    json.addEventListener("click", function(e: MouseEvent): void {
        e.preventDefault();
        callServer("json");
        clearForm();
    });

    // ----- async server call -----
    async function callServer(_pathType: string): Promise<void> {
        let url: string = "";
        const formData: FormData = new FormData(document.forms[0]);
        const query: URLSearchParams = new URLSearchParams(<any>formData);

        if (_pathType == "html") {
            url = "https://annasgissosse21.herokuapp.com/html" + "?" + query.toString();
            const response: Response = await fetch(url);
            const respString: string = await response.text();
            print(respString);
        } else {
            clearResponse();
            url = "https://annasgissosse21.herokuapp.com/json" + "?" + query.toString();
            const response: Response = await fetch(url);
            const receivedObj: IJson = await response.json();
            console.log(receivedObj);
        }
    }

    // ----- visible changes in html -----
    function print(_url: string): void {
        serverResponse.className = "response";
        serverResponse.innerHTML = _url;
    }

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
        [key: string]: string;
    }

}