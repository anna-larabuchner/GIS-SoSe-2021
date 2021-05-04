"use strict";
var Aufgabe03;
(function (Aufgabe03) {
    // ---- Aufgabe 3 - Endlich was visuelles! ----
    document.addEventListener("DOMContentLoaded", function () {
        //a)
        let canvas = document.getElementById("canvas01");
        let context = canvas.getContext("2d");
        context.lineWidth = 10;
        // sun
        context.beginPath();
        context.arc(540, 150, 50, 0, 2 * Math.PI, false);
        context.fillStyle = "#ffff00";
        context.fill();
        // bright gras
        context.beginPath();
        context.moveTo(0, 600);
        context.lineTo(0, 450);
        context.lineTo(800, 450);
        context.lineTo(800, 600);
        context.closePath();
        context.strokeStyle = "#dcedc1";
        context.fillStyle = "#dcedc1";
        context.fill();
        // darker green
        context.beginPath();
        context.moveTo(0, 450);
        context.lineTo(0, 400);
        context.lineTo(800, 400);
        context.lineTo(800, 450);
        context.closePath();
        context.strokeStyle = "#065535";
        context.fillStyle = "#065535";
        context.fill();
        // first hill
        context.beginPath();
        context.moveTo(0, 400);
        context.quadraticCurveTo(150, 200, 150, 400);
        context.strokeStyle = "#407294";
        context.fillStyle = "#407294";
        context.fill();
        //second hill
        context.beginPath();
        context.moveTo(100, 400);
        context.quadraticCurveTo(250, 50, 300, 400);
        context.strokeStyle = "#407294";
        context.fillStyle = "#407294";
        context.fill();
        // mountain
        context.beginPath();
        context.moveTo(200, 400);
        context.lineTo(450, 100);
        context.lineTo(650, 400);
        context.closePath();
        context.strokeStyle = "#407294";
        context.fillStyle = "#407294";
        context.lineJoin = "round";
        context.stroke();
        context.fill();
        // last, flat hill
        context.beginPath();
        context.moveTo(600, 400);
        context.quadraticCurveTo(650, 300, 800, 400);
        context.strokeStyle = "#407294";
        context.fillStyle = "#407294";
        context.fill();
        // tiny house
        context.beginPath();
        context.rect(240, 395, 50, 35);
        context.fillStyle = "#420420";
        context.fill();
        // door
        context.beginPath();
        context.rect(260, 415, 10, 15);
        context.fillStyle = "black";
        context.fill();
        // roof
        context.beginPath();
        context.moveTo(230, 400);
        context.lineTo(265, 380);
        context.lineTo(300, 400);
        context.fillStyle = "#420420";
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.stroke();
        // lake - left side
        context.beginPath();
        context.moveTo(300, 450);
        context.quadraticCurveTo(250, 475, 300, 500);
        context.fillStyle = "#003366";
        context.fill();
        // upper side
        context.beginPath();
        context.moveTo(310, 450);
        context.quadraticCurveTo(390, 430, 600, 450);
        context.fillStyle = "#003366";
        context.fill();
        // right side
        context.beginPath();
        context.moveTo(600, 450);
        context.quadraticCurveTo(650, 475, 600, 500);
        context.fillStyle = "#003366";
        context.fill();
        // lower side
        context.beginPath();
        context.moveTo(600, 500);
        context.quadraticCurveTo(390, 520, 300, 500);
        context.fillStyle = "#003366";
        context.fill();
        // fill middle
        context.beginPath();
        context.rect(300, 450, 300, 50);
        context.fillStyle = "#003366";
        context.fill();
        //b)
        class Rectangle {
            createRectangle(_width, _height) {
                this.width = _width;
                this.height = _height;
            }
            // c)
            createRandomRec() {
                this.width = Math.floor(Math.random() * 100);
                this.height = Math.floor(Math.random() * 100);
            }
            // d)
            drawRectangle(x, y, fill, color) {
                let c = "#ffc3a0";
                context.beginPath();
                context.rect(x, y, this.width, this.height);
                if (color) {
                    context.fillStyle = color;
                    context.strokeStyle = color;
                }
                else {
                    context.fillStyle = c;
                    context.strokeStyle = c;
                }
                if (fill) {
                    context.fill();
                }
                context.stroke();
            }
            drawRandom() {
                let x = Math.floor(Math.random() * 700);
                let y = Math.floor(Math.random() * 300);
                context.beginPath();
                context.rect(x, y, this.width, this.height);
                context.fillStyle = "#c0c0c0";
                context.strokeStyle = "#c0c0c0";
                context.fill();
                context.stroke();
            }
        }
        const r1 = new Rectangle();
        r1.createRectangle(300, 200);
        r1.drawRectangle(300, 650, true);
        // c)
        const r2 = new Rectangle();
        r2.createRandomRec();
        r2.drawRectangle(20, 700, false);
        // d)
        const r3 = new Rectangle();
        r3.createRandomRec();
        r3.drawRectangle(450, 800, true, "#5ac18e");
        // e)
        const r4 = new Rectangle();
        r4.createRandomRec();
        const r5 = new Rectangle();
        r5.createRandomRec();
        const r6 = new Rectangle();
        r6.createRandomRec();
        // super low poly clouds
        let rectangles = new Array();
        rectangles = [r4, r5, r6];
        rectangles.forEach(rec => rec.drawRandom());
    });
})(Aufgabe03 || (Aufgabe03 = {}));
//# sourceMappingURL=03-Aufgabe.js.map