"use strict";
var script;
(function (script) {
    // --- get needed html elements
    const selection = document.getElementById("selection");
    const reelContainer = document.querySelector(".reel-container");
    const currentStep = reelContainer ? reelContainer.id : "";
    const name = document.getElementById("name");
    // --- interfaces
    let head = { head: null };
    let body = { body: null };
    let legs = { legs: null };
    // --- create an img element
    function createImgElement(url, part) {
        const imgElem = document.createElement("img");
        imgElem.src = url;
        imgElem.id = part;
        return imgElem;
    }
    // ----- display data from data.ts
    // --- call createImgElement for each img in dataJSON in file data.ts. Append imgElem
    // it's working, even if the linter cries
    function buildPageFromData(buildData) {
        const jsonData = JSON.parse(buildData);
        const currentData = jsonData[currentStep];
        for (const bodyPart in currentData) {
            if (Object.prototype.hasOwnProperty.call(currentData, bodyPart)) {
                const bodyPartImgUrl = currentData[bodyPart];
                const imgElem = createImgElement(bodyPartImgUrl, bodyPart);
                imgElem.classList.add("pic-reel");
                reelContainer.appendChild(imgElem);
            }
        }
    }
    buildPageFromData(script.dataJSON);
    // ----- select, store and show chosen elements
    function selectElem(id) {
        let url = "";
        switch (currentStep) {
            case "heads":
                url = getUrl("heads", id);
                head = { head: url };
                localStorage.setItem("head", url);
                break;
            case "bodies":
                url = getUrl("bodies", id);
                body = { body: url };
                localStorage.setItem("body", url);
                break;
            case "legs":
                url = getUrl("legs", id);
                legs = { legs: url };
                localStorage.setItem("legs", url);
                break;
            default:
                break;
        }
        paint();
    }
    function getUrl(bodyPart, id) {
        const jsonData = JSON.parse(script.dataJSON);
        const selectedUrl = jsonData[bodyPart][id];
        return selectedUrl;
    }
    function showName(name) {
        if (name == "") {
            return;
        }
        selection.classList.add("show");
        const pElem = document.createElement("p");
        pElem.className = "nameOutput";
        selection.appendChild(pElem);
        pElem.innerHTML = name;
    }
    function showSelected(url) {
        if (url == null) {
            return;
        }
        selection.classList.add("show");
        const imgElem = createImgElement(url);
        selection.appendChild(imgElem);
    }
    // --- reads localStorage, calls showSelected
    function paint() {
        selection.innerHTML = "";
        showName(localStorage.getItem("name"));
        showSelected(localStorage.getItem("head"));
        showSelected(localStorage.getItem("body"));
        showSelected(localStorage.getItem("legs"));
    }
    paint();
    const choices = document.querySelectorAll(".pic-reel");
    // --- highlight chosen element
    function highlightSelection(elem) {
        choices.forEach(elem => {
            elem.classList.remove("highlighted");
        });
        elem.classList.add("highlighted");
    }
    // --- eventlistener
    choices.forEach(elem => {
        elem.addEventListener("click", function () {
            selectElem(elem.id);
            highlightSelection(elem);
        });
    });
    if (name != null) {
        name.addEventListener("input", function () {
            let input = name.value;
            localStorage.setItem("name", input);
            paint();
        });
    }
})(script || (script = {}));
//# sourceMappingURL=script.js.map