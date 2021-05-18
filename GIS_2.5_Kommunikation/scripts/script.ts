namespace script25 {

    // --- get needed html elements
    const selection: HTMLElement = document.getElementById("selection");
    const reelContainer: HTMLElement = document.querySelector(".reel-container");
    const currentStep: string = reelContainer ? reelContainer.id : "";
    const name: HTMLInputElement = <HTMLInputElement>document.getElementById("name");

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

    // ----- display data from data.ts
    // --- call createImgElement for each img in jsonData. Append imgElem
    function buildPageFromData(buildData: IData): void {
        const currentData: string[] = buildData[currentStep];
        console.log(buildData);
        console.log(currentStep);
        console.log(buildData["data"]);
        for (const bodyPart in currentData) {
            if (Object.prototype.hasOwnProperty.call(currentData, bodyPart)) {
                const bodyPartImgUrl: string = currentData[bodyPart];
                const imgElem: HTMLImageElement = createImgElement(bodyPartImgUrl, bodyPart);
                imgElem.classList.add("picture");
                reelContainer.appendChild(imgElem);
            }
        }
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

    if (name != null) {
        name.addEventListener("input", function(): void {
            let input: string = name.value;
            sessionStorage.setItem("name", input);
            paint();
        });
    }
}

