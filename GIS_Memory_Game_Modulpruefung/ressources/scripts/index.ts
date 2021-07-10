namespace foxMemory {


// ----- HTML Elements -----

    // --- Memory Site ---
    const pairs: HTMLInputElement = <HTMLInputElement>document.getElementById("pairs"); //pairs input
    const startBtn: HTMLElement = document.getElementById("start"); //start button
    const endBtn: HTMLElement = document.getElementById("end"); //aufgeben button

    const memory: HTMLElement = document.getElementById("memory"); //container div for memory cards
    const stopwatch: HTMLElement = document.getElementById("stopwatch"); //container div for stopwatch
    const counter: HTMLElement = document.getElementById("counter"); //container div for ...

    // --- Pop Up ---
    const newGameBtn: HTMLElement = document.getElementById("noSaveNewGame"); //opens with Pop up

    const finalScore: HTMLElement = document.getElementById("finalScore"); // finalScore div
    const amountPairs: HTMLElement = document.getElementById("amountPairs"); // finalScore div
    
    // --- Score Site ---
    const scoreList: HTMLElement = document.getElementById("scoreList"); //container div for ...

    // --- Admin Site ---
    const imgurl: HTMLInputElement = <HTMLInputElement>document.getElementById("imgurl"); //img url input
    const addBtn: HTMLElement = document.getElementById("add"); //hinzufügen button

    const imgs: HTMLElement = document.getElementById("imgs"); //images container



// ----- Global variables -----
    let timer: number;

    let sec: number = 0;
    let min: number = 0;
    let scoreSec: number = 0;

    let strSec: string = "";
    let strMin: string = "";

    //const siteUrl: string = "file:///C:/Users/Anna-Lara%20Buchner/Documents/GitHub/GIS-SoSe-2021/GIS_Memory_Game_Modulpruefung";
    //const url: string = "http://127.0.0.1:8100";
    const url: string = "https://annasgissosse21.herokuapp.com";
    const siteUrl: string = "https://anna-larabuchner.github.io/GIS-SoSe-2021/GIS_Memory_Game_Modulpruefung";

    let openCards: string[][] = [];

    let pairCounter: number = 0;
    let amountOfPairs: number = 0;

    let gameRunning: boolean = false;



// ----- Interfaces -----
    interface IUrlArr {
        [key: string]: string;
        url: string;
    }

    interface IScoreData {
        [key: string]: string;
        pairs: string;
        time: string;
        timeInSec: string;
        player: string;
    }

    interface IMessage {
        success: boolean;
        message: string;
    }

    interface ISetGame {
        success: boolean;
    }



// ----- Event Listener -----
    if (startBtn) {
        startBtn.addEventListener("click", function(): void {
            startGame();
            closePopUp();
        });

        newGameBtn.addEventListener("click", function(): void {
            closePopUp();
            endGame();
        });
    
        endBtn.addEventListener("click", function(): void {
            endGame();
        });
    }

    if (addBtn) {
        addBtn.addEventListener("click", function(): void {
            addUrl();

        });
        displayImgs();
    }

    if (scoreList) {
        const pairNumber: string = localStorage.getItem("pairNumber");
        getList(["pairs", pairNumber]);
        
        const dropdown: HTMLInputElement = <HTMLInputElement>document.getElementById("dropdown");

        // display localStorage pairs in dropdown menu
        dropdown.value = window.localStorage.getItem("pairNumber") ?? "8";

        if (pairNumber === null) {
            getList(["pairs", "8"]);
        }

        dropdown.addEventListener("change", function(): void {
            getList(["pairs", this.value]);
        });
    }



// ----- Functions -----

// --- Start Memory and Render Cards ---
    function startGame(): void {
        if (!gameRunning) {
            gameRunning = true;
            const unknwn: unknown = pairs.value;
            amountOfPairs = <number>unknwn;

            buildPairArray(amountOfPairs);
        }
    }

    function buildPairArray(_amountOfPairs: number): void {
        let pairArray: string[] = [];
        let imgs: string[] = [];

        const imgRawData: Promise<IUrlArr[]> = getImgUrls();
        imgRawData.then(imgRawData => {
            imgRawData.forEach(element => {
                imgs.push(element.url); // <-- fix this!!
            });

            const diff: number = _amountOfPairs - imgs.length;

            if (diff > 0) {
                // if less images in db than needed --> get placeholder images
                for (let index: number = 0; index < diff; index++) {
                    imgs.push(`http://via.placeholder.com/150x150.png?text=${index + 1}`);
                }
            }
            // duplicate every entry in the pairArray array
            pairArray = imgs;
            pairArray = pairArray.slice(0, _amountOfPairs);
            pairArray = pairArray.flatMap(i => [i, i]);
    
            const randomPairArr: string[] = randomizeArr(pairArray);

            renderCards(randomPairArr);
            startTimer();
        });

    }


    function randomizeArr(_arr: string[]): string[] {
        for (let a: number = _arr.length - 1; a > 0; a--) {
          const b: number = Math.floor(Math.random() * (a + 1));
          [_arr[a], _arr[b]] = [_arr[b], _arr[a]];
        }
        return _arr;
    }


    function renderCards(_pairArray: string[]): void {

        for (let index: number = 0; index < _pairArray.length; index++) {

            const flipCard: HTMLDivElement = document.createElement("div");
            
            flipCard.className = "flipCard";
            flipCard.addEventListener("click", function(): void {
                const flipBody: HTMLElement = this.querySelector(".flipCardBody");
                const card: HTMLImageElement = this.querySelector(".flipCardFront");

                if (openCards.length < 2 && !flipBody.classList.contains("rotate")) {
                    openCards.push([card.id, card.src]);
                    flipBody.classList.add("rotate");
                    checkCards();
                }
            });

            const body: HTMLDivElement = document.createElement("div");
            body.className = "flipCardBody";

            const front: HTMLImageElement = document.createElement("img");
            front.src = _pairArray[index];
            front.className = "flipCardFront";
            front.id = `${index}`;

            const back: HTMLImageElement = document.createElement("img");
            back.src = "ressources/img/back.jpg";
            back.className = "flipCardBack";
            
            memory.appendChild(flipCard);
            flipCard.appendChild(body);
            body.appendChild(front);
            body.appendChild(back);
        }
    }


// --- Memory Functionality ---
    function checkCards(): void {
        if (openCards.length < 2) {
            return;
        }

        if (openCards[0][1] === openCards[1][1]) {
            // correct!
            foundPair();
        } else {
            // wrong!
            flipCardsBack();
        }
    }


    function foundPair(): void {
        pairCounter += 1;
        counter.innerHTML = `${pairCounter}`;

        setTimeout(() => {
            const firstCard: HTMLElement = document.getElementById(openCards[0][0]);
            firstCard.parentElement.parentElement.classList.add("hideVisually");
            const secondCard: HTMLElement = document.getElementById(openCards[1][0]);
            secondCard.parentElement.parentElement.classList.add("hideVisually");
            openCards = [];
        }, 1000);


        if (pairCounter >= amountOfPairs) {
            wonGame();
        }
    }


    function flipCardsBack(): void {
        setTimeout(() => {
            openCards = [];
            document.querySelectorAll(".rotate").forEach((card) => {
                card.classList.remove("rotate");
            });
        }, 1000);
    }

    
// --- Timer Functions ---
    function startTimer(): void {
        sec = sec + 1;
        scoreSec += 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            endGame(); // maybe we should call an ambulance?!
        }

        let uSec: unknown = <unknown>sec;
        let uMin: unknown = <unknown>min;
        strSec = <string>uSec;
        strMin = <string>uMin;

        if (sec < 10 || sec == 0) {
            strSec = "0" + <string>uSec;
        } 
        if (min < 10 || min == 0) {
            strMin = "0" + <string>uMin;
        }


        stopwatch.innerHTML = strMin + ":" + strSec;
        timer = window.setTimeout(startTimer, 1000);
    }

    
    function endTimer(): void {
        clearTimeout(timer);
        sec = 0;
        min = 0;

        strSec = "";
        strMin = "";
        stopwatch.innerHTML = "00:00";
    }


