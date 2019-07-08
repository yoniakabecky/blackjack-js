const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class Card {
	constructor(suit, value) {
		this.suit = suits[suit];
		this.value = values[value];
		this.point = this.getPoint(value);
	}

	getPoint(value) {
		let point = 0;
		if (value === 0) {
			point = 11;
		} else if (value >= 10) {
			point = 10;
		} else {
			point = value + 1;
		}
		return point;
	}
}


class DeckOfCards {
	allCards = [];

	constructor() {
		for (let suit = 0; suit < 4; suit++) {
			for (let value = 0; value < 13; value++) {
				let card = new Card(suit, value);
				this.allCards.push(card);
			}
		}

		let temp = [];
		while (this.allCards.length > 0) {
			let randomNum = Math.floor(Math.random() * this.allCards.length);
			temp.push(this.allCards[randomNum]);
			this.allCards.splice(randomNum, 1);
		}
		this.allCards = temp;
	}

	getACard() {
		return this.allCards.shift();
	}
}


class Person {
	constructor() {
		this.cards = [];
		this.points = 0;
		this.numOfCards = 0;
		this.aces = 0;
		this.faces = 0;
		this.bj = false;
	}

	addACard(card) {
		this.cards.push(card);
		this.numOfCards += 1;
		this.points += this.addPoint(card);
		this.aces += this.haveAce(card.value);
		this.faces += this.haveFace(card.point);
		this.bj = this.isBJ();
	}

	addPoint(card) {
		if (card.value === "A" && this.aces > 1) {
			return 1;
		} else {
			return card.point;
		}
	}

	haveAce(value) {
		if (value === "A") {
			return 1;
		}
		return 0;
	}

	haveFace(point) {
		if (point === 10) {
			return 1;
		}
		return 0;
	}

	isBJ() {
		if (this.points === 21)
			return this.aces === 1 && this.faces === 1;
	}
}


/** set deck of cards */
let cards = new DeckOfCards();

/** set cards for player and dealer */
let player = new Person();
let dealer = new Person();

let gameOver = false;

const playersHand = document.getElementById("playersHand");
const playersPoint = document.getElementById("playersPoint");
const dealersHand = document.getElementById("dealersHand");
const dealersPoint = document.getElementById("dealersPoint");
const resultModal = document.getElementById("resultModal");
const restartModal = document.getElementById("restartModal");
const resultText = document.getElementById("resultText");


player.addACard(cards.getACard());
dealer.addACard(cards.getACard());

player.addACard(cards.getACard());
dealer.addACard(cards.getACard());

dealersHand.innerHTML += `<div class="hands flex-center flex-column">${dealer.cards[0].suit + dealer.cards[0].value}</div>`;
// dealersHand.innerHTML += `<div class="hands flex-center flex-column face-down">${dealer.cards[1].suit + dealer.cards[1].value}</div>`;
let html = `
	<div class="hands flip-card">
		<div class="card">
			<div class="card__face face-down"></div>
			<div class="card__face card__face--back flex-center flex-column">
				${dealer.cards[1].suit + dealer.cards[1].value}
			</div>
		</div>
	</div>
`;
dealersHand.innerHTML += html;
dealersPoint.innerHTML = `[${dealer.cards[0].point}]`;


playersHand.innerHTML += `<div class="hands flex-center flex-column">${player.cards[0].suit + player.cards[0].value}</div>`;
playersHand.innerHTML += `<div class="hands flex-center flex-column">${player.cards[1].suit + player.cards[1].value}</div>`;
playersPoint.innerHTML = `[${player.points}]`;


/** check black jack or not */
if (player.bj) {
	if (dealer.bj) {
		// setTimeout("showResult('Draw')", 1000);
		showResult("Draw");
	} else {
		// setTimeout("showResult('Black Jack!!  YOU WIN')", 1000);
		showResult("Black Jack!!  YOU WIN");
	}
}

/** player's choice */
hit = () => {
	let newCard = cards.getACard();
	player.addACard(newCard);

	playersHand.innerHTML += `<div class="hands flex-center flex-column">${newCard.suit + newCard.value}</div>`;
	playersPoint.innerHTML = `[${player.points}]`;

	// if point is over 21 => game over
	isOver21();
};

function isOver21() {
	if (player.points > 21) {
		if (player.aces !== 0) {
			player.points -= 10;
			player.aces -= 1;
			playersPoint.innerHTML = `[${player.points}]`;
		} else {
			gameOver = true;
			showResult("YOU LOSE ;_;");
		}
	}
}

stand = () => {
	// dealersHand.childNodes[1].classList.remove("face-down");
	let card = document.querySelector('.card');
	card.classList.add('is-flipped');

	setTimeout("checkPoints()", 1000);
};

checkPoints = () => {
	// dealer get cards until point gets over 17
	dealersTurn();

	// check who is winner
	if (!gameOver) {
		whoIsWinner();
	}
};


dealersTurn = () => {
	while (dealer.points < 17) {
		let newCard = cards.getACard();
		dealer.addACard(newCard);
		dealersHand.innerHTML += `<div class="hands flex-center flex-column">${newCard.suit + newCard.value}</div>`;
	}
	dealersPoint.innerHTML = `[${dealer.points}]`;

	if (dealer.points > 21) {
		if (dealer.aces !== 0) {
			dealer.points -= 10;
			dealer.aces -= 1;
			dealersPoint.innerHTML = `[${dealer.points}]`;
			dealersTurn();
		} else {
			gameOver = true;
			showResult("YOU WIN !!!");
		}
	}
};


whoIsWinner = () => {
	let text = "";

	if (dealer.points < player.points) {
		text = "YOU WIN !!!!!";
	} else {
		text = "YOU LOSE ...";
	}
	showResult(text);
}


function showResult(text) {
	resultModal.style.display = "block";
	resultText.innerHTML = text;
	document.getElementById("hit-btn").style.display = "none";
	document.getElementById("stand-btn").style.display = "none";
}

$(function () {
	/** when player click the deck */
	$('#deck').click(function () {
		$('#restartModal').fadeIn();
	});
	$('.close-modal').click(function () {
		$('#resultModal').fadeOut();
		$('#restartModal').fadeOut();
	});

});


newGame = () => {
	// reload page
	setTimeout("location.reload()", 300);
};
