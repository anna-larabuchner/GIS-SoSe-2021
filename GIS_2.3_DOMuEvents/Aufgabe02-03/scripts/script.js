"use strict";
var script;
(function (script) {
    // --- get needed html elements
    //const create: HTMLElement = document.getElementById("create");
    //const goOn: HTMLElement = document.getElementById("go-on");
    const reelContainer = document.querySelector(".reel-container");
    const currentStep = reelContainer.id;
    //const navElems: NodeListOf<HTMLElement> = document.querySelector("#nav-elems");
    /*console.log(data);
    console.log(data.heads);*/
    // --- create img elements for each img in object data in heads in file data.ts
    // it's working, even if the linter cries
    for (const key in data.heads) {
        const imgElem = document.createElement("img");
        imgElem.src = data.heads[key];
        imgElem.className = "pic-reel";
        imgElem.id = key;
        reelContainer.appendChild(imgElem);
    }
    const selections = document.querySelectorAll(".pic-reel");
    // create new empty person
    let person = new Person();
    function selectElem(id) {
        switch (currentStep) {
            case "heads":
                person.setHead(id);
                break;
            case "bodies":
                person.setBody(id);
                break;
            case "legs":
                person.setLegs(id);
                break;
            default:
                break;
        }
        // Geben Sie die Variable, in der die Auswahl gespeichert ist, auf der Konsole aus
        console.log(person);
    }
    function highlightSelection(elem) {
        selections.forEach(elem => {
            elem.style.border = "4px solid transparent";
            elem.style.boxShadow = "2px 3px 7px rgba(0, 0, 0, 0.3)";
        });
        elem.style.border = "4px solid #000";
        elem.style.boxShadow = "3px 4px 7px rgba(0, 0, 0, 0.7)";
    }
    selections.forEach(elem => {
        console.log(elem);
        console.log(elem.id);
        elem.addEventListener("click", function () {
            selectElem(elem.id);
            highlightSelection(elem);
        });
    });
    //create.addEventListener("click", createPerson);
})(script || (script = {}));
//# sourceMappingURL=script.js.map