// --- Game Won ---
    function wonGame(): void {
        console.log("won!");
        const playTime: number = scoreSec;
        const readableTime: string = stopwatch.innerHTML;
        endTimer();
        gameRunning = false;
        setTimeout(() => {
            openPopUp(); 
            memory.innerHTML = "";
            finalScore.innerHTML = readableTime;
            amountPairs.innerHTML = `${pairCounter}`;

            const save: HTMLElement = document.getElementById("save");
            save.addEventListener("click", function(): void {
                saveGameInDb(readableTime, playTime);
            });
        }, 1300);

    }


// --- End Game ---
    function endGame(): void {
        memory.innerHTML = "";
        counter.innerHTML = "00";
        pairCounter = 0;
        amountOfPairs = 0;
        gameRunning = false;
        endTimer();
    }


// --- Pop Up Functions ---
    function openPopUp(): void {
        document.querySelector(".popUpBg").classList.remove("hidden");
    }


    function closePopUp(): void {
        const popUp: HTMLElement = document.querySelector(".popUpBg");
        if (!popUp.classList.contains("hidden")) {
            popUp.classList.add("hidden");
        }
    }

// --- Display Score List ---
    function displayList(_array: IScoreData[], _pairArray: string[]): void {

        const scorePairs: HTMLElement = document.getElementById("scorePairs");
        const p: HTMLParagraphElement = document.createElement("p");
        p.innerHTML = "für " + (_pairArray[1] ?? 8) + " Paare";
        scorePairs.innerHTML = "";
        scoreList.innerHTML = "";
        scorePairs.appendChild(p);

        for (const key in _array) {
            if (Object.prototype.hasOwnProperty.call(_array, key)) {

                const data: IScoreData = _array[key];

                const container: HTMLDivElement = document.createElement("div");
                container.className = "scoreRow";

                const rank: HTMLSpanElement = document.createElement("span");
                const ranking: number = Number(key) + 1;
                rank.innerHTML = `${ranking}` + ".";
                rank.className = "singelElem";
                const playerSpan: HTMLSpanElement = document.createElement("span");
                playerSpan.innerHTML = data.player;
                playerSpan.className = "singelElem";
                const timeSpan: HTMLSpanElement = document.createElement("span");
                timeSpan.innerHTML = data.time;
                timeSpan.className = "singelElem"; 

                scoreList.appendChild(container);
                container.appendChild(rank);
                container.appendChild(playerSpan);
                container.appendChild(timeSpan);
            }
        }
    }


