// Player Creator
const players = [];
let deck = [];
let handLengthPlayer = 0;
let handLengthDealer = 0;
let input;

const createPlayers = (input) => {
    for (let i = 1; i < input + 1; i++) {
        const player = {
            name: `Player${i}:`,
            hand: [],
            value: 0,
        }
        players.push(player);
    }
}
// Dealer
let dealerHand = [];
let dealerValue = '';

// DOM ==============================================
const startDOM = document.querySelector('.start')
const continueDOM = document.querySelector('.continue')
const dealDOM = document.querySelector('.deal')
const hitDOM = document.querySelector('.hit')
const standDOM = document.querySelector('.stand')
const playersDOM = document.querySelector('.players')

const optionDOM = document.querySelector('.num2')
const submitDOM = document.querySelector('.submitBtn')
const DISPLAY = document.querySelector(".display")

let startDisabledDOM = document.querySelector('.start')
let continueDisabledDOM = document.querySelector('.continue').disabled = true;
let dealDisabledDOM = document.querySelector('.deal').disabled = true;
let hitDisabledDOM = document.querySelector('.hit').disabled = true;
let standDisabledDOM = document.querySelector('.stand').disabled = true;
let submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;

continueDOM.addEventListener('click', continued);
dealDOM.addEventListener('click', deal);
hitDOM.addEventListener('click', hit);
standDOM.addEventListener('click', stand);

// display information
startDOM.addEventListener('click', function () {
    let result = main();
    DISPLAY.innerText = result;
    startDisabledDOM = document.querySelector('.start').disabled = true;
    continueDisabledDOM = document.querySelector('.continue').disabled = true;
    dealDisabledDOM = document.querySelector('.deal').disabled = true;
    hitDisabledDOM = document.querySelector('.hit').disabled = true;
    standDisabledDOM = document.querySelector('.stand').disabled = true;
    submitDisabledDOM = document.querySelector('.submitBtn').disabled = false;

});
submitDOM.addEventListener('click', function () {
    init()
    let result = main();
    startDisabledDOM = document.querySelector('.start').disabled = true;
    continueDisabledDOM = document.querySelector('.continue').disabled = true;
    dealDisabledDOM = document.querySelector('.deal').disabled = false;
    hitDisabledDOM = document.querySelector('.hit').disabled = true;
    standDisabledDOM = document.querySelector('.stand').disabled = true;
    submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
});

// ========================DOM======================

