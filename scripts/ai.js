let aiModeActive = false;

export function aiMove(boardState, checkWinner, render, switchPlayer) {
    if (!aiModeActive) return;
    const emptyCells = boardState.map((value, index) => value === null ? index : null).filter(value => value !== null);
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomCell] = "O";
    const winner = checkWinner();
    if (!winner) {
        switchPlayer();
    }

    render();
}

export function toggleAiMode(aiButton, restartGame) {
    aiModeActive = !aiModeActive;
    aiButton.textContent = aiModeActive ? "AI Mode: ON" : "AI Mode: OFF";
    aiButton.style.backgroundColor = aiModeActive ? "green" : "red";
    restartGame();
}
