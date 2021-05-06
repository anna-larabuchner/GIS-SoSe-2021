"use strict";
var Aufgabe01;
(function (Aufgabe01) {
    document.addEventListener("DOMContentLoaded", function () {
        const newRec = document.getElementById("newRec");
        const recContainer = document.querySelector(".recContainer");
        const reset = document.getElementById("reset");
        class Rectangle {
            createRandomRec() {
                this.width = Math.floor(Math.random() * 100 + 20);
                this.height = Math.floor(Math.random() * 100 + 20);
            }
            drawRandom(rec) {
                let x = Math.floor(Math.random() * 700);
                let y = Math.floor(Math.random() * 300 + 100);
                let recDiv = document.createElement("div");
                recDiv.style.width = rec.width + "px";
                recDiv.style.height = rec.height + "px";
                recDiv.style.top = y + "px";
                recDiv.style.left = x + "px";
                recDiv.style.position = "absolute";
                recDiv.style.backgroundColor = "rgba(139, 0, 0, 0.7)";
                recContainer.appendChild(recDiv);
            }
        }
        function addNewRec() {
            let rec = new Rectangle();
            rec.createRandomRec();
            rec.drawRandom(rec);
        }
        function clearRecContainer() {
            recContainer.innerHTML = "";
        }
        newRec.addEventListener("click", addNewRec);
        reset.addEventListener("click", clearRecContainer);
    });
})(Aufgabe01 || (Aufgabe01 = {}));
//# sourceMappingURL=01-Aufgabe.js.map