"use strict";

// Player Creator
let outputDisplay;
let players = [];
let deck = [];
let peoplePlaying = [];
let handLengthPlayer = 0;
let handLengthDealer = 0;
let input;

const createPlayers = (input) => {
  for (let i = 1; i < input + 1; i++) {
    const player = {
      name: `Player ${i}`,
      hand: [],
      value: 0,
      playing: true,
    };
    players.push(player);
  }
};
// Dealer
let dealerHand = [];
let dealerValue = "";

// DOM ==============================================
const startDOM = document.querySelector(".start");
const continueDOM = document.querySelector(".continue");
const dealDOM = document.querySelector(".deal");
const hitDOM = document.querySelector(".hit");
const standDOM = document.querySelector(".stand");
const playersDOM = document.querySelector(".players");
const restartDOM = document.querySelector(".restart");

const optionDOM = document.querySelector(".num2");
const submitDOM = document.querySelector(".submitBtn");
const DISPLAY = document.querySelector(".display");

let startDisabledDOM = document.querySelector(".start");
let continueDisabledDOM = (document.querySelector(".continue").disabled = true);
let dealDisabledDOM = (document.querySelector(".deal").disabled = true);
let hitDisabledDOM = (document.querySelector(".hit").disabled = true);
let standDisabledDOM = (document.querySelector(".stand").disabled = true);
let submitDisabledDOM = (document.querySelector(".submitBtn").disabled = true);
let restartDisabledDOM = (document.querySelector(".restart").disabled = true);

continueDOM.addEventListener("click", continued);
dealDOM.addEventListener("click", deal);
hitDOM.addEventListener("click", hit);
standDOM.addEventListener("click", stand);
restartDOM.addEventListener("click", restart);

// display information
startDOM.addEventListener("click", function () {
  let result = main();
  DISPLAY.innerText = result;
  startDisabledDOM = document.querySelector(".start").disabled = true;
  continueDisabledDOM = document.querySelector(".continue").disabled = true;
  dealDisabledDOM = document.querySelector(".deal").disabled = true;
  hitDisabledDOM = document.querySelector(".hit").disabled = true;
  standDisabledDOM = document.querySelector(".stand").disabled = true;
  submitDisabledDOM = document.querySelector(".submitBtn").disabled = false;
});
submitDOM.addEventListener("click", function () {
  init();
  DISPLAY.innerText = "";
  startDisabledDOM = document.querySelector(".start").disabled = true;
  continueDisabledDOM = document.querySelector(".continue").disabled = true;
  dealDisabledDOM = document.querySelector(".deal").disabled = false;
  hitDisabledDOM = document.querySelector(".hit").disabled = true;
  standDisabledDOM = document.querySelector(".stand").disabled = true;
  submitDisabledDOM = document.querySelector(".submitBtn").disabled = true;
});

restartDOM.addEventListener("click", function () {
  startDisabledDOM = document.querySelector(".start").disabled = false;
  continueDisabledDOM = document.querySelector(".continue").disabled = true;
  dealDisabledDOM = document.querySelector(".deal").disabled = true;
  hitDisabledDOM = document.querySelector(".hit").disabled = true;
  standDisabledDOM = document.querySelector(".stand").disabled = true;
  submitDisabledDOM = document.querySelector(".submitBtn").disabled = true;
  restartDisabledDOM = document.querySelector(".restart").disabled = true;
});

// ========================DOM======================

