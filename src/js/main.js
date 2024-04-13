let element = {
    box: document.querySelectorAll(".game_boxs_box"),
    turn: document.querySelector(".game_turn"),
    restart: document.querySelector(".game_restart"),
};

let { box, turn, restart } = element;

// variables
let currentPlayer = "X";
let winTurn = "Turn";
let gameEnded = false;

let listX = [];
let listO = [];

turn.textContent = `${currentPlayer} ${winTurn}`;

let winCondition = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
];

// function
function StartGame() {
    boxClick();
};

function boxClick() {
    box.forEach((e) => {
        e.addEventListener("click", handleBoxClick);
    });
};

function handleBoxClick(e) {
    const clickedBox = e.target;

    if (!gameEnded && clickedBox.textContent === "") {
        clickedBox.textContent = currentPlayer;
        updatePlayerMoves(e.target.getAttribute("index"));
        checkWin();
        switchPlayer();
        updateTurnText();
    }
    else {
        clickedBox.style = "cursor: no-drop;"
    };
};

function updatePlayerMoves(index) {
    currentPlayer == "X" ? listX.push(index) : listO.push(index);
};

function checkWin() {
    const currentMoves = currentPlayer == "X" ? listX : listO;

    for (let i = 0; i < winCondition.length; i++) {
        if (winCondition[i].every(e => currentMoves.includes(e))) {
            winTurn = "Win";
            gameEnded = true;
            break;
        };
    };
};

function switchPlayer() {
    if (!gameEnded == true) {

        currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
    };
};

function updateTurnText() {
    turn.textContent = `${currentPlayer} ${winTurn}`;
};

restart.addEventListener("click", () => {
    location.reload();
});

StartGame();