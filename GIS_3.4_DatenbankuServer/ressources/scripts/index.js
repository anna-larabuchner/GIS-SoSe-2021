"use strict";
var index34;
(function (index34) {
    // ----- HTML Elemente -----
    const set = document.getElementById("set");
    const get = document.getElementById("get");
    const serverResponse = document.getElementById("serverResponse");
    // ----- Event Listener -----
    set.addEventListener("click", function (e) {
        e.preventDefault();
        callServer("set");
        clearForm();
    });
    get.addEventListener("click", function (e) {
        e.preventDefault();
        callServer("get");
        clearForm();
    });
    // ----- async server call -----
    async function callServer(_pathType) {
        let url = "";
        const formData = new FormData(document.forms[0]);
        const query = new URLSearchParams(formData);
        if (_pathType == "get") {
            url = "http://127.0.0.1:8100/get" /*+ "?" + query.toString()*/;
            const response = await fetch(url);
            //console.log("response: ", response);
            const respArr = await response.json();
            //console.log("respArr: ", respArr);
            print(respArr);
        }
        else if (_pathType == "set") {
            clearResponse();
            url = "http://127.0.0.1:8100/set" + "?" + query.toString();
            const response = await fetch(url);
            const receivedStr = await response.json();
            console.log(receivedStr);
        }
    }
    // ----- visible changes in html -----
    function print(_jsonArr) {
        serverResponse.className = "response";
        for (const key in _jsonArr) {
            if (Object.prototype.hasOwnProperty.call(_jsonArr, key)) {
                const entry = _jsonArr[key];
                const container = document.createElement("div");
                container.className = "container";
                const div = document.createElement("div");
                div.className = "entry";
                const del = document.createElement("button");
                del.className = "delete";
                del.innerHTML = "Delet Entry";
                let id;
                for (const lineKey in entry) {
                    if (Object.prototype.hasOwnProperty.call(entry, lineKey)) {
                        if (lineKey != "_id") {
                            id = entry["_id"];
                            const lineValue = entry[lineKey];
                            //console.log(lineValue);
                            const pElem = document.createElement("p");
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
    function addListener() {
        console.log("in addListener()");
        const buttons = document.querySelectorAll(".delete");
        buttons.forEach(button => {
            console.log("in forEach()");
            button.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("event listener added");
                callToDelete(button.id);
            });
        });
    }
    // ----- server call to delete one entry -----
    function callToDelete(_id) {
        const query = new URLSearchParams(_id);
        const url = "http://127.0.0.1:8100/delete" + "?" + query.toString();
        fetch(url);
    }
    // ----- clean up -----
    function clearResponse() {
        serverResponse.classList.remove("response");
        serverResponse.innerHTML = "";
    }
    function clearForm() {
        const form = document.getElementById("form");
        form.reset();
    }
})(index34 || (index34 = {}));
//# sourceMappingURL=index.js.map