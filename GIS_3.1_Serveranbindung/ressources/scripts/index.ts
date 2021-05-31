namespace index31 {

    const submit: HTMLElement = document.getElementById("submit");

    submit.addEventListener("click", function(e: MouseEvent): void {
        e.preventDefault();
        sendData();
        clearForm();
    });

    async function sendData(): Promise<void> {
        let url: string = "https://annasgissosse21.herokuapp.com/";
        const formData: FormData = new FormData(document.forms[0]);
        const query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        const response: Response = await fetch(url);
        console.log("response: ", response);
        const respString: string = await response.url;
        console.log("respString: " + respString);
        print(respString);
    }

    function print(_url: string): void {
        const serverResponse: HTMLElement = document.getElementById("serverResponse");
        serverResponse.className = "response";
        serverResponse.innerHTML = _url;
        
    }

    function clearForm(): void {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
        form.reset();
    }

}