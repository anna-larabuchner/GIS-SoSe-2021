namespace Aufgabe01 {
    // ---- Aufgabe 1 - Mehr “langweilige” Konsolenausgaben ----

    // a)
    console.log("Ergebnis a): " + min(5, 3, 6, 10, 7, 4));
    function min(...nums: number[]): number {
        let min: number;
        for (let i: number = 0; i < nums.length; i++) {
            let val: number = nums[i];
            if (i === 0) {
                min = val;
            } else if (val < min) {
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
    function isEven(num: number): boolean {
        if (num === 0) {
            return true;
        } else if (num === 1) {
            return false;
        } else if (num < 0) {
            return isEven(-num); // Vorzeichenwechsel für negative Übergabeparameter
        } else {
            return isEven(num - 2);
        }
    }
    /* Die Funktion beruht darauf, dass nur für 0 und 1 bekannt ist, ob diese Werte gerade oder ungerade sind. Wird ein anderer Wert als 0 oder 1 übergeben, ruft sich die Funktion mit um 2 sinkendem Wert immer wieder selbst auf. 
    So lange, bis num auf 0 oder 1 ist. Für einen negativen Wert trifft weder das erste if noch das erste else if zu und num wird bis zur Erschöpfung um 2 minimiert. Abgefangen werden kann das, in dem Parameter, die kleiner als 
    0 sind, einfach "umgedreht" werden. Also ein Vorzeichenwechsel vorgenommen wird. */
    console.log("______________________________________");

    // c)
    interface Student {
        name: string;
        age: number;
        course: string;
        semester: number;
    }

    const peter: Student = {name: "Peter", age: 23, course: "MIB", semester: 2};
    const susi: Student = {name: "Susi", age: 20, course: "OMB", semester: 2};
    const nele: Student = {name: "Nele", age: 24, course: "MKB", semester: 3};

    const studiArr: Student[] = [peter, susi, nele, {name: "Max", age: 27, course: "MKB", semester: 2}];

    console.log("c) 3.: " + studiArr[0].name, studiArr[1].age, studiArr[2].semester, studiArr[3].course);

    showInfo("Peter");
    showInfo("Susi");
    showInfo("Nele");
    function showInfo(name: string): void {
        let student: string = name.toLowerCase();
        let studentInterf: Student; 

        if (student === "peter") {
            studentInterf = peter;
        } else if (student === "susi") {
            studentInterf = susi;
        } else if (student === "nele") {
            studentInterf = nele;
        } else {
            console.log("Student nicht gefunden.");
        }
        console.log(`Name: ${studentInterf.name}\nAlter: ${studentInterf.age}\nStudiengang: ${studentInterf.course}\nSemester: ${studentInterf.semester}`);
    }
    console.log("______________________________________");

    // c2)
    console.log("c) '2'");
    
    class StudentClass {
        name: string;
        age: number;
        course: string;
        semester: number;

        createStudent(_name: string, _age: number, _course: string, _semester: number): void {
            this.name = _name;
            this.age = _age;
            this.course = _course;
            this.semester = _semester;
        }

        showInfo(): void {
            console.log(`Name: ${this.name}\nAlter: ${this.age}\nStudiengang: ${this.course}\nSemester: ${this.semester}`);
        }
    }

    const s1: StudentClass = new StudentClass();
    s1.createStudent("Klaus", 21, "MIB", 1);
    s1.showInfo();
    console.log("______________________________________");
}