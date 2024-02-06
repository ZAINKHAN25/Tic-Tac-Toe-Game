const resultdiv = document.querySelector("#resultdiv");
const oneline1 = document.querySelector("#oneline1");
const oneline2 = document.querySelector("#oneline2");
const oneline3 = document.querySelector("#oneline3");
const twoline1 = document.querySelector("#twoline1");
const twoline2 = document.querySelector("#twoline2");
const twoline3 = document.querySelector("#twoline3");
const threeline1 = document.querySelector("#threeline1");
const threeline2 = document.querySelector("#threeline2");
const threeline3 = document.querySelector("#threeline3");
const btnofsecondpage = document.querySelector(".btn-of-second-page");
const secondpage = document.querySelector(".second-page");
const gamewrapper = document.querySelector(".game-wrapper");
const headingofsecondpage = document.querySelector(".headingofsecondpage");

let allcolls = [oneline1, oneline2, oneline3, twoline1, twoline2, twoline3, threeline1, threeline2, threeline3];

let playerTurn = true; // if true so the x turn and if false then y turn;

let players = ["0", "X"];

btnofsecondpage.addEventListener("click", startGame);

function startGame() {
    gamewrapper.classList.remove("none");
    secondpage.classList.add("none");
    resetGame();
}

function resetGame() {
    resultdiv.innerHTML = "";
    playerTurn = true;

    allcolls.forEach(cell => {
        cell.innerHTML = "";
        cell.addEventListener("click", handleCellClick);
    });

    playerturnfoo();
}

function handleCellClick() {
    const cell = this;

    if (cell.innerHTML == "") {
        cell.innerHTML = `${playerTurn ? "<span class='red'>X</span>" : "<span class='white'>0</span>"}`;
        playerTurn = !playerTurn;
        playerturnfoo();
        checkForWinner();
    }
}

function checkForWinner() {
    const winningConditions = [
        [oneline1, oneline2, oneline3],
        [twoline1, twoline2, twoline3],
        [threeline1, threeline2, threeline3],
        [oneline1, twoline1, threeline1],
        [oneline2, twoline2, threeline2],
        [oneline3, twoline3, threeline3],
        [oneline1, twoline2, threeline3],
        [oneline3, twoline2, threeline1],
    ];

    for (const condition of winningConditions) {
        const [cell1, cell2, cell3] = condition;
        if (
            cell1.innerHTML !== "" &&
            cell1.innerHTML === cell2.innerHTML &&
            cell2.innerHTML === cell3.innerHTML
        ) {
            gamewrapper.classList.add("none");
            secondpage.classList.remove("none");
            headingofsecondpage.innerHTML = `${cell1.innerHTML} Won`;
            allcolls.forEach(cell => cell.removeEventListener("click", handleCellClick));
            btnofsecondpage.innerHTML = "Restart The Game";
            return;
        }
    }
    
    if (allcolls.every(cell => cell.innerHTML !== "")) {
        gamewrapper.classList.add("none");
        secondpage.classList.remove("none");
        headingofsecondpage.innerHTML = "It's a draw!";
        btnofsecondpage.innerHTML = "Restart The Game";
        return;
    }
}

function playerturnfoo() {
    resultdiv.innerHTML = `${playerTurn ? "X Turn" : "0 Turn"}`
}
