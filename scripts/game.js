export function Game(board, turnIndicator, restartButton, aiButton) {
    let boardState = Array(16).fill(null);
    let currentPlayer = "X";
    let gameOver = false;
    let aiModeActive = false;
    let winningCells = [];

    function render() {
        board.querySelectorAll(".cell").forEach((cell, index) => {
            cell.textContent = boardState[index];
            cell.classList.toggle("highlight", winningCells.includes(index));
        });
        turnIndicator.textContent = gameOver ? "Game Over" : `Player ${currentPlayer}'s turn`;
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
            turnIndicator.textContent = winner === "Draw" ? "It's a draw!" : `Player ${winner} Wins!`;
        }
        render();
        if (aiModeActive && currentPlayer === "O" && !gameOver) setTimeout(aiMove, 500);
    }

    function aiMove() {
        const emptyCells = boardState.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (emptyCells.length === 0) return;
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        boardState[randomCell] = "O";
        currentPlayer = "X";
        checkWinner();
        render();
    }

    function restartGame() {
        boardState.fill(null);
        gameOver = false;
        currentPlayer = "X";
        winningCells = [];
        render();
    }

    function toggleAiMode() {
        aiModeActive = !aiModeActive;
        aiButton.textContent = aiModeActive ? "AI Mode: ON" : "AI Mode: OFF";
        aiButton.style.backgroundColor = aiModeActive ? "green" : "red";
        restartGame();
    }

    board.addEventListener("click", handleClick);
    restartButton.addEventListener("click", restartGame);
    aiButton.addEventListener("click", toggleAiMode);
    render();
}