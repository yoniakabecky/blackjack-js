import { Card } from './card';

export default class DeckOfCards {
    allCards = [];

    constructor() {
        for (let suit = 0; suit < 4; suit++) {
            for (let value = 0; value < 13; value++) {
                let card = new Card(suit, value);
                this.allCards.push(card);
            }
        }
    }

    shuffleCards() {
        let temp = [];

        while (this.allCards.length > 0) {
            let randomNum = Math.floor(Math.random() * this.allCards.length);
            temp.push(this.allCards[randomNum]);
            this.allCards.splice(randomNum, 1);
        }
        return this.allCards = temp;
    }

    getACard() {
        return this.allCards.shift();
    }
}

export default DeckOfCards;
