const QS = (e) => document.querySelector(e),
  QSA = (e) => document.querySelectorAll(e);

const buttonGame = QSA("main .game .button-game-default");
const game = QS("main .game");
const selectedButton = QS("main .selected-button");
const comPickedButton = selectedButton.querySelector(
  ".button-com-picked .button-picked-default"
);
const youPickedButton = selectedButton.querySelector(
  ".button-picked .button-picked-default"
);

console.log(comPickedButton);
console.log(youPickedButton);
const youPickedButtonIMG = youPickedButton.querySelector("img");
const comPickedButtonIMG = comPickedButton.querySelector("img");
const arrayNamesGame = ["scissors", "spock", "paper", "lizard", "rock"];

const gamePlayAgain = selectedButton.querySelector(".button-play-again");
const buttonPlayAgain = gamePlayAgain.querySelector("button");

const scoreValue = QS("[data-value]");
const tiedValue = QS("[data-tied]");
const loseValue = QS("[data-lose]");

let numberButtonSelected = 0;
let numberComAleatory = 0;

let score;
let lose;
let tied;

if (localStorage.getItem("score")) {
  score = +localStorage.getItem("score");
  scoreValue.innerText = score;
} else {
  score = 0;
}

if (localStorage.getItem("tied")) {
  tied = +localStorage.getItem("tied");
  tiedValue.innerText = tied;
} else {
  tied = 0;
}

if (localStorage.getItem("lose")) {
  lose = +localStorage.getItem("lose");
  loseValue.innerText = lose;
} else {
  lose = 0;
}

function buttonSelected(index, numberAleatory) {
  buttonPlayAgain.addEventListener("click", PlayAgain);
  game.style.display = "none";
  selectedButton.style.display = "flex";
  youPickedButton.classList.add(`color-game-${index}`);
  youPickedButtonIMG.src = `./images/icon-${arrayNamesGame[index]}.svg`;
  youPickedButtonIMG.alt = arrayNamesGame[index];
  comPickedButton.classList.add("animationRotate");
  setTimeout(() => {
    comPickedButton.classList.remove("animationRotate");
    comPickedButton.classList.add(`color-game-${numberAleatory}`);
    comPickedButtonIMG.src = `./images/icon-${arrayNamesGame[numberAleatory]}.svg`;
    comPickedButtonIMG.alt = arrayNamesGame[numberAleatory];
    gamePlayAgain.style.display = "block";
    resultFinal();
  }, 2000);
}

function PlayAgain() {
  game.style.display = "block";
  selectedButton.style.display = "none";
  gamePlayAgain.style.display = "none";

  youPickedButton.classList.remove(`color-game-${numberButtonSelected}`);
  youPickedButtonIMG.src = `./images/question-solid.svg`;
  comPickedButton.classList.remove(`color-game-${numberComAleatory}`);
  comPickedButtonIMG.src = `./images/question-solid.svg`;
  youPickedButtonIMG.alt = "Interrogation 1";
  comPickedButtonIMG.alt = "Interrogation 2";
  youPickedButton.classList.remove("shadow-win");
  comPickedButton.classList.remove("shadow-win");
}

function resultFinal() {
  const myGame = arrayNamesGame[numberButtonSelected];
  const COMGame = arrayNamesGame[numberComAleatory];
  let resultGame = "";

  buttonPlayAgain.classList.remove("win");
  buttonPlayAgain.classList.remove("tied");
  buttonPlayAgain.classList.remove("lose");

  if (
    (myGame === "scissors" && (COMGame === "paper" || COMGame === "lizard")) ||
    (myGame === "paper" && (COMGame === "rock" || COMGame === "spock")) ||
    (myGame === "rock" && (COMGame === "lizard" || COMGame === "scissors")) ||
    (myGame === "lizard" && (COMGame === "spock" || COMGame === "paper")) ||
    (myGame === "spock" && (COMGame === "scissors" || COMGame === "rock"))
  ) {
    winGame();
  } else if (myGame === COMGame) {
    tiedGame();
  } else {
    loseGame();
  }
}

function winGame() {
  score++;
  scoreValue.innerText = score;
  localStorage.setItem("score", score);
  gamePlayAgain.querySelector("h2").innerText = "YOU WIN";
  buttonPlayAgain.classList.add("win");

  youPickedButton.classList.add("shadow-win");
}

function tiedGame() {
  tied++;
  tiedValue.innerText = tied;
  localStorage.setItem("tied", tied);
  gamePlayAgain.querySelector("h2").innerText = "TIED";
  buttonPlayAgain.classList.add("tied");
}

function loseGame() {
  lose++;
  loseValue.innerText = lose;
  localStorage.setItem("lose", lose);
  gamePlayAgain.querySelector("h2").innerText = "YOU LOSE";
  buttonPlayAgain.classList.add("lose");

  comPickedButton.classList.add("shadow-win");
}

buttonGame.forEach((e, index) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    numberComAleatory = Math.floor(Math.random() * (5 - 0) + 0);
    buttonSelected(index, numberComAleatory);
    numberButtonSelected = index;
  });
});

const modal = QS(".modal-content");
const buttonCloseModal = modal.querySelector(".modal button");
const buttonOpenModal = QS("div.app .button-rules");

buttonOpenModal.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.classList.remove("close-modal");
  modal.classList.add("open-modal");
});

buttonCloseModal.addEventListener("click", () => {
  modal.classList.remove("open-modal");
  modal.classList.add("close-modal");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
});
