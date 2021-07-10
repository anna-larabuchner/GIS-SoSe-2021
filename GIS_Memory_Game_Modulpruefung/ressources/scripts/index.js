"use strict";
var foxMemory;
(function (foxMemory) {
    // ----- HTML Elements -----
    const pairs = document.getElementById("pairs"); //pairs input
    const startBtn = document.getElementById("start"); //start button
    const endBtn = document.getElementById("end"); //aufgeben button
    const newGameBtn = document.getElementById("noSaveNewGame"); //opens with Pop up
    const memory = document.getElementById("memory"); //container div for memory cards
    const stopwatch = document.getElementById("stopwatch"); //container div for stopwatch
    const counter = document.getElementById("counter"); //container div for ...
    const finalScore = document.getElementById("finalScore"); // finalScore div
    const amountPairs = document.getElementById("amountPairs"); // finalScore div
    const scoreList = document.getElementById("scoreList"); //container div for ...
    const imgurl = document.getElementById("imgurl"); //img url input
    const addBtn = document.getElementById("add"); //hinzufügen button
    const imgs = document.getElementById("imgs"); //images container
    // ----- Global variables -----
    let timer;
    let sec = 0;
    let min = 0;
    let scoreSec = 0;
    let strSec = "";
    let strMin = "";
    let localUrl = "file:///C:/Users/Anna-Lara%20Buchner/Documents/GitHub/GIS-SoSe-2021/GIS_Memory_Game";
    let url = "http://127.0.0.1:8100";
    //let url: string = "https://annasgissosse21.herokuapp.com;
    let openCards = [];
    let pairCounter = 0;
    let amountOfPairs = 0;
    let gameRunning = false;
    // ----- Event Listener -----
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            startGame();
            closePopUp();
        });
        newGameBtn.addEventListener("click", function () {
            closePopUp();
            endGame();
        });
        endBtn.addEventListener("click", function () {
            endGame();
        });
    }
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            addUrl();
        });
        displayImgs();
    }
    if (scoreList) {
        const pairNumber = localStorage.getItem("pairNumber");
        getList(["pairs", pairNumber]);
        const dropdown = document.getElementById("dropdown");
        // display localStorage pairs in dropdown menu
        dropdown.value = window.localStorage.getItem("pairNumber") ?? "8";
        if (pairNumber === null) {
            getList(["pairs", "8"]);
        }
        dropdown.addEventListener("change", function () {
            getList(["pairs", this.value]);
        });
    }
    // ----- Functions -----
    // --- Start Memory and Render Cards ---
    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            const unknwn = pairs.value;
            amountOfPairs = unknwn;
            buildPairArray(amountOfPairs);
        }
    }
    function buildPairArray(_amountOfPairs) {
        let pairArray = [];
        let imgs = [];
        const imgRawData = getImgUrls();
        imgRawData.then(imgRawData => {
            imgRawData.forEach(element => {
                imgs.push(element.url); // <-- fix this!!
            });
            const diff = _amountOfPairs - imgs.length;
            if (diff > 0) {
                // if less images in db than needed --> get placeholder images
                for (let index = 0; index < diff; index++) {
                    imgs.push(`http://via.placeholder.com/150x150.png?text=${index + 1}`);
                }
            }
            // duplicate every entry in the pairArray array
            pairArray = imgs;
            pairArray = pairArray.slice(0, _amountOfPairs);
            pairArray = pairArray.flatMap(i => [i, i]);
            const randomPairArr = randomizeArr(pairArray);
            renderCards(randomPairArr);
            startTimer();
        });
    }
    function randomizeArr(_arr) {
        for (let a = _arr.length - 1; a > 0; a--) {
            const b = Math.floor(Math.random() * (a + 1));
            [_arr[a], _arr[b]] = [_arr[b], _arr[a]];
        }
        return _arr;
    }
    function renderCards(_pairArray) {
        for (let index = 0; index < _pairArray.length; index++) {
            const flipCard = document.createElement("div");
            flipCard.className = "flipCard";
            flipCard.addEventListener("click", function () {
                const flipBody = this.querySelector(".flipCardBody");
                const card = this.querySelector(".flipCardFront");
                if (openCards.length < 2 && !flipBody.classList.contains("rotate")) {
                    openCards.push([card.id, card.src]);
                    flipBody.classList.add("rotate");
                    checkCards();
                }
            });
            const body = document.createElement("div");
            body.className = "flipCardBody";
            const front = document.createElement("img");
            front.src = _pairArray[index];
            front.className = "flipCardFront";
            front.id = `${index}`;
            const back = document.createElement("img");
            back.src = "ressources/img/back.jpg";
            back.className = "flipCardBack";
            memory.appendChild(flipCard);
            flipCard.appendChild(body);
            body.appendChild(front);
            body.appendChild(back);
        }
    }
    // --- Memory Functionality ---
    function checkCards() {
        if (openCards.length < 2) {
            return;
        }
        if (openCards[0][1] === openCards[1][1]) {
            // correct!
            foundPair();
        }
        else {
            // wrong!
            flipCardsBack();
        }
    }
    function foundPair() {
        pairCounter += 1;
        counter.innerHTML = `${pairCounter}`;
        setTimeout(() => {
            const firstCard = document.getElementById(openCards[0][0]);
            firstCard.parentElement.parentElement.classList.add("hideVisually");
            const secondCard = document.getElementById(openCards[1][0]);
            secondCard.parentElement.parentElement.classList.add("hideVisually");
            openCards = [];
        }, 1000);
        if (pairCounter >= amountOfPairs) {
            wonGame();
        }
    }
    function flipCardsBack() {
        setTimeout(() => {
            openCards = [];
            document.querySelectorAll(".rotate").forEach((card) => {
                card.classList.remove("rotate");
            });
        }, 1000);
    }
    // --- Timer Functions ---
    function startTimer() {
        sec = sec + 1;
        scoreSec += 1;
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            endGame(); // maybe we should call an ambulance?!
        }
        let uSec = sec;
        let uMin = min;
        strSec = uSec;
        strMin = uMin;
        if (sec < 10 || sec == 0) {
            strSec = "0" + uSec;
        }
        if (min < 10 || min == 0) {
            strMin = "0" + uMin;
        }
        stopwatch.innerHTML = strMin + ":" + strSec;
        timer = window.setTimeout(startTimer, 1000);
    }
    function endTimer() {
        clearTimeout(timer);
        sec = 0;
        min = 0;
        strSec = "";
        strMin = "";
        stopwatch.innerHTML = "00:00";
    }
    // --- Game Won ---
    function wonGame() {
        console.log("won!");
        const playTime = scoreSec;
        const readableTime = stopwatch.innerHTML;
        endTimer();
        gameRunning = false;
        setTimeout(() => {
            openPopUp();
            memory.innerHTML = "";
            finalScore.innerHTML = readableTime;
            amountPairs.innerHTML = `${pairCounter}`;
            const save = document.getElementById("save");
            save.addEventListener("click", function () {
                saveGameInDb(readableTime, playTime);
            });
        }, 1300);
    }
    // --- End Game ---
    function endGame() {
        memory.innerHTML = "";
        counter.innerHTML = "00";
        pairCounter = 0;
        amountOfPairs = 0;
        gameRunning = false;
        endTimer();
    }
    // --- Pop Up Functions ---
    function openPopUp() {
        document.querySelector(".popUpBg").classList.remove("hidden");
    }
    function closePopUp() {
        const popUp = document.querySelector(".popUpBg");
        if (!popUp.classList.contains("hidden")) {
            popUp.classList.add("hidden");
        }
    }
    // --- Display Score List ---
    function displayList(_array, _pairArray) {
        const scorePairs = document.getElementById("scorePairs");
        const p = document.createElement("p");
        p.innerHTML = "für " + (_pairArray[1] ?? 8) + " Paare";
        scorePairs.innerHTML = "";
        scoreList.innerHTML = "";
        scorePairs.appendChild(p);
        for (const key in _array) {
            if (Object.prototype.hasOwnProperty.call(_array, key)) {
                const data = _array[key];
                const container = document.createElement("div");
                container.className = "scoreRow";
                const rank = document.createElement("span");
                const ranking = Number(key) + 1;
                rank.innerHTML = `${ranking}` + ".";
                rank.className = "singelElem";
                const playerSpan = document.createElement("span");
                playerSpan.innerHTML = data.player;
                playerSpan.className = "singelElem";
                const timeSpan = document.createElement("span");
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
    function displayImgs() {
        const images = getImgUrls();
        images.then(images => {
            let key;
            for (key in images) {
                if (Object.prototype.hasOwnProperty.call(images, key)) {
                    const imgurl = images[key];
                    const div = document.createElement("div");
                    div.className = "imgContainer";
                    const img = document.createElement("img");
                    img.src = imgurl.url;
                    img.className = "img";
                    img.onclick = () => {
                        const url = img.src;
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
    function saveGameInDb(_readableTime, _time) {
        const playerInput = document.getElementById("player");
        const player = playerInput.value;
        const unkwnTime = _time;
        const strTime = unkwnTime;
        const unkwnPairs = amountOfPairs;
        const strPairs = unkwnPairs;
        const arr = [["pairs", strPairs], ["time", _readableTime], ["timeInSec", strTime], ["player", player]];
        const query = new URLSearchParams(arr);
        const saveUrl = url + "/save?" + query.toString();
        fetch(saveUrl).then(() => {
            localStorage.setItem("pairNumber", strPairs);
            window.location.href = localUrl + "/score.html";
        });
    }
    async function getList(pairArr) {
        const arr = [pairArr];
        const query = new URLSearchParams(arr);
        const listUrl = url + "/list?" + query.toString();
        const response = await fetch(listUrl);
        const respArr = await response.json();
        displayList(respArr, pairArr);
    }
    async function addUrl() {
        const urlToAdd = imgurl.value; //<-- fix this!
        const urlStart = imgurl.value.slice(0, 4);
        if (urlStart.toLowerCase() !== "http") {
            const urlErrors = document.querySelector(".urlErrors");
            urlErrors.innerHTML = "Bitte verwende eine korrekte URL.";
            urlErrors.classList.remove("hidden");
            return;
        }
        const addUrl = url + "/add?url=" + encodeURIComponent(urlToAdd);
        const response = await fetch(addUrl);
        const respStr = await response.json();
        if (respStr) {
            if (respStr.message !== "success" && typeof respStr.message != "undefined") {
                const urlErrors = document.querySelector(".urlErrors");
                urlErrors.innerHTML = respStr.message;
                urlErrors.classList.remove("hidden");
                return;
            }
            imgurl.value = "";
            window.location.reload();
        }
    }
    async function getImgUrls() {
        const getImgUrl = url + "/imgs";
        const response = await fetch(getImgUrl);
        const respArr = await response.json();
        return respArr;
    }
    async function deleteImageByUrl(_urlToDelete) {
        const deleteImgUrl = url + "/delete?url=" + encodeURIComponent(_urlToDelete);
        fetch(deleteImgUrl);
    }
})(foxMemory || (foxMemory = {}));
//# sourceMappingURL=index.js.map