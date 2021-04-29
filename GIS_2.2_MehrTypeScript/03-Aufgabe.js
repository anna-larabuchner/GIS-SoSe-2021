"use strict";
var Aufgabe03;
(function (Aufgabe03) {
    // ---- Aufgabe 3 - Endlich was visuelles! ----
    //a)
    let canvas = document.getElementById("canvas01");
    let context = canvas.getContext("2d");
    context.lineWidth = 10;
    // house
    context.strokeRect(75, 140, 150, 110);
    context.fillRect(130, 190, 40, 60);
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.stroke();
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
            let x = Math.floor(Math.random() * 500);
            let y = Math.floor(Math.random() * 500);
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
    let rectangles = new Array();
    rectangles = [r4, r5, r6];
    rectangles.forEach(rec => rec.drawRandom());
    // f)
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    setTimeout(clear, 2000);
})(Aufgabe03 || (Aufgabe03 = {}));
//# sourceMappingURL=03-Aufgabe.js.map