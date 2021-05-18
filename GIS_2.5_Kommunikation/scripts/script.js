"use strict";
var script;
(function (script) {
    // --- get needed html elements
    const selection = document.getElementById("selection");
    const reelContainer = document.querySelector(".reel-container");
    const currentStep = reelContainer ? reelContainer.id : "";
    const name = document.getElementById("name");
    // --- JSON to interface
    const jsonData = JSON.parse(script.dataJSON);
    // --- create an img element
    function createImgElement(url, part) {
        const imgElem = document.createElement("img");
        imgElem.src = url;
        imgElem.id = part;
        return imgElem;
    }
    // ----- display data from data.ts
    // --- call createImgElement for each img in jsonData. Append imgElem
    function buildPageFromData(buildData) {
        const currentData = buildData[currentStep];
        for (const bodyPart in currentData) {
            if (Object.prototype.hasOwnProperty.call(currentData, bodyPart)) {
                const bodyPartImgUrl = currentData[bodyPart];
                const imgElem = createImgElement(bodyPartImgUrl, bodyPart);
                imgElem.classList.add("picture");
                reelContainer.appendChild(imgElem);
            }
        }
    }
    buildPageFromData(jsonData);
    // ----- select, store and show chosen elements
    function selectElem(id) {
        const picId = Number(id);
        let url = "";
        switch (currentStep) {
            case "heads":
                url = getUrl("heads", picId);
                sessionStorage.setItem("head", url);
                break;
            case "bodies":
                url = getUrl("bodies", picId);
                sessionStorage.setItem("body", url);
                break;
            case "legs":
                url = getUrl("legs", picId);
                sessionStorage.setItem("legs", url);
                break;
            default:
                break;
        }
        paint();
    }
    function getUrl(bodyPart, id) {
        const selectedUrl = jsonData[bodyPart][id];
        return selectedUrl;
    }
    function showName(name) {
        if (!name) {
            return;
        }
        selection.classList.add("show");
        // create div container for p tag
        const pDiv = document.createElement("div");
        pDiv.className = "nameContainer";
        // create p tag
        const pElem = document.createElement("p");
        pElem.className = "nameOutput";
        // append
        selection.appendChild(pDiv);
        pDiv.appendChild(pElem);
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
    // --- reads sessionStorage, calls showSelected
    function paint() {
        selection.innerHTML = "";
        showName(sessionStorage.getItem("name"));
        showSelected(sessionStorage.getItem("head"));
        showSelected(sessionStorage.getItem("body"));
        showSelected(sessionStorage.getItem("legs"));
    }
    paint();
    // ----- END display data
    const choices = document.querySelectorAll(".picture");
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
            sessionStorage.setItem("name", input);
            paint();
        });
    }
})(script || (script = {}));
//# sourceMappingURL=script.js.map