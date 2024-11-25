const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const playerVsPlayerButton = document.getElementById('playerVsPlayerButton');
const playerVsComputerButton = document.getElementById('playerVsComputerButton');
const modeSelection = document.getElementById('modeSelection');
const gameBoard = document.getElementById('game');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playerVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

playerVsPlayerButton.addEventListener('click', () => startGame(false));
playerVsComputerButton.addEventListener('click', () => startGame(true));
resetButton.addEventListener('click', resetGame);

function startGame(vsComputer) {
    playerVsComputer = vsComputer;
    modeSelection.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    message.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    message.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] !== '' || !gameActive || (playerVsComputer && currentPlayer === 'O')) return;

    makeMove(cellIndex);

    if (playerVsComputer && gameActive) {
        setTimeout(computerMove, 500);  // Add delay for computer move
    }
}

function makeMove(index) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        message.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s turn`;
    }
}

function computerMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    makeMove(availableCells[randomIndex]);
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameBoard.classList.add('hidden');
    message.classList.add('hidden');
    resetButton.classList.add('hidden');
    modeSelection.classList.remove('hidden');
}
