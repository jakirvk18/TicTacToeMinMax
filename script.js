// Game State Variables
let board = Array(9).fill(null);
let playerSymbol = '';
let aiSymbol = '';
let currentPlayer = '';
let isGameActive = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const symbolSelectScreen = document.getElementById('symbol-select-screen');
const gameScreen = document.getElementById('game-screen');
const resultPopup = document.getElementById('result-popup');
const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const playerSymbolDisplay = document.getElementById('player-symbol-display');
const aiSymbolDisplay = document.getElementById('ai-symbol-display');
const resultMessage = document.getElementById('result-message');
const winnerInfo = document.getElementById('winner-info');
const startBtn = document.getElementById('start-btn');
const selectXBtn = document.getElementById('select-x-btn');
const selectOBtn = document.getElementById('select-o-btn');
const backBtn = document.getElementById('back-btn');
const resetBtn = document.getElementById('reset-btn');
const closePopupBtn = document.getElementById('close-popup-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
];

// --- Game Flow Functions ---

// Function to show a specific screen and hide others
function showScreen(screenId) {
    startScreen.classList.add('hidden');
    symbolSelectScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    backBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');

    if (screenId === 'start') {
        startScreen.classList.remove('hidden');
    } else if (screenId === 'select') {
        symbolSelectScreen.classList.remove('hidden');
        backBtn.classList.remove('hidden');
        backBtn.onclick = () => showScreen('start');
    } else if (screenId === 'game') {
        gameScreen.classList.remove('hidden');
        backBtn.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
        backBtn.onclick = () => showScreen('select');
        resetBtn.onclick = resetGame;
    }
}

// Initialize the game state and UI
function startGame() {
    showScreen('select');
}

// Reset the game to the initial state without changing symbols
function resetGame() {
    board.fill(null);
    isGameActive = true;
    gameBoard.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('beats', 'bg-gray-500', 'text-shadow-lg');
    });
    resultPopup.classList.add('hidden');

    // Correctly determine the starting player after reset
    if (playerSymbol === 'X') {
        currentPlayer = playerSymbol;
        updateStatus(`It's your turn!`);
    } else {
        currentPlayer = aiSymbol;
        updateStatus(`AI is thinking...`);
        setTimeout(aiMove, 500);
    }
}

// Set player and AI symbols and start the game
function selectSymbol(symbol) {
    playerSymbol = symbol;
    aiSymbol = (symbol === 'X') ? 'O' : 'X';

    // Display player and AI symbols with colors
    playerSymbolDisplay.innerHTML = `<i class="fa-solid fa-${playerSymbol === 'X' ? 'xmark' : 'o'}"></i>`;
    aiSymbolDisplay.innerHTML = `<i class="fa-solid fa-${aiSymbol === 'X' ? 'xmark' : 'o'}"></i>`;
    playerSymbolDisplay.style.color = `var(--${playerSymbol.toLowerCase()}-color)`;
    aiSymbolDisplay.style.color = `var(--${aiSymbol.toLowerCase()}-color)`;


    showScreen('game');
    resetGame();
}

// Update the game status display
function updateStatus(message) {
    gameStatus.textContent = message;
}

// Handle a player's move
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    // Check if the cell is already filled or if the game is inactive
    if (board[index] !== null || !isGameActive || currentPlayer !== playerSymbol) {
        return;
    }

    // Make the move and update the board
    board[index] = playerSymbol;
    cell.innerHTML = `<i class="fa-solid fa-${playerSymbol === 'X' ? 'xmark' : 'o'}" style="color: var(--${playerSymbol.toLowerCase()}-color);"></i>`;

    // Check for game end conditions
    const winCombination = checkWin(board, playerSymbol);
    if (winCombination) {
        endGame(playerSymbol, winCombination);
        return;
    }
    if (checkDraw(board)) {
        endGame('draw');
        return;
    }

    // Switch turn to AI
    currentPlayer = aiSymbol;
    updateStatus(`AI is thinking...`);
    setTimeout(aiMove, 500);
}

// --- AI Logic (Minimax) ---

// Find the best move for the AI
function findBestMove(currentBoard) {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
            currentBoard[i] = aiSymbol;
            const score = minimax(currentBoard, 0, false);
            currentBoard[i] = null; // Undo the move
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

// Minimax algorithm to find the optimal move
function minimax(currentBoard, depth, isMaximizing) {
    if (checkWin(currentBoard, aiSymbol)) return 10 - depth;
    if (checkWin(currentBoard, playerSymbol)) return depth - 10;
    if (checkDraw(currentBoard)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = aiSymbol;
                bestScore = Math.max(bestScore, minimax(currentBoard, depth + 1, false));
                currentBoard[i] = null;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = playerSymbol;
                bestScore = Math.min(bestScore, minimax(currentBoard, depth + 1, true));
                currentBoard[i] = null;
            }
        }
        return bestScore;
    }
}

// AI makes a move based on minimax
function aiMove() {
    if (!isGameActive) return;

    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
        board[bestMove] = aiSymbol;
        const cell = gameBoard.querySelector(`[data-index="${bestMove}"]`);
        cell.innerHTML = `<i class="fa-solid fa-${aiSymbol === 'X' ? 'xmark' : 'o'}" style="color: var(--${aiSymbol.toLowerCase()}-color);"></i>`;

        const winCombination = checkWin(board, aiSymbol);
        if (winCombination) {
            endGame(aiSymbol, winCombination);
            return;
        }
        if (checkDraw(board)) {
            endGame('draw');
            return;
        }
    }

    // Switch turn back to player
    currentPlayer = playerSymbol;
    updateStatus(`It's your turn!`);
}

// --- Game State Checkers ---

// Check if a player has won
function checkWin(currentBoard, symbol) {
    for (const combination of winningConditions) {
        if (combination.every(index => currentBoard[index] === symbol)) {
            return combination;
        }
    }
    return null;
}

// Check for a draw
function checkDraw(currentBoard) {
    return currentBoard.every(cell => cell !== null);
}

// --- End Game Functions ---

// Display the end game result popup
function endGame(winner, winCombination = null) {
    isGameActive = false;
    resultPopup.classList.remove('hidden');

    if (winner === 'draw') {
        resultMessage.textContent = 'Game Over!';
        winnerInfo.textContent = 'It\'s a Draw!';
        winnerInfo.classList.remove('text-green-400', 'text-red-400');
        winnerInfo.classList.add('text-gray-400');
    } else {
        resultMessage.textContent = 'Game Over!';
        if (winner === playerSymbol) {
            winnerInfo.innerHTML = `<span class="text-green-400">You Win!</span>`;
        } else {
            winnerInfo.innerHTML = `<span class="text-red-400">AI Wins!</span>`;
        }
        // Add beat animation to winning cells
        if (winCombination) {
            winCombination.forEach(index => {
                const cell = gameBoard.querySelector(`[data-index="${index}"]`);
                cell.classList.add('beats', 'bg-gray-500' , 'text-shadow-lg');
            });
        }
    }
}

// Event Listeners
startBtn.addEventListener('click', startGame);
selectXBtn.addEventListener('click', () => selectSymbol('X'));
selectOBtn.addEventListener('click', () => selectSymbol('O'));
gameBoard.addEventListener('click', handleCellClick);

playAgainBtn.addEventListener('click', () => {
    resultPopup.classList.add('hidden');
    resetGame();
});

closePopupBtn.addEventListener('click', () => {
    resultPopup.classList.add('hidden');
});

resetBtn.addEventListener('click', resetGame);

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Initial screen setup
showScreen('start');