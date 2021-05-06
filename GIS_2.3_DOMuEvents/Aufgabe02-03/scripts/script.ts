namespace script {

    // --- get needed html elements
    //const create: HTMLElement = document.getElementById("create");
    //const goOn: HTMLElement = document.getElementById("go-on");
    const reelContainer: HTMLElement = document.querySelector(".reel-container");
    const currentStep: string = reelContainer.id;
    //const navElems: NodeListOf<HTMLElement> = document.querySelector("#nav-elems");

    /*console.log(data);
    console.log(data.heads);*/

    // --- create img elements for each img in object data in heads in file data.ts
    // it's working, even if the linter cries
    for (const key in data.heads) {
        const imgElem: HTMLImageElement = document.createElement("img");
        imgElem.src = data.heads[key]; 
        imgElem.className = "pic-reel";
        imgElem.id = key;
        reelContainer.appendChild(imgElem);
    }
    const selections: NodeListOf<HTMLElement> = document.querySelectorAll(".pic-reel");

    // create new empty person
    let person: Person = new Person();

    function selectElem (id: string): void {
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

    function highlightSelection(elem: HTMLElement): void {
        selections.forEach(elem => {
            elem.style.border = "4px solid transparent";
            elem.style.boxShadow = "2px 3px 7px rgba(0, 0, 0, 0.3)";
        });

        elem.style.border = "4px solid #000";
        elem.style.boxShadow = "3px 4px 7px rgba(0, 0, 0, 0.7)";
    }

    selections.forEach(elem => {
        elem.addEventListener("click", function(): void {
            selectElem(elem.id);
            highlightSelection(elem);
        });
    });

    //create.addEventListener("click", createPerson);
}