// ----- Display Images current in DB -----
    function displayImgs(): void {

        const images: Promise<IUrlArr[]> = getImgUrls();
        images.then(images => {
            let key: keyof typeof images;
            for (key in images) {
                if (Object.prototype.hasOwnProperty.call(images, key)) {
                    const imgurl: IUrlArr = images[key]; 
                    const div: HTMLDivElement = document.createElement("div");
                    div.className = "imgContainer";
                    const img: HTMLImageElement = document.createElement("img");
                    img.src = imgurl.url;
                    img.className = "img";
                    img.onclick = () => {
                        const url: string = img.src;
                        deleteImageByUrl(url);
                        img.parentElement.remove();
                    };
                    div.appendChild(img);
                    imgs.appendChild(div);
                }
            }
        });  
    }


// ----- DB Calls -----
    async function saveGameInDb(_readableTime: string, _time: number): Promise<void> {
        const playerInput: HTMLInputElement = <HTMLInputElement>document.getElementById("player");
        const player: string = playerInput.value;
        const unkwnTime: unknown = _time;
        const strTime: string = <string>unkwnTime;
        const unkwnPairs: unknown = amountOfPairs;
        const strPairs: string = <string>unkwnPairs;

        const arr: object = {"pairs": strPairs, "time": _readableTime, "timeInSec": strTime, "player": player};
        const saveUrl: string = url + "/save";

        const response: Response = await fetch(saveUrl, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify(arr)
        });

        const respJson: ISetGame = await response.json();
        if (respJson.success === true) {
            localStorage.setItem("pairNumber", strPairs);
            window.location.href = siteUrl + "/score.html";
        }        
    }


    async function getList(pairArr: string[]): Promise<void> {
        const arr: string[][] = [pairArr];
        const query: URLSearchParams = new URLSearchParams(arr);

        const listUrl: string = url + "/list?" + query.toString();
        const response: Response = await fetch(listUrl);
        const respJson: IScoreData[] = await response.json();

        displayList(respJson, pairArr);
    }


    async function addUrl(): Promise<void> {
        const urlToAdd: string = imgurl.value; //<-- fix this!

        const urlStart: string = imgurl.value.slice(0, 4);

        if (urlStart.toLowerCase() !== "http") {
            const urlErrors: HTMLElement = document.querySelector(".urlErrors");
            urlErrors.innerHTML = "Bitte verwende eine korrekte URL.";
            urlErrors.classList.remove("hidden");
            return;
        }

        const addUrl: string = url + "/imgs"; 

        const response: Response = await fetch(addUrl, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "url": urlToAdd
            })
        });

        const respJson: IMessage = await response.json();

        console.log(respJson);

        if (respJson.success === true) {
            imgurl.value = "";
            window.location.reload();
        } else if (respJson.success === false) {
            const urlErrors: HTMLElement = document.querySelector(".urlErrors");
            urlErrors.innerHTML = respJson.message;
            urlErrors.classList.remove("hidden");
            return;
        }

    }


    async function getImgUrls(): Promise<IUrlArr[]> {
        const getImgUrl: string = url + "/imgs";
        const response: Response = await fetch(getImgUrl);
        const respArr: IUrlArr[] = await response.json();
        return respArr;
    }


    async function deleteImageByUrl(_urlToDelete: string): Promise<void> {
        const deleteImgUrl: string = url + "/delete?url=" + encodeURIComponent(_urlToDelete);
        fetch(deleteImgUrl);
    }
}