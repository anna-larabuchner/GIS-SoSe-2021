"use strict";
var index32;
(function (index32) {
    // ----- HTML Elemente -----
    const html = document.getElementById("html");
    const json = document.getElementById("json");
    const serverResponse = document.getElementById("serverResponse");
    // ----- Event Listener -----
    html.addEventListener("click", function (e) {
        e.preventDefault();
        callServer("html");
        clearForm();
    });
    json.addEventListener("click", function (e) {
        e.preventDefault();
        callServer("json");
        clearForm();
    });
    // ----- async server call -----
    async function callServer(_pathType) {
        let url = "";
        const formData = new FormData(document.forms[0]);
        const query = new URLSearchParams(formData);
        if (_pathType == "html") {
            url = "http://127.0.0.1:8100/html" + "?" + query.toString();
            const response = await fetch(url);
            const respString = await response.text();
            print(respString);
        }
        else {
            clearResponse();
            url = "http://127.0.0.1:8100/json" + "?" + query.toString();
            const response = await fetch(url);
            const receivedObj = await response.json();
            console.log(receivedObj);
        }
    }
    // ----- visible changes in html -----
    function print(_url) {
        serverResponse.className = "response";
        serverResponse.innerHTML = _url;
    }
    function clearResponse() {
        serverResponse.classList.remove("response");
        serverResponse.innerHTML = "";
    }
    function clearForm() {
        const form = document.getElementById("form");
        form.reset();
    }
})(index32 || (index32 = {}));
//# sourceMappingURL=index.js.map