// Card Deck Creator
function createDeck() {
    // 52 Cards
    const cardDeck = [];
    // 4 Suits, 13 Cards in each
    const suits = ['♦️', '♥️', '♣️', '♠️']
    // i = numOfSuits = 4
    for (let i = 0; i < suits.length; i++) {
        const currentSuit = suits[i];
        // x = numOfCardsInSuit = 13
        for (let x = 1; x <= 13; x++) {
            let cardName = x;
            // Specialised names
            if (cardName === 1) {
                cardName = 'A';
            } else if (cardName === 11) {
                cardName = 'J';
            } else if (cardName === 12) {
                cardName = 'Q';
            } else if (cardName === 13) {
                cardName = 'K';
            }
            // Object for Each Card
            const card = {
                name: cardName,
                suit: currentSuit,
                value: x,
            }
            // Give special cards their true value
            if (cardName === 'A') {
                card.value = 11;

            }
            else if (cardName === 'J' || cardName === 'Q' || cardName === 'K') {
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
    };
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
}

const aceChecker = () => {
    for (let x = 0; x < input; x++) {
        for (let i = 0; i < players[x].hand.length; i++) {
            if (players[x].hand[i].name === 'A') {
                if (players[x].value + 11 > 21 && players[x].hand[i].name === 'A') {
                    players[x].hand[i].value = 1;
                }
            }
        }
    }
    for (let i = 0; i < dealerHand.length; i++) {
        if (dealerHand[i].name === 'A') {
            if (dealerValue + 11 > 21 && dealerHand[i].name === 'A') {
                dealerHand[i].value = 1;
            }
        }
    }
}

// Add the value of the cards
function playerValueAdder() {
    for (let x = 0; x < input; x++) {
        players[x].value = 0;
        for (let i = 0; i < players[x].hand.length; i++) {
            players[x].value += players[x].hand[i].value;
            players[x].value = Number(players[x].value);
        }
        if (players[x].hand.cardName === 'A') {
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
    if (dealerHand === 'A') {
        card.value = 11;
        if (dealerValue + card.value > 21) {
            card.value = 1;
        }
        return dealerValue;
    }
}
// Win Conditions
let maxScore = 21;
let dealerHit = 17;
let roundOver = false;
let nextPlayer = false;
let currentPlayer = 0;

// Blackjack

// 5 Buttons

// DOM

// Functions
function start() {

}
function continued() {

}

function deal() {
    dealDeck(input);
    playerValueAdder();
    dealerValueAdder();
    aceChecker();
    console.log(players)
    for (let i = 0; i < input; i++) {
        let cardDisplayerPlayer = players[i].name + players[i].hand[0].suit + players[i].hand[0].name + ' ';
        cardDisplayerPlayer += players[i].hand[1].suit + players[i].hand[1].name + ' ';
        output(cardDisplayerPlayer + players[i].value);
        handLengthPlayer += 2;
    }
    handLengthPlayer = handLengthPlayer / input;
    console.log(handLengthPlayer);
    let cardDisplayerDealer = 'Dealer: ' + dealerHand[0].suit + dealerHand[0].name + ' ' + dealerHand[1].suit + dealerHand[1].name + ' ';
    output(cardDisplayerDealer + dealerValue);

    for (let i = 0; i < input; i++) {
        if (players[i].value === maxScore) {
            output(`Blackjack! ${players[i].name} wins!`);
            roundOver = true;
        } else if (dealerValue === maxScore) {
            output(`Blackjack! ${players[i].name} lost!`);
            roundOver = true;
        } else if (players[i].value === maxScore && dealerValue === maxScore) {
            output(`Both got blackjack! ${players[i].name} ties!`);
            roundOver = true;
        }
    }
    startDisabledDOM = document.querySelector('.start').disabled = true;
    continueDisabledDOM = document.querySelector('.continue').disabled = true;
    dealDisabledDOM = document.querySelector('.deal').disabled = true;
    hitDisabledDOM = document.querySelector('.hit').disabled = false;
    standDisabledDOM = document.querySelector('.stand').disabled = false;
    submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
    if (roundOver === true) {
        startDisabledDOM = document.querySelector('.start').disabled = true;
        continueDisabledDOM = document.querySelector('.continue').disabled = true;
        dealDisabledDOM = document.querySelector('.deal').disabled = true;
        hitDisabledDOM = document.querySelector('.hit').disabled = true;
        standDisabledDOM = document.querySelector('.stand').disabled = true;
        submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
    }
}

function hit() {
    startDisabledDOM = document.querySelector('.start').disabled = true;
    continueDisabledDOM = document.querySelector('.continue').disabled = true;
    dealDisabledDOM = document.querySelector('.deal').disabled = true;
    hitDisabledDOM = document.querySelector('.hit').disabled = false;
    standDisabledDOM = document.querySelector('.stand').disabled = false;
    submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;

    for (let i = 0; i < 1; i++) {
        players[currentPlayer].hand.push(deck.pop());
        playerValueAdder();
        aceChecker();
        for (let x = 0; x < 1; x++) {
            let cardDisplayerPlayer = players[currentPlayer].name + players[currentPlayer].hand[0].suit + players[currentPlayer].hand[0].name + ' ';

            cardDisplayerPlayer += players[currentPlayer].hand[1].suit + players[currentPlayer].hand[1].name + ' ';

            cardDisplayerPlayer += players[currentPlayer].hand[handLengthPlayer].suit + players[currentPlayer].hand[handLengthPlayer].name + ' ';

            output(cardDisplayerPlayer + players[currentPlayer].value);
            handLengthPlayer += 1;
        }
        let cardDisplayerDealer = 'Dealer: ' + dealerHand[0].suit + dealerHand[0].name + ' ' + dealerHand[1].suit + dealerHand[1].name + ' ';
        output(cardDisplayerDealer + dealerValue);
        if (players[currentPlayer].value > maxScore) {
            output(`${players[currentPlayer].name} busted! ${players[currentPlayer].name} lost!`);
            nextPlayer = true;
        } else if (players[currentPlayer].value === maxScore) {
            output(`Blackjack! ${players[currentPlayer].name} wins!`);
            nextPlayer = true;
            roundOver = true;
        }
        if (roundOver === true) {
            startDisabledDOM = document.querySelector('.start').disabled = true;
            continueDisabledDOM = document.querySelector('.continue').disabled = true;
            dealDisabledDOM = document.querySelector('.deal').disabled = true;
            hitDisabledDOM = document.querySelector('.hit').disabled = true;
            standDisabledDOM = document.querySelector('.stand').disabled = true;
            submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
        }
        if (nextPlayer === true) {
            currentPlayer++;
            console.log(currentPlayer);
            handLengthPlayer = 2;
            nextPlayer = false;
        }
    }
}
function stand() {
    while (dealerValue < dealerHit) {
        output(players[0].name + players[0].value)
        dealerHand.push(deck.pop());
        dealerValueAdder();
        for (let i = 0; i < players[0].hand.length; i++) {
            if (players[0].hand[i].name === 'A') {
                if (players[0].value + 11 > 21 && players[0].hand[i].name === 'A') {
                    players[0].hand[i].value = 1;
                }
            }
        }
        for (let i = 0; i < dealerHand.length; i++) {
            if (dealerHand[i].name === 'A') {
                if (dealerValue + 11 > 21 && dealerHand[i].name === 'A') {
                    dealerHand[i].value = 1;
                }
            }
        }
        for (let i = 0; i < input; i++) {
            let cardDisplayerDealer = 'Dealer: ' + dealerHand[0].suit + dealerHand[0].name + ' ' + dealerHand[1].suit + dealerHand[1].name + ' ';
            cardDisplayerDealer += dealerHand[handLengthDealer].suit + dealerHand[handLengthDealer].name + ' ';
            handLengthDealer += 1;
            output(cardDisplayerDealer + dealerValue);
        }
    }
    if (dealerValue > maxScore) {
        output('Dealer busted!');
        roundOver = true;
    }
    for (let i = 0; i < input; i++) {
        if (dealerValue > players[i].value && dealerValue < maxScore && players[i].value < maxScore) {
            output('lose');
            roundOver = true;
        } else if (dealerValue < players[i].value && dealerValue < maxScore && players[i].value < maxScore) {
            output('win');
            roundOver = true;
        } else if (dealerValue === players[i].value && dealerValue < maxScore && players[i].value < maxScore) {
            output('tie');
            roundOver = true;
        }
    }
    startDisabledDOM = document.querySelector('.start').disabled = true;
    continueDisabledDOM = document.querySelector('.continue').disabled = true;
    dealDisabledDOM = document.querySelector('.deal').disabled = true;
    hitDisabledDOM = document.querySelector('.hit').disabled = true;
    standDisabledDOM = document.querySelector('.stand').disabled = true;
    submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
    if (roundOver === true) {
        startDisabledDOM = document.querySelector('.start').disabled = true;
        continueDisabledDOM = document.querySelector('.continue').disabled = true;
        dealDisabledDOM = document.querySelector('.deal').disabled = true;
        hitDisabledDOM = document.querySelector('.hit').disabled = true;
        standDisabledDOM = document.querySelector('.stand').disabled = true;
        submitDisabledDOM = document.querySelector('.submitBtn').disabled = true;
    }
}
function init() {
    const numOfPlayers = playersDOM.options[playersDOM.selectedIndex].value;
    console.log(typeof (numOfPlayers))
    input = Number(numOfPlayers);
    createPlayers(input);
    deck = shuffleDeck(createDeck(52))
}

function output(result) {
    const myOutputValue = document.createElement('h3');
    myOutputValue.innerText = result;
    document.body.appendChild(myOutputValue);
}

const main = () => {
    let output = ''
    output = 'Please select a number of players.';
    return output;
}