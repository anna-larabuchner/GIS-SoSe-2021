namespace Aufgabe01 {
    document.addEventListener("DOMContentLoaded", function (): void {
        
        const newRec: HTMLElement = document.getElementById("newRec");
        const recContainer: HTMLElement = document.querySelector(".recContainer");
        const reset: HTMLElement = document.getElementById("reset");

        class Rectangle {
            width: number;
            height: number;

            createRandomRec(): void {
                this.width = Math.floor(Math.random() * 100 + 20);
                this.height = Math.floor(Math.random() * 100 + 20);
            }

            drawRandom(rec: Rectangle): void {
                let x: number = Math.floor(Math.random() * 700);
                let y: number = Math.floor(Math.random() * 300 + 100);
                let recDiv: HTMLDivElement  = document.createElement("div");
                recDiv.style.width = rec.width + "px";
                recDiv.style.height = rec.height + "px";
                recDiv.style.top = y + "px";
                recDiv.style.left = x + "px";
                recDiv.style.position = "absolute";
                recDiv.style.backgroundColor = "rgba(139, 0, 0, 0.7)";
                recContainer.appendChild(recDiv);
            }
        }

        function addNewRec(): void {
            let rec: Rectangle = new Rectangle();
            rec.createRandomRec();
            rec.drawRandom(rec);
        }

        function clearRecContainer(): void {
            recContainer.innerHTML = "";
        }

        newRec.addEventListener("click", addNewRec);
        reset.addEventListener("click", clearRecContainer);
        
    });
}