// Card Deck Creator
function createDeck() {
  // 52 Cards
  const cardDeck = [];
  // 4 Suits, 13 Cards in each
  const suits = ["??????", "??????", "??????", "??????"];
  // i = numOfSuits = 4
  for (let i = 0; i < suits.length; i++) {
    const currentSuit = suits[i];
    // x = numOfCardsInSuit = 13
    for (let x = 1; x <= 13; x++) {
      let cardName = x;
      // Specialised names
      if (cardName === 1) {
        cardName = "A";
      } else if (cardName === 11) {
        cardName = "J";
      } else if (cardName === 12) {
        cardName = "Q";
      } else if (cardName === 13) {
        cardName = "K";
      }
      // Object for Each Card
      const card = {
        name: cardName,
        suit: currentSuit,
        value: x,
      };
      // Give special cards their true value
      if (cardName === "A") {
        card.value = 11;
      } else if (cardName === "J" || cardName === "Q" || cardName === "K") {
        card.value = 10;
      }
      // Add card to cardDeck
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

createDeck();

// Random Generator to numOfCards
function ranGen(numOfCards) {
  const randomNumber = Math.floor(Math.random() * numOfCards);
  return randomNumber;
}
// Shuffle Deck Creator
function shuffleDeck(cards) {
  for (let i = 0; i < cards.length; i++) {
    const cardShuffle = ranGen(cards.length);
    const currentCard = cards[i];
    const randomCard = cards[cardShuffle];
    // Randomizes the cards
    cards[i] = randomCard;
    cards[cardShuffle] = currentCard;
  }
  return cards;
}

// Draw 2 Cards for everyone
const dealDeck = (numOfPlayers) => {
  for (let i = 0; i < 2; i++) {
    for (let x = 0; x < numOfPlayers; x++) {
      players[x].hand.push(deck.pop());
    }
    dealerHand.push(deck.pop());
  }
};

const aceChecker = () => {
  for (let x = 0; x < input; x++) {
    for (let i = 0; i < players[x].hand.length; i++) {
      if (players[x].hand[i].name === "A") {
        if (players[x].value + 11 > 21 && players[x].hand[i].name === "A") {
          players[x].hand[i].value = 1;
        }
      }
    }
  }
  for (let i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i].name === "A") {
      if (dealerValue + 11 > 21 && dealerHand[i].name === "A") {
        dealerHand[i].value = 1;
      }
    }
  }
};

// Add the value of the cards
function playerValueAdder() {
  for (let x = 0; x < input; x++) {
    players[x].value = 0;
    for (let i = 0; i < players[x].hand.length; i++) {
      players[x].value += players[x].hand[i].value;
      players[x].value = Number(players[x].value);
    }
    if (players[x].hand.cardName === "A") {
      card.value = 11;
      if (players[x].value + card.value > 21) {
        card.value = 1;
      }
      return players[x].value;
    }
  }
}
function dealerValueAdder() {
  dealerValue = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    dealerValue += dealerHand[i].value;
    dealerValue = Number(dealerValue);
  }
  if (dealerHand === "A") {
    card.value = 11;
    if (dealerValue + card.value > 21) {
      card.value = 1;
    }
    return dealerValue;
  }
}

function nextPlayerChecker() {
  let outputValue = "";
  if (nextPlayer === true) {
    currentPlayer++;
    console.log(currentPlayer);
    z = z + 5;
    hitCounter = 0;
    handLengthPlayer = 2;
    nextPlayer = false;
    if (currentPlayer < input) {
      outputValue += `
            It is ${players[currentPlayer].name}'s turn!`;
    } else {
      currentPlayer = input - 1;
      roundOver = true;
    }
    if (players[currentPlayer].playing === false) {
      currentPlayer++;
    }
  }
  return outputValue;
}
function addPeoplePlaying() {
  let outputValue = "";
  for (let i = 0; i < input; i++) {
    if (players[currentPlayer].value === maxScore) {
      outputValue = `
            Blackjack! ${players[currentPlayer].name} wins!
            `;
      players[currentPlayer].playing = false;
      nextPlayer = true;
    } else if (players[currentPlayer].value > maxScore) {
      outputValue = `
            ${players[currentPlayer].name} busted! ${players[currentPlayer].name} lost!
            `;
      players[currentPlayer].playing = false;
      nextPlayer = true;
    } else if (players[currentPlayer].value === maxScore) {
      outputValue = `Blackjack! ${players[currentPlayer].name} wins!
            `;
      players[currentPlayer].playing = false;
      nextPlayer = true;
    } else if (players[currentPlayer].playing === true) {
    }

    if (dealerValue === maxScore) {
      outputValue = `
            Blackjack! Dealer wins!
            `;
      roundOver = true;
    } else if (
      players[currentPlayer].value === maxScore &&
      dealerValue === maxScore
    ) {
      outputValue = `
            Both got blackjack! ${players[currentPlayer].name} ties!
            `;
    }
  }
  return outputValue;
}

const blackjackChecker = () => {
  let outputValue = "";
  addPeoplePlaying();
  nextPlayerChecker();
  roundOverChecker();

  output(outputValue);
};

