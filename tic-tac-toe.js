const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));
document.querySelector('.game-restart').addEventListener('click', RestartGame);

function CellClick(clickedCellEvent) {    
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }   
    CellPlayed(clickedCell, clickedCellIndex);
    ResultValidation();
}

function CellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function ResultValidation() {
	let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winPattern = winningPatterns[i];
        let a = gameState[winPattern[0]];
        let b = gameState[winPattern[1]];
        let c = gameState[winPattern[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
	if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    PlayerChange();
}
function PlayerChange() {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function RestartGame() {
	location.reload();
}
