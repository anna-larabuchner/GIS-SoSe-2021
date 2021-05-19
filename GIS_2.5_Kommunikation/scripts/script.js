"use strict";
var script25;
(function (script25) {
    // --- get needed html elements
    const selection = document.getElementById("selection");
    const reelContainer = document.querySelector(".reel-container");
    const currentStep = reelContainer ? reelContainer.id : "";
    const name = document.getElementById("name");
    const herokuapp = document.getElementById("herokuapp");
    // --- fetch JSON, build Interface, call buildPageFromData
    let data;
    async function getData(_url) {
        const response = await fetch(_url);
        const respData = await response.json();
        data = respData;
        buildPageFromData(respData);
    }
    getData("https://anna-larabuchner.github.io/GIS-SoSe-2021/GIS_2.5_Kommunikation/scripts/data.json");
    // --- create an img element
    function createImgElement(url, part) {
        const imgElem = document.createElement("img");
        imgElem.src = url;
        imgElem.id = part;
        return imgElem;
    }
    // ----- display data from getData()
    // --- call createImgElement for each img in buildData. Append imgElem, handle eventlistener and highlight function
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
    }
    // ----- select, store and show chosen elements
    function selectElem(_id) {
        const id = Number(_id);
        let url = "";
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
    function getUrl(bodyPart, id) {
        const selectedUrl = data[bodyPart][id];
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
        if (herokuapp) {
            callHeroku("https://gis-communication.herokuapp.com");
            async function callHeroku(_url) {
                const wichtel = { name: sessionStorage.getItem("name"), head: sessionStorage.getItem("head"), body: sessionStorage.getItem("body"), legs: sessionStorage.getItem("legs") };
                let query = new URLSearchParams(wichtel);
                _url = _url + "?" + query.toString();
                const response = await fetch(_url);
                const respString = await response.json();
                console.log(respString);
                const p = document.createElement("p");
                const h3 = document.createElement("h3");
                herokuapp.className = "response";
                herokuapp.appendChild(h3);
                h3.innerHTML = "Server Response:";
                herokuapp.appendChild(p);
                if (respString.error) {
                    p.className = "error";
                    p.innerHTML = respString.error;
                }
                else {
                    p.className = "success";
                    p.innerHTML = respString.message;
                }
            }
        }
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
    if (name != null) {
        name.addEventListener("input", function () {
            let input = name.value;
            sessionStorage.setItem("name", input);
            paint();
        });
    }
})(script25 || (script25 = {}));
//# sourceMappingURL=script.js.map