const dealButtonDisable = () => {
  startDisabledDOM = document.querySelector(".start").disabled = true;
  continueDisabledDOM = document.querySelector(".continue").disabled = true;
  dealDisabledDOM = document.querySelector(".deal").disabled = true;
  hitDisabledDOM = document.querySelector(".hit").disabled = false;
  standDisabledDOM = document.querySelector(".stand").disabled = false;
  submitDisabledDOM = document.querySelector(".submitBtn").disabled = true;
};

const hitButtonDisable = () => {
  startDisabledDOM = document.querySelector(".start").disabled = true;
  continueDisabledDOM = document.querySelector(".continue").disabled = true;
  dealDisabledDOM = document.querySelector(".deal").disabled = true;
  hitDisabledDOM = document.querySelector(".hit").disabled = false;
  standDisabledDOM = document.querySelector(".stand").disabled = false;
  submitDisabledDOM = document.querySelector(".submitBtn").disabled = true;
};

const roundOverChecker = () => {
  if (roundOver === true) {
    startDisabledDOM = document.querySelector(".start").disabled = true;
    continueDisabledDOM = document.querySelector(".continue").disabled = true;
    dealDisabledDOM = document.querySelector(".deal").disabled = true;
    hitDisabledDOM = document.querySelector(".hit").disabled = true;
    standDisabledDOM = document.querySelector(".stand").disabled = true;
    submitDisabledDOM = document.querySelector(".submitBtn").disabled = true;
    restartDisabledDOM = document.querySelector(".restart").disabled = false;
  }
};

const drawCard = () => {
  players[currentPlayer].hand.push(deck.pop());
};

const cardCSS = (suit, value, card) => {
  if (suit === "??????") {
    $(`.suit${card}`).text("??????");
    if (value == 1) {
      $(`.value${card}`).text(1);
    } else if (value == 2) {
      $(`.value${card}`).text(2);
    } else if (value == 3) {
      $(`.value${card}`).text(3);
    } else if (value == 4) {
      $(`.value${card}`).text(4);
    } else if (value == 5) {
      $(`.value${card}`).text(5);
    } else if (value == 6) {
      $(`.value${card}`).text(6);
    } else if (value == 7) {
      $(`.value${card}`).text(7);
    } else if (value == 8) {
      $(`.value${card}`).text(8);
    } else if (value == 9) {
      $(`.value${card}`).text(9);
    } else if (value == 10) {
      $(`.value${card}`).text(10);
    } else if (value == "K") {
      $(`.value${card}`).text("K");
    } else if (value == "Q") {
      $(`.value${card}`).text("Q");
    } else if (value == "J") {
      $(`.value${card}`).text("J");
    } else if (value == "A") {
      $(`.value${card}`).text("A");
    }
  } else if (suit === "??????") {
    $(`.suit${card}`).text("??????");
    if (value == 1) {
      $(`.value${card}`).text(1);
    } else if (value == 2) {
      $(`.value${card}`).text(2);
    } else if (value == 3) {
      $(`.value${card}`).text(3);
    } else if (value == 4) {
      $(`.value${card}`).text(4);
    } else if (value == 5) {
      $(`.value${card}`).text(5);
    } else if (value == 6) {
      $(`.value${card}`).text(6);
    } else if (value == 7) {
      $(`.value${card}`).text(7);
    } else if (value == 8) {
      $(`.value${card}`).text(8);
    } else if (value == 9) {
      $(`.value${card}`).text(9);
    } else if (value == 10) {
      $(`.value${card}`).text(10);
    } else if (value == "K") {
      $(`.value${card}`).text("K");
    } else if (value == "Q") {
      $(`.value${card}`).text("Q");
    } else if (value == "J") {
      $(`.value${card}`).text("J");
    } else if (value == "A") {
      $(`.value${card}`).text("A");
    }
  } else if (suit === "??????") {
    $(`.suit${card}`).text("??????");
    if (value == 1) {
      $(`.value${card}`).text(1);
    } else if (value == 2) {
      $(`.value${card}`).text(2);
    } else if (value == 3) {
      $(`.value${card}`).text(3);
    } else if (value == 4) {
      $(`.value${card}`).text(4);
    } else if (value == 5) {
      $(`.value${card}`).text(5);
    } else if (value == 6) {
      $(`.value${card}`).text(6);
    } else if (value == 7) {
      $(`.value${card}`).text(7);
    } else if (value == 8) {
      $(`.value${card}`).text(8);
    } else if (value == 9) {
      $(`.value${card}`).text(9);
    } else if (value == 10) {
      $(`.value${card}`).text(10);
    } else if (value == "K") {
      $(`.value${card}`).text("K");
    } else if (value == "Q") {
      $(`.value${card}`).text("Q");
    } else if (value == "J") {
      $(`.value${card}`).text("J");
    } else if (value == "A") {
      $(`.value${card}`).text("A");
    }
  } else if (suit === "??????") {
    $(`.suit${card}`).text("??????");
    if (value == 1) {
      $(`.value${card}`).text(1);
    } else if (value == 2) {
      $(`.value${card}`).text(2);
    } else if (value == 3) {
      $(`.value${card}`).text(3);
    } else if (value == 4) {
      $(`.value${card}`).text(4);
    } else if (value == 5) {
      $(`.value${card}`).text(5);
    } else if (value == 6) {
      $(`.value${card}`).text(6);
    } else if (value == 7) {
      $(`.value${card}`).text(7);
    } else if (value == 8) {
      $(`.value${card}`).text(8);
    } else if (value == 9) {
      $(`.value${card}`).text(9);
    } else if (value == 10) {
      $(`.value${card}`).text(10);
    } else if (value == "K") {
      $(`.value${card}`).text("K");
    } else if (value == "Q") {
      $(`.value${card}`).text("Q");
    } else if (value == "J") {
      $(`.value${card}`).text("J");
    } else if (value == "A") {
      $(`.value${card}`).text("A");
    }
  } else {
    $(`.value${card}`).text("");
    $(`.suit${card}`).text("");
  }
};

