
let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowerHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let prevGuess = [];
let numGuess = 0;
let playGame = true;

// Submit button event
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();

        const guess = parseInt(userInput.value);

        validGuess(guess);
    });
}

// Validate user input
function validGuess(guess) {

    if (isNaN(guess)) {
        alert('Please enter a valid number');

    } else if (guess < 1) {
        alert('Please enter a number more than 0');

    } else if (guess > 100) {
        alert('Please enter a number less than 101');

    } else {
        prevGuess.push(guess);

        displayGuess(guess);

        if (guess === randomNumber) {
            displayMessage('You guessed it right!');
            endGame();

        } else if (numGuess === 10) {
            displayMessage(`Game Over! Random number was ${randomNumber}`);
            endGame();

        } else {
            checkGuess(guess);
        }
    }
}

// Check whether guess is high or low
function checkGuess(guess) {

    if (guess < randomNumber) {
        displayMessage('Number is TOO low');

    } else if (guess > randomNumber) {
        displayMessage('Number is TOO high');
    }
}

// Display previous guesses
function displayGuess(guess) {

    userInput.value = '';

    guessSlot.innerHTML += `${guess}  `;

    numGuess++;

    remaining.innerHTML = `${10 - numGuess}`;
}

// Display message
function displayMessage(message) {

    lowerHi.innerHTML = `<h2>${message}</h2>`;
}

// End game
function endGame() {

    userInput.disabled = true;
    submit.disabled = true;

    const newGameButton = document.createElement('button');

    newGameButton.id = 'newGame';
    newGameButton.classList.add('button');
    newGameButton.innerText = 'Start New Game';

    startOver.appendChild(newGameButton);

    playGame = false;

    newGame();
}

// Start a new game
function newGame() {

    const newGameButton = document.querySelector('#newGame');

    newGameButton.addEventListener('click', function () {

        randomNumber = parseInt(Math.random() * 100 + 1);

        prevGuess = [];

        numGuess = 0;

        guessSlot.innerHTML = '';

        remaining.innerHTML = '10';

        lowerHi.innerHTML = '';

        userInput.disabled = false;

        submit.disabled = false;

        startOver.removeChild(newGameButton);

        playGame = true;

    });
}
