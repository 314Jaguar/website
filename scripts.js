document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    let isCircleTurn;

    const startGame = () => {
        isCircleTurn = false;
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('circle');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setMessage("Player X's turn");
    };

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = isCircleTurn ? 'circle' : 'x';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            setMessage(`${isCircleTurn ? "Player O" : "Player X"} Wins!`);
        } else if (isDraw()) {
            setMessage("It's a Draw!");
        } else {
            isCircleTurn = !isCircleTurn;
            setMessage(`Player ${isCircleTurn ? "O" : "X"}'s turn`);
        }
    };

    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    };

    const setMessage = (message) => {
        messageElement.innerText = message;
    };

    const isDraw = () => {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('circle');
        });
    };

    const checkWin = (currentClass) => {
        const WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    };

    restartButton.addEventListener('click', startGame);
    startGame();
});

function playRPS(choice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultElement = document.getElementById('rps-result');
    let result = '';

    if (choice === computerChoice) {
        result = `It's a tie! You both chose ${choice}.`;
    } else if (
        (choice === 'rock' && computerChoice === 'scissors') ||
        (choice === 'paper' && computerChoice === 'rock') ||
        (choice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${choice} beats ${computerChoice}.`;
    } else {
        result = `You lose! ${computerChoice} beats ${choice}.`;
    }

    resultElement.innerText = result;
}

let targetNumber = Math.floor(Math.random() * 100) + 1;

function guessNumber() {
    const guess = Number(document.getElementById('guessInput').value);
    const resultElement = document.getElementById('guess-result');
    if (guess === targetNumber) {
        resultElement.innerText = 'Congratulations! You guessed the correct number!';
        targetNumber = Math.floor(Math.random() * 100) + 1; // reset the game
    } else if (guess < targetNumber) {
        resultElement.innerText = 'Too low! Try again.';
    } else {
        resultElement.innerText = 'Too high! Try again.';
    }
}