// Win Conditions
let maxScore = 21;
let dealerHit = 17;
let roundOver = false;
let nextPlayer = false;
let currentPlayer = 0;
let hitCounter = 0;
let roundCounter = 1;
let standCounter = 0;
let z = 0;

// Blackjack

// 5 Buttons

// DOM

// Functions
function start() {}
function continued() {}

function deal() {
  let outputValue = "";
  let y = 0;
  outputValue += `----------Round ${roundCounter}----------
    `;

  dealDeck(input);
  aceChecker();
  playerValueAdder();
  dealerValueAdder();
  for (let i = 0; i < input; i++) {
    outputValue += `${players[i].name}${players[i].hand[0].suit}${players[i].hand[0].name} `;

    outputValue += `${players[i].hand[1].suit}${players[i].hand[1].name} `;
    cardCSS(players[i].hand[0].suit, players[i].hand[0].name, 1 + y);
    cardCSS(players[i].hand[1].suit, players[i].hand[1].name, 2 + y);

    outputValue += `${players[i].value}
        `;
    y = y + 5;
    console.log(y);
    handLengthPlayer += 2;
  }
  addPeoplePlaying();
  nextPlayerChecker();
  handLengthPlayer = handLengthPlayer / input;
  handLengthPlayer = handLengthPlayer - 1;
  outputValue += `Dealer:${dealerHand[0].suit}${dealerHand[0].name} ${dealerHand[1].suit}${dealerHand[1].name} `;
  outputValue += dealerValue;
  cardCSS(dealerHand[0].suit, dealerHand[0].name, 21);
  cardCSS(dealerHand[1].suit, dealerHand[1].name, 22);

  outputValue += `
    It is ${players[currentPlayer].name} 's turn. Hit or stand.
    `;

  dealButtonDisable();
  handLengthDealer = 2;
  roundOverChecker();
  output(outputValue);
}

