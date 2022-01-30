let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let shapes = ["♥", "♦", "♠", "♣"];
let myDeckDiv = document.querySelector("#my-deck");
let myCardDiv = document.querySelector("#my-card");
let comCardDiv = document.querySelector("#com-card");
let highNumber = {
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let comScore = document.querySelector("#com-score");
let myScore = document.querySelector("#my-score");
let status = document.querySelector(".status");

function Card(number, shape) {
  this.number = number;
  this.shape = shape;
}

function shuffledCards() {
  let cards = numbers.map(function (ele1) {
    return shapes.map(function (ele2) {
      return new Card(ele1, ele2);
    });
  });

  let cardsReduce = cards.reduce(function (acc, cur) {
    return acc.concat(cur);
  });

  let shuffledCards = [];
  for (let i = 0; i < 52; i++) {
    let pickedCard = cardsReduce.splice(
      Math.floor(Math.random() * cardsReduce.length),
      1
    );
    shuffledCards.push(pickedCard[0]);
  }
  return shuffledCards;
}

function createDecks() {
  myDeck = shuffledCards().slice(26, 52);
  comDeck = shuffledCards().slice(26, 52);
  console.log(myDeck);
  console.log(comDeck);
}

function initiate() {
  shuffledCards();
  createDecks();
}

initiate();

console.log(shuffledCards());

myDeckDiv.addEventListener("click", function () {
  let myFlipCard = myDeck.splice(0, 1);

  myCardDiv.children[0].textContent = myFlipCard[0].number;
  myCardDiv.children[1].textContent = myFlipCard[0].shape;

  let comFlipCard = comDeck.splice(0, 1);
  comCardDiv.children[0].textContent = comFlipCard[0].number;
  comCardDiv.children[1].textContent = comFlipCard[0].shape;

  let myCardNumber = myFlipCard[0].number;
  let comCardNumber = comFlipCard[0].number;

  if (typeof myCardNumber != "number" || typeof comCardNumber != "number") {
    checkWinner(toNumber(myCardNumber), toNumber(comCardNumber));
  } else {
    checkWinner(myCardNumber, comCardNumber);
  }

  if (myDeck.length == 0) {
    if (myScore.textContent > comScore.textContent) {
      console.log("You won against the computer!");
    } else if (myScore.textContent < comScore.textContent) {
      console.log("Computer wins! Try again");
    } else {
      console.log("Tie!");
    }
    initiate();
    return;
  }
});

function toNumber(letter) {
  if (typeof letter != "number") {
    return (letter = highNumber[letter]);
  } else {
    return letter;
  }
}

function checkWinner(num1, num2) {
  if (num1 > num2) {
    status.textContent = "(Card is bigger)";
    myScore.textContent = parseInt(myScore.textContent) + 2;
  } else if (num1 < num2) {
    status.textContent = "(Card is smaller)";
    comScore.textContent = parseInt(comScore.textContent) + 2;
  } else {
    status.textContent = "It's war!";
  }
}
