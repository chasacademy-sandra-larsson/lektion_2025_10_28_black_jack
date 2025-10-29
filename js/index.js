// Globala variabler - variabler som är åtkomliga i hela scriptet
let gameIsAlive = false;
let cards = [];
let sum = 0;
let hasBlackJack = false;
const baseUrl = "https://deckofcardsapi.com/static/img/";

// Kan användas om ni vill bygga ut Black Jack-spelet
const player = {
    name: "Sandra",
    chips: 200
}

// DOM-variabler
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const startGameBtn = document.getElementById("start-game-btn");
const newCardBtn = document.getElementById("new-card-btn");


function startGame() {
    console.log("-----GAME STARTED-----");
    // Spelet är igång
    gameIsAlive = true;
    // Generera 2 kort
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    // console.log("card1", card1, "card2", card2);
    cards = [card1, card2];
    sum = card1.value + card2.value;
    renderGame();
}

// Randomisera ett kort från en kortlek 2-10, knekt, dam, kung. Om ess får spelaren välja en 1 eller 11
// Vi tar inte hänsyn till att vi har en kortlek med 52 kort. Nu är det möjligt att dra vilket kort som helst!
// Returnerar ett värde mellan 1-13
function getRandomCard() {

    let randomNumber = Math.floor((Math.random() * 13) + 1)

     let randomSuit = Math.floor((Math.random() * 4) + 1)
    
    return {
        value: getCardValue(randomNumber),
        suit: getSuit(randomSuit);
        displayValue: randomNumber

    };
}

function getSuit(suitNumber) {
    const suits = ['S', 'D', 'C', 'H']; // Spades, Diamonds, Clubs, Hearts
    return suits[suitNumber];
}


// https://deckofcardsapi.com/
//The value, one of A (for an ace), 2, 3, 4, 5, 6, 7, 8, 9, 0 (for a ten), J (jack), Q (queen), or K (king);
//The suit, one of S (Spades), D (Diamonds), C (Clubs), or H (Hearts).

// Visa beräknad/processad information i DOM-element
function renderGame() {
    let message = "";

    // Vi ska visa bilder av korten - men väntar med det i första omgången.

    // Visa de dragna korten
    cardsEl.textContent = "Cards: ";
    cards.forEach(function(card) {
        cardsEl.textContent += card.displayValue + " ";
    });

    // Visa summan av de två första korten
    sumEl.textContent = "Sum: " + sum;

    // Visa meddelande till användaren
    if(sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if(sum === 21) {
        message = "Black Jack!";
        hasBlackJack = true;
    } else {
        message = "You are out of the game!";
        gameIsAlive = false;
    }
    messageEl.textContent = message;
    

}

function getCardValue(number) {

    // knekt, dam, kund = 10
    if(number > 10) {
        return 10
    } else if (number === 1) {
        return promptForAceValue(); // 1 eller 11
    } else {
        return number; // 2,3,4,5,6,7,8,9,10
    }

}

// Logik så att datorn avgör om ess ska bli 1 eller 11
function calculateAceValue() {
    // Låta datorn avgöra om man ska ha 1 eller 11
    let ace = -1;
    // sum = 9 => 11
    // sum = 10 => 11
    // sum = 11 => 1
    // sum = 12 => 1
    
    if(sum >= 11) {
      ace = 1;
    } else {
        ace = 11;
    }
    return ace;
}

function promptForAceValue() {
     let aceValue = prompt("You got an Ace! Choose the value: 1 or 11");
    
    // Keep asking until valid input
    while (aceValue !== "1" && aceValue !== "11") {
        aceValue = prompt("Invalid choice! Please enter 1 or 11 for the Ace:");
    }
    
    return parseInt(aceValue);
}



function newCard() {
    // if(gameIsAlive === true && hasBlackJack === false) 
    if(gameIsAlive && !hasBlackJack){
        let card = getRandomCard();
        sum += card.value;
        cards.push(card);
        renderGame();
    }

}


// Event handlers
startGameBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", newCard);
