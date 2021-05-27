"use strict";
var index31;
(function (index31) {
    const submit = document.getElementById("submit");
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        sendData();
        clearForm();
    });
    async function sendData() {
        let url = "http://127.0.0.1:8100/";
        const formData = new FormData(document.forms[0]);
        const query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        const response = await fetch(url);
        console.log("response: ", response);
        const respString = await response.url;
        console.log("respString: " + respString);
        print(respString);
    }
    function print(_url) {
        const serverResponse = document.getElementById("serverResponse");
        const p = document.createElement("p");
        serverResponse.className = "response";
        serverResponse.innerHTML = _url;
    }
    function clearForm() {
        const form = document.getElementById("form");
        form.reset();
    }
})(index31 || (index31 = {}));
//# sourceMappingURL=index.js.map