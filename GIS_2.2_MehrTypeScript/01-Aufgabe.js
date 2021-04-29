"use strict";
var Aufgabe01;
(function (Aufgabe01) {
    // ---- Aufgabe 1 - Mehr “langweilige” Konsolenausgaben ----
    // a)
    console.log("Ergebnis a): " + min(5, 3, 6, 10, 7, 4));
    function min(...nums) {
        let min;
        for (let i = 0; i < nums.length; i++) {
            let val = nums[i];
            if (i === 0) {
                min = val;
            }
            else if (val < min) {
                min = val;
            }
        }
        return min;
    }
    console.log("______________________________________");
    // b)
    console.log("Ergebnis b): " + isEven(-1));
    //console.log("Ergebnis b): " + isEven(50));
    //console.log("Ergebnis b): " + isEven(75));
    function isEven(num) {
        if (num === 0) {
            return true;
        }
        else if (num === 1) {
            return false;
        }
        else if (num < 0) {
            return isEven(-num); // Vorzeichenwechsel für negative Übergabeparameter
        }
        else {
            return isEven(num - 2);
        }
    }
    /* Die Funktion beruht darauf, dass nur für 0 und 1 bekannt ist, ob diese Werte gerade oder ungerade sind. Wird ein anderer Wert als 0 oder 1 übergeben, ruft sich die Funktion mit um 2 sinkendem Wert immer wieder selbst auf.
    So lange, bis num auf 0 oder 1 ist. Für einen negativen Wert trifft weder das erste if noch das erste else if zu und num wird bis zur Erschöpfung um 2 minimiert. Abgefangen werden kann das, in dem Parameter, die kleiner als
    0 sind, einfach "umgedreht" werden. Also ein Vorzeichenwechsel vorgenommen wird. */
    console.log("______________________________________");
    const peter = { name: "Peter", age: 23, course: "MIB", semester: 2 };
    const susi = { name: "Susi", age: 20, course: "OMB", semester: 2 };
    const nele = { name: "Nele", age: 24, course: "MKB", semester: 3 };
    const studiArr = [peter, susi, nele, { name: "Max", age: 27, course: "MKB", semester: 2 }];
    console.log("c) 3.: " + studiArr[0].name, studiArr[1].age, studiArr[2].semester, studiArr[3].course);
    showInfo("Peter");
    showInfo("Susi");
    showInfo("Nele");
    function showInfo(name) {
        let student = name.toLowerCase();
        let studentInterf;
        if (student === "peter") {
            studentInterf = peter;
        }
        else if (student === "susi") {
            studentInterf = susi;
        }
        else if (student === "nele") {
            studentInterf = nele;
        }
        else {
            console.log("Student nicht gefunden.");
        }
        console.log(`Name: ${studentInterf.name}\nAlter: ${studentInterf.age}\nStudiengang: ${studentInterf.course}\nSemester: ${studentInterf.semester}`);
    }
    console.log("______________________________________");
    // c2)
    console.log("c) '2'");
    class StudentClass {
        createStudent(_name, _age, _course, _semester) {
            this.name = _name;
            this.age = _age;
            this.course = _course;
            this.semester = _semester;
        }
        showInfo() {
            console.log(`Name: ${this.name}\nAlter: ${this.age}\nStudiengang: ${this.course}\nSemester: ${this.semester}`);
        }
    }
    const s1 = new StudentClass();
    s1.createStudent("Klaus", 21, "MIB", 1);
    s1.showInfo();
    console.log("______________________________________");
})(Aufgabe01 || (Aufgabe01 = {}));
//# sourceMappingURL=01-Aufgabe.js.map