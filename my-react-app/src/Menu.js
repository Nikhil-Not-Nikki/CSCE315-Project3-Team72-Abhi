class Menu {

    array = [];

    constructor(json) {
        for (const x in json) {
            this.array.push(x);
        }
    }

    printArray() {
        for (const x in this.array) {
            console.log(x);
        }
    }
}