namespace script {

    // --- get needed html elements
    const selection: HTMLElement = document.getElementById("selection");
    const reelContainer: HTMLElement = document.querySelector(".reel-container");
    const currentStep: string = reelContainer ? reelContainer.id : "";
    const name: HTMLElement = document.getElementById("name");

    // --- interfaces
    let head: IHead = {head: null};
    let body: IBody = {body: null};
    let legs: ILegs = {legs: null};

    // --- create an img element
    function createImgElement(url: string, part?: string): HTMLImageElement {
        const imgElem: HTMLImageElement = document.createElement("img");
        imgElem.src = url;
        imgElem.id = part;
        return imgElem;
    }

    // ----- display data from data.ts
    // --- call createImgElement for each img in dataJSON in file data.ts. Append imgElem
    // it's working, even if the linter cries
    function buildPageFromData(buildData: string): void {
        const jsonData: Object = JSON.parse(buildData);
        const currentData: Object = jsonData[currentStep];

        for (const bodyPart in currentData) {
            if (Object.prototype.hasOwnProperty.call(currentData, bodyPart)) {
                const bodyPartImgUrl: string = currentData[bodyPart];
                const imgElem: HTMLImageElement = createImgElement(bodyPartImgUrl, bodyPart);
                imgElem.classList.add("pic-reel");
                reelContainer.appendChild(imgElem);
            }
        }
    }
    buildPageFromData(dataJSON);

    // ----- select, store and show chosen elements
    function selectElem (id: string): void {
        let url: string = "";
        switch (currentStep) {
            case "heads":
                url = getUrl("heads", id);
                head = {head: url};
                localStorage.setItem("head", url);
                break;
            case "bodies":
                url = getUrl("bodies", id);
                body = {body: url};
                localStorage.setItem("body", url);
                break;
            case "legs":
                url = getUrl("legs", id);
                legs = {legs: url};
                localStorage.setItem("legs", url);
                break;
            default:
                break;
        }
        paint();
    }

    function getUrl(bodyPart: string, id: string): string {
        const jsonData: Object = JSON.parse(dataJSON);
        const selectedUrl: string = jsonData[bodyPart][id];
        return selectedUrl;
    }

    function showName(name: string): void {
        if (name == "") {
            return;
        }
        selection.classList.add("show");
        const pElem: HTMLParagraphElement = document.createElement("p");
        pElem.className = "nameOutput";
        selection.appendChild(pElem);
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

    // --- reads localStorage, calls showSelected
    function paint(): void {
        selection.innerHTML = "";
        showName(localStorage.getItem("name"));
        showSelected(localStorage.getItem("head"));
        showSelected(localStorage.getItem("body"));
        showSelected(localStorage.getItem("legs"));
    }
    paint();
    

    const choices: NodeListOf<HTMLElement> = document.querySelectorAll(".pic-reel");

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
            localStorage.setItem("name", input);
            paint();
        });
    }
}

