class Utils {
    constructor() {
        this.cardsDataJson = [
            { card: 0, value: 1 },
            { card: 1, value: 2 },
            { card: 2, value: 3 },
            { card: 3, value: 4 },
            { card: 4, value: 5 },
            { card: 5, value: 6 },
            { card: 6, value: 7 },
            { card: 7, value: 8 },
            { card: 8, value: 9 },
            { card: 9, value: 0 },
            { card: 10, value: 0 },
            { card: 11, value: 0 },
            { card: 12, value: 0 },
            { card: 13, value: 1 },
            { card: 14, value: 2 },
            { card: 15, value: 3 },
            { card: 16, value: 4 },
            { card: 17, value: 5 },
            { card: 18, value: 6 },
            { card: 19, value: 7 },
            { card: 20, value: 8 },
            { card: 21, value: 9 },
            { card: 22, value: 0 },
            { card: 23, value: 0 },
            { card: 24, value: 0 },
            { card: 25, value: 0 },
            { card: 26, value: 1 },
            { card: 27, value: 2 },
            { card: 28, value: 3 },
            { card: 29, value: 4 },
            { card: 30, value: 5 },
            { card: 31, value: 6 },
            { card: 32, value: 7 },
            { card: 33, value: 8 },
            { card: 34, value: 9 },
            { card: 35, value: 0 },
            { card: 36, value: 0 },
            { card: 37, value: 0 },
            { card: 38, value: 0 },
            { card: 39, value: 1 },
            { card: 40, value: 2 },
            { card: 41, value: 3 },
            { card: 42, value: 4 },
            { card: 43, value: 5 },
            { card: 44, value: 6 },
            { card: 45, value: 7 },
            { card: 46, value: 8 },
            { card: 47, value: 9 },
            { card: 48, value: 0 },
            { card: 49, value: 0 },
            { card: 50, value: 0 },
            { card: 51, value: 0 },

        ]
    }
    GetRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
let utils = new Utils()
export { utils as Utils };