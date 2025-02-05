import { aiMove, toggleAiMode } from "./ai.js";

export function Game(board, turnIndicator, restartButton, aiButton) {
    let boardState = Array(16).fill(null);
    let currentPlayer = "X";
    let gameOver = false;
    let winningCells = [];

    function render() {
        board.querySelectorAll(".cell").forEach((cell, index) => {
            cell.textContent = boardState[index];
            cell.classList.toggle("highlight", winningCells.includes(index));
        });
        if (gameOver) {
            setTimeout(() => {
                if (winningCells.length > 0) {
                    alert(`Player ${boardState[winningCells[0]]} wins!`);
                } else {
                    alert("It's a draw!");
                }
            }, 500);
        } else {
            turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
            [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
            [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
        ];
        for (const pattern of winPatterns) {
            const [a, b, c, d] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c] && boardState[a] === boardState[d]) {
                gameOver = true;
                winningCells = pattern;
                return boardState[a];
            }
        }
        return boardState.includes(null) ? null : "Draw";
    }

    function handleClick(event) {
        const index = [...board.children].indexOf(event.target);
        if (boardState[index] || gameOver) return;
        boardState[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === "Draw") {
                winningCells = [];
            }
        }
        render();
        if (aiMove && currentPlayer === "O" && !gameOver) setTimeout(() => aiMove(boardState, checkWinner, render, () => currentPlayer = "X"), 500);
    }

    function restartGame() {
        boardState.fill(null);
        gameOver = false;
        currentPlayer = "X";
        winningCells = [];
        render();
    }

    board.addEventListener("click", handleClick);
    restartButton.addEventListener("click", restartGame);
    aiButton.addEventListener("click", () => toggleAiMode(aiButton, restartGame));

    render();
}
