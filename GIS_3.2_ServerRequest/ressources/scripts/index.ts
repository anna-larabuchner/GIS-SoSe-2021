namespace index32 {

    // ----- HTML Elemente -----
    const html: HTMLElement = document.getElementById("html");
    const json: HTMLElement = document.getElementById("json");

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
            url = "http://127.0.0.1:8100/html" + "?" + query.toString();
            const response: Response = await fetch(url);
            const respString: string = await response.text();
            print(respString);
        } else {
            url = "http://127.0.0.1:8100/json" + "?" + query.toString();
            const response: Response = await fetch(url);
            const receivedObj: IJson = await response.json();
            console.log(receivedObj);
        }
    }

    // ----- visible changes in html -----
    function print(_url: string): void {
        const serverResponse: HTMLElement = document.getElementById("serverResponse");
        serverResponse.className = "response";
        serverResponse.innerHTML = _url;
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