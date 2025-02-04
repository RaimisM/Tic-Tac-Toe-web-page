import { Game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game(
        document.querySelector(".board"),
        document.getElementById("turn-indicator"),
        document.getElementById("restart-button"),
        document.querySelector("[ai-mode]")
    );
    game.init();
});