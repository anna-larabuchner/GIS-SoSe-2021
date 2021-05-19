namespace script25 {

    // --- get needed html elements
    const selection: HTMLElement = document.getElementById("selection");
    const reelContainer: HTMLElement = document.querySelector(".reel-container");
    const currentStep: string = reelContainer ? reelContainer.id : "";
    const name: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
    const herokuapp: HTMLElement = document.getElementById("herokuapp");

    // --- fetch JSON, build Interface, call buildPageFromData
    let data: IData;
    async function getData(_url: RequestInfo): Promise<void> {
        const response: Response = await fetch(_url);
        const respData: IData = await response.json();
        data = respData;
        buildPageFromData(respData);
    }
    getData("https://anna-larabuchner.github.io/GIS-SoSe-2021/GIS_2.5_Kommunikation/scripts/data.json");

    // --- create an img element
    function createImgElement(url: string, part?: string): HTMLImageElement {
        const imgElem: HTMLImageElement = document.createElement("img");
        imgElem.src = url;
        imgElem.id = part;
        return imgElem;
    }

    // ----- display data from getData()
    // --- call createImgElement for each img in buildData. Append imgElem, handle eventlistener and highlight function
    function buildPageFromData(buildData: IData): void {
        const currentData: string[] = buildData[currentStep];
        for (const bodyPart in currentData) {
            if (Object.prototype.hasOwnProperty.call(currentData, bodyPart)) {
                const bodyPartImgUrl: string = currentData[bodyPart];
                const imgElem: HTMLImageElement = createImgElement(bodyPartImgUrl, bodyPart);
                imgElem.classList.add("picture");
                reelContainer.appendChild(imgElem);
            }
        }

        const choices: NodeListOf<HTMLElement> = document.querySelectorAll(".picture");
        // --- highlight chosen element
        function highlightSelection(elem: HTMLElement): void {
            choices.forEach(elem => {
                elem.classList.remove("highlighted");
            });
            elem.classList.add("highlighted");
        }

        // --- eventlistener
        choices.forEach(elem => {
            elem.addEventListener("click", function(): void {
                selectElem(elem.id);
                highlightSelection(elem); 
            });
        });
    }

    // ----- select, store and show chosen elements
    function selectElem (_id: string): void {
        const id: number = Number(_id);
        let url: string = "";
        switch (currentStep) {
            case "heads":
                url = getUrl("heads", id);
                sessionStorage.setItem("head", url);
                break;
            case "bodies":
                url = getUrl("bodies", id);
                sessionStorage.setItem("body", url);
                break;
            case "legs":
                url = getUrl("legs", id);
                sessionStorage.setItem("legs", url);
                break;
            default:
                break;
        }
        paint();
    }

    function getUrl(bodyPart: string, id: number): string {
        const selectedUrl: string = data[bodyPart][id];
        return selectedUrl;
    }

    function showName(name: string): void {
        if (!name) {
            return;
        }
        selection.classList.add("show");
        // create div container for p tag
        const pDiv: HTMLDivElement = document.createElement("div");
        pDiv.className = "nameContainer";
        // create p tag
        const pElem: HTMLParagraphElement = document.createElement("p");
        pElem.className = "nameOutput";
        // append
        selection.appendChild(pDiv);
        pDiv.appendChild(pElem);
        pElem.innerHTML = name;

        if (herokuapp) {
            callHeroku("https://gis-communication.herokuapp.com");

            interface IResponse {
                [key: string]: string;
            }

            async function callHeroku(_url: RequestInfo): Promise<void> {
                const wichtel: object = {name: sessionStorage.getItem("name"), head: sessionStorage.getItem("head"), body: sessionStorage.getItem("body"), legs: sessionStorage.getItem("legs")};
                let query: URLSearchParams = new URLSearchParams(<any>wichtel);
                _url = _url + "?" + query.toString();

                const response: Response = await fetch(_url);
                const respString: IResponse = await response.json();
                console.log(respString);

                const p: HTMLParagraphElement = document.createElement("p");
                const h3: HTMLParagraphElement = document.createElement("h3");
                herokuapp.className = "response";
                herokuapp.appendChild(h3);
                h3.innerHTML = "Server Response:";
                herokuapp.appendChild(p);
                
                if (respString.error) {
                    p.className = "error";
                    p.innerHTML = respString.error;
                } else {
                    p.className = "success";
                    p.innerHTML = respString.message;
                }

            }
        }
    }

    function showSelected(url: string): void {
        if (url == null) {
            return;
        }
        selection.classList.add("show");
        const imgElem: HTMLImageElement = createImgElement(url);
        selection.appendChild(imgElem);
    }

    // --- reads sessionStorage, calls showSelected
    function paint(): void {
        selection.innerHTML = "";
        showName(sessionStorage.getItem("name"));
        showSelected(sessionStorage.getItem("head"));
        showSelected(sessionStorage.getItem("body"));
        showSelected(sessionStorage.getItem("legs"));
    }
    paint();
    // ----- END display data


    if (name != null) {
        name.addEventListener("input", function(): void {
            let input: string = name.value;
            sessionStorage.setItem("name", input);
            paint();
        });
    }
}