function hit() {
  outputDisplay.innerText = "";

  hitCounter += 1;

  let outputValue = "";
  outputValue += `----------Round ${roundCounter}----------
    `;

  hitButtonDisable();
  for (let i = 0; i < 1; i++) {
    outputValue += `${players[currentPlayer].name} hit!
                `;
    drawCard();
    aceChecker();
    playerValueAdder();
    for (let x = 0; x < 1; x++) {
      outputValue +=
        players[currentPlayer].name +
        players[currentPlayer].hand[0].suit +
        players[currentPlayer].hand[0].name +
        " ";

      outputValue +=
        players[currentPlayer].hand[1].suit +
        players[currentPlayer].hand[1].name +
        " ";

      for (let y = 0; y < hitCounter; y++) {
        outputValue +=
          players[currentPlayer].hand[2 + y].suit +
          players[currentPlayer].hand[2 + y].name +
          " ";
        cardCSS(
          players[currentPlayer].hand[2 + y].suit,
          players[currentPlayer].hand[2 + y].name,
          3 + y + z
        );
      }
      outputValue += players[currentPlayer].value;

      outputValue += `
            `;
      handLengthPlayer += 1;
    }

    outputValue += addPeoplePlaying();
    nextPlayerChecker();
    roundOverChecker();
    if (currentPlayer === input) {
      outputValue += "";
    } else {
      outputValue += `
            It is ${players[currentPlayer].name} 's turn!
            `;
    }
    outputDisplay.innerText = outputValue;
  }
}
function stand() {
  outputDisplay.innerText = "";
  let outputValue = "";
  standCounter += 1;
  outputValue += `----------Round ${roundCounter}----------
    `;

  outputValue += `${players[currentPlayer].name} stood!`;
  nextPlayer = true;
  nextPlayerChecker();
  console.log(currentPlayer);
  if (
    (currentPlayer === input - 1 && hitCounter >= input - 1) ||
    standCounter === input
  ) {
    while (dealerValue < dealerHit) {
      dealerHand.push(deck.pop());
      dealerValueAdder();
      aceChecker();
      let cardDisplayerDealer =
        "Dealer: " +
        dealerHand[0].suit +
        dealerHand[0].name +
        " " +
        dealerHand[1].suit +
        dealerHand[1].name +
        " ";
      cardDisplayerDealer +=
        dealerHand[handLengthDealer].suit +
        dealerHand[handLengthDealer].name +
        " ";
      cardCSS(
        dealerHand[handLengthDealer].suit,
        dealerHand[handLengthDealer].name,
        21 + handLengthDealer
      );
      handLengthDealer += 1;
    }
    if (dealerValue > maxScore) {
      outputValue += `
            Dealer busted!`;
      roundOver = true;
    }
    for (let i = 0; i < input; i++) {
      if (
        dealerValue > players[i].value &&
        dealerValue < maxScore &&
        players[i].value < maxScore
      ) {
        outputValue += `
                ${players[i].name} lost!`;
        roundOver = true;
      } else if (
        dealerValue < players[i].value &&
        dealerValue < maxScore &&
        players[i].value < maxScore
      ) {
        outputValue += `
                ${players[i].name} won!`;
        roundOver = true;
      } else if (
        dealerValue === players[i].value &&
        dealerValue < maxScore &&
        players[i].value < maxScore
      ) {
        outputValue += `
                ${players[i].name} tied!`;
        roundOver = true;
      }
    }
  }
  roundOverChecker();
  outputValue += `
    It is ${players[currentPlayer].name} 's turn!
    `;
  outputDisplay.innerText = outputValue;
}

function restart() {
  outputDisplay = "";
  players = [];
  deck = [];
  peoplePlaying = [];
  handLengthPlayer = 0;
  handLengthDealer = 0;
  input = "";
  maxScore = 21;
  dealerHit = 17;
  roundOver = false;
  nextPlayer = false;
  currentPlayer = 0;
  hitCounter = 0;
  dealerHand = [];
  dealerValue = "";
  standCounter = 0;
  z = 0;
  for (let i = 1; i < 25; i++) {
    cardCSS("", "", i);
  }

  roundCounter++;
}

function init() {
  const numOfPlayers = playersDOM.options[playersDOM.selectedIndex].value;
  input = Number(numOfPlayers);
  createPlayers(input);
  deck = shuffleDeck(createDeck(52));
}

function output(result) {
  outputDisplay = document.createElement("h3");
  outputDisplay.setAttribute("class", "cardDisplay");
  outputDisplay.innerText = result;
  document.body.appendChild(outputDisplay);
}

const main = () => {
  let output = "";
  output = "Please select a number of players.";
  return output;
};
