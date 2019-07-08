const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];


class Card {
    constructor(suit, value) {
        this.suit = this.getSuit(suit);
        this.value = this.getValues(value);
    }

    getSuit(index) {
        return suits[index];
    }

    getValues(index) {
        return values[index];
    }
}
