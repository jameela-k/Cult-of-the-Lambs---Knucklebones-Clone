
// Variable to keep track of the current player 

let currentPlayer = 1;
let totalScore = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

let playerOneBoxCount = 0;
let playerTwoBoxCount = 0;

// player's score
let score1Element = document.getElementById("total-score1"); 
let score2Element = document.getElementById("total-score2"); 

score1Element.textContent = 0;
score2Element.textContent = 0;

let currentPlayerElement = document.querySelector('current-player');

// board's player
const boardright = document.querySelector(".board-right"); 
const boardleft = document.querySelector(".board-left"); 

// Dice image 
const imageButton = document.getElementById("roller1");
const imageButton2 = document.getElementById("roller2");
const diceValue = imageButton.getAttribute("data-value");


// create a function that the red lamb starts
function rollDicePlayer1() {
    console.log("Inside roll dice player 1")
    // create a function that rolls the dice random
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceEl = document.getElementById("roller1");
    if (diceValue == 1) {
        diceEl.src = "Dices/dice1.png";
    } else if (diceValue == 2) {
        diceEl.src = "Dices/dice2.png";
    } else if (diceValue == 3) {
        diceEl.src = "Dices/dice3.png";
    } else if (diceValue == 4) {
        diceEl.src = "Dices/dice4.png";
    } else if (diceValue == 5) {
        diceEl.src = "Dices/dice5.png";
    } else {
        diceEl.src = "Dices/dice6.png";
    }
    // set a data value to the imageButton element to the value of the dice roll 
    diceEl.setAttribute('data-value', diceValue);
}

function rollDicePlayer2() {
    console.log("Inside roll dice player 2")
    // create a function that rolls the dice random
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceEl = document.getElementById("roller2");
    if (diceValue == 1) {
        diceEl.src = "Dices/dice1.png";
    } else if (diceValue == 2) {
        diceEl.src = "Dices/dice2.png";
    } else if (diceValue == 3) {
        diceEl.src = "Dices/dice3.png";
    } else if (diceValue == 4) {
        diceEl.src = "Dices/dice4.png";
    } else if (diceValue == 5) {
        diceEl.src = "Dices/dice5.png";
    } else {
        diceEl.src = "Dices/dice6.png";
    }
     // set a data value to the imageButton element to the value of the dice roll 
     diceEl.setAttribute('data-value', diceValue);
}

// drag the rolled dice into the selected box

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
}
  
function drop(ev) {
    ev.preventDefault();
    console.log(`drop...`);
    const data = ev.dataTransfer.getData("text");
    const originalDiceElement = document.getElementById(data);
    const diceValue = parseInt(originalDiceElement.dataset.value);
    // Create new dice element
    const newDiceElement = document.createElement("img");
    // set the scr of this element
    newDiceElement.src = originalDiceElement.src;
    // Add class names to new dice
    newDiceElement.classList.add("block");
    if (currentPlayer == 1) {
        newDiceElement.classList.add("player1-dice-face");
    } else {
        newDiceElement.classList.add("player2-dice-face");
    }
    // and then do the things below
    ev.target.appendChild(newDiceElement);
    // Delete this element
    originalDiceElement.remove(); 
    handleMove(diceValue);
}

function handleMove(diceValue){
    console.log(`handleMove`);
    createNewDice();
    // TODO Update Score using updateScore()
    updateScore(diceValue);
    // Check for winner
    const gameOver = isGameOver();
    if(gameOver){
        getWinner();
    } else {
        // TODO switch players 
        switchPlayer();
    }
}
 
function createNewDice() {
// Create a new img element
    const newDiceElement = document.createElement("img");

// Set the src attribute of the new img element
    newDiceElement.src = "Dices/dice1.png";

// TODO Change this so it adds the correct class names based on the current player
    // newDiceElement.classList.add("player1-dice-face");
    if (currentPlayer == 1) {
        newDiceElement.classList.add("player1-dice-face");
        // TODO add roller1 id to this
        newDiceElement.id = "roller1";
        newDiceElement.addEventListener("click", function() {
            rollDicePlayer1();
            });
    } else {
        newDiceElement.classList.add("player2-dice-face");
        // TODO add roller2 id to this
        newDiceElement.id = "roller2";
        newDiceElement.addEventListener("click", function() {
            rollDicePlayer2();
            });
    }

    newDiceElement.addEventListener("dragstart", drag);
    newDiceElement.setAttribute("draggable", "true");
 

// TODO Append the new img element to the desired location on the page
// get handle on the appropriate parent element. Use if else
    let parentEl;
    //parentEl = document.getElementById()
if (currentPlayer == 1) {
    // Select the first parent element
    parentEl = document.getElementById("p1parent");
} else {
    // Select the second parent element
    parentEl = document.getElementById("p2parent");
}
    parentEl.appendChild(newDiceElement);
}

function updateScore(diceValue) {
    // Add the current dice value to the total score of the current player
    if (currentPlayer == 1) {
        console.log(`dice value: ${diceValue}`);
        playerOneScore += diceValue;
        playerOneBoxCount++;
    } else {
        console.log(`dice value: ${diceValue}`);
        playerTwoScore += diceValue;
        playerTwoBoxCount++;
    }

    updateTotalScoreDisplay();   
}

function updateTotalScoreDisplay() {
        // Update the total score display for player 1
        console.log(`score: ${playerOneScore}`)
        const score1Element = document.getElementById("total-score1");
        score1Element.textContent = playerOneScore;
    
        // Update the total score display for player 2
        const score2Element = document.getElementById("total-score2");
        score2Element.textContent = playerTwoScore;
    } 

// create a function to switch player
function switchPlayer() {
  if (currentPlayer == 1) {
      currentPlayer = 2;
  } else {
      currentPlayer = 1;
    }
  }
// determine if the game is over
  function isGameOver(){
    console.log(`box count 1: ${playerOneBoxCount}`);
    console.log(`box count 3: ${playerTwoBoxCount}`);
    return playerOneBoxCount === 9 && playerTwoBoxCount === 9;
}  

// the player who places their dice on the ninth box to finish the game will win unless their opponent has a higher total score 
function getWinner() {
    console.log("who is the winner")
    console.log('playerOneScore:', playerOneScore);
    console.log('playerTwoScore:', playerTwoScore);
    let winner;
    if (playerOneScore > playerTwoScore) {
        winner = 'The Lambs Wins!';
    } else if (playerTwoScore > playerOneScore) {
        winner = 'Flinky Wins!';
    } else {
        winner = 'A tie!';
    }
    alert(winner);
}


function resetGame() {
    let resetButton = document.getElementById('reset-button');
    // Reset the game state
    currentPlayer = 1;
    totalScore = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneBoxCount = 0;
    playerTwoBoxCount = 0;

    // Reset the score displays
    score1Element.textContent = 0;
    score2Element.textContent = 0;

    // Add any additional code here to reset other elements on your page


    resetButton.addEventListener('click', resetGame);
}

// TODO Create function to handle click event  

function removeListeners(){
}

function startGame(){
}

document.addEventListener('DOMContentLoaded', function() {
    startGame();
    imageButton.addEventListener("click", function() {
        rollDicePlayer1();
    });

    imageButton2.addEventListener("click", function() {
        rollDicePlayer2();
     });    

});





