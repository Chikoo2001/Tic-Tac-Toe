const gameBoard = document.querySelector(".game-board");
const turn = document.querySelector(".turn");
const btn = document.querySelector(".reset");
const audioTurn = new Audio("ting.mp3");
const winTune = new Audio("win.mp3");
const gameOver = new Audio("gameover.mp3");
const image = document.querySelector(".image");
let player = 'X';
let count = 0;
let winStatus = false;

gameBoard.addEventListener("click", enterChar);
btn.addEventListener("click", reset);

function enterChar(e) {
    const item = e.target;
    audioTurn.play();
    if (item.innerText === "") {
        item.innerText = player;
        winStatus = checkWin();
        if (winStatus) {
            turn.innerText = `${player} Won`;
            btn.innerText = "Play Again";
            gameBoard.style.opacity = "0.5";
            image.style.display = "inline-block";
            gameBoard.removeEventListener("click", enterChar);
            winTune.play();
        } else if (count === 8) {
            let status = `It's a draw`;
            turn.innerText = status;
            btn.innerText = "Play Again";
            gameBoard.style.opacity = "0.5";
            gameOver.play();
        }else {
            player = (player === "X") ? "O" : "X";
            count++;
            turn.innerText = `${player}'s turn`;
       }     
    }
}

function reset () {
    if (btn.innerText === "Play Again") {
        gameBoard.style.opacity = "1";
        btn.innerText = "Reset Game";
        clearBoard();
        clearLine();
        winTune.pause();
        winTune.currentTime = 0;
    } else if (btn.innerText === "Reset Game") {
        clearBoard();
    }
}

function clearBoard() {
    const childrens = gameBoard.childNodes;
    childrens.forEach(child => {
        child.innerText = "";
    });
    count = 0;
    player = "X";
    turn.innerText = `${player}'s turn`;
    image.style.display = "none";
    gameBoard.addEventListener("click", enterChar);
}

function checkWin() {
    let elements = document.getElementsByClassName("text");
    let won = false;
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach(e => {
        if ((elements[e[0]].innerText !== "" ) && (elements[e[0]].innerText === elements[e[1]].innerText) && (elements[e[1]].innerText === elements[e[2]].innerText)) {
            won = true;
            if (wins.indexOf(e) < 3) {
                elements[e[0]].classList.add("win-h");
                elements[e[1]].classList.add("win-h");
                elements[e[2]].classList.add("win-h");
            } else if (wins.indexOf(e) < 6) {
                elements[e[0]].classList.add("win-v");
                elements[e[1]].classList.add("win-v");
                elements[e[2]].classList.add("win-v");
            } else if (wins.indexOf(e) === 6) {
                elements[e[0]].classList.add("win-d");
                elements[e[1]].classList.add("win-d");
                elements[e[2]].classList.add("win-d");
            } else {
                elements[e[0]].classList.add("win-ad");
                elements[e[1]].classList.add("win-ad");
                elements[e[2]].classList.add("win-ad");
            }
            
        }
    })
    return won; 
}

function clearLine() {
    let elements = document.getElementsByClassName("text");
    for (let i = 0; i < elements.length; i++) {
        let classes = elements[i].classList;
        if (classes[classes.length-1].includes("win")) {
            classes.remove(classes[classes.length - 1]);
        }
    }
}

