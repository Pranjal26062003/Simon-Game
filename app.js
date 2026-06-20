


let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

// DOM Elements
const statusText = document.querySelector("#status");
const levelText = document.querySelector("#level");
const highScoreText = document.querySelector("#high-score");
const startBtn = document.querySelector("#start-btn");

// High Score
let highScore = localStorage.getItem("highScore") || 0;
highScoreText.innerText = highScore;

// Initial Status
statusText.innerText = "Press Key to Start Game";

// Start Game
function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];

        statusText.innerText = "Game Running";
        levelUp();
    }
}

// Start with Button
startBtn.addEventListener("click", startGame);

// Start with Keyboard
document.addEventListener("keypress", startGame);

// Flash Animation (Game)
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Flash Animation (User)
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Level Up
function levelUp() {
    userSeq = [];

    level++;

    levelText.innerText = level;
    statusText.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    gameFlash(randBtn);
}

// Check Answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            setTimeout(() => {
                levelUp();
            }, 1000);
        }

    } else {

        // Update High Score
        if (level > highScore) {
            highScore = level;

            localStorage.setItem("highScore", highScore);

            highScoreText.innerText = highScore;
        }

        statusText.innerHTML =
            `Game Over! Your score was <b>${level}</b><br>Press Start Game`;

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "#f4f6f9";
        }, 150);

        reset();
    }
}

// Button Press
function btnPress() {

    if (!started) return;

    const btn = this;

    userFlash(btn);

    const userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add Event Listeners
const allBtns = document.querySelectorAll(".btn");

allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

// Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    levelText.innerText = 0;
}