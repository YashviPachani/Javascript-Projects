let boxes = document.querySelectorAll('.box');//returns nodes
let turn = "X";
let winner = "";

const audio = new Audio('ting.mp3');
audio.playbackRate = 1.5;

const sound = new Audio('gameover.mp3');
let gameOverPlayed = false;



function handleGameOver() {
    if (!gameOverPlayed) {
    sound.play();
    gameOverPlayed = true;
  }

}
Array.from(boxes).forEach((box) => {

  box.addEventListener("click", () => {
    audio.play();
    let square = box.querySelector('.squares');
    if (square.innerHTML === "" && checkWin() === false) {
      box.classList.add('filled');
      square.innerHTML = turn;
      changeTurn();
      changeText();
    }
    if (checkWin()) {
      
      let boxes = document.querySelectorAll('.box');
      boxes.forEach(box => {
        box.classList.add('filled');
        handleGameOver();
      })
      
      audio.pause();
    }
  });

});

function changeTurn() {
  turn = turn === "X" ? "O" : "X";
}

function gifShown() {
  let gif = document.querySelector(".gif");
  gif.style.opacity = 1;
}
const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function checkWin() {
  let squares = document.querySelectorAll('.squares');
  for (let i = 0; i < winPattern.length; i++) {

    let [a, b, c] = winPattern[i];
    let pos1 = squares[a].innerHTML;
    let pos2 = squares[b].innerHTML;
    let pos3 = squares[c].innerHTML;
    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      winner = pos1;
      gifShown();
      return { winner: pos1, index: i };
    }

  }

  return false;
}

function changeText() {
  let result = checkWin();
  let turnText = document.querySelector('.turn-info');
  if (checkTie()) {
    turnText.innerHTML = `It's a Tie!`;
  }
  else if (!checkWin()) {
    turnText.innerHTML = `Turn for ${turn}`;
  }
  else {
    turnText.innerHTML = `Game Over... <br> ${result.winner} Won!!`;
    strikethru(result.index);
  }
}

function checkTie() {
  let square = document.querySelectorAll('.squares');

  // Check if all squares are filled
  for (let i of square) {
    if (i.innerHTML === "") {
      return false; // Not a tie, still empty square
    }
  }

  // All filled, but is it a tie?
  return checkWin() === false; // true only if no one has won
}

function strikethru(i) {
  const strike = document.querySelector('.strike');
  const strikeClasses = [
    "hori-0", "hori-1", "hori-2",
    "vert-0", "vert-1", "vert-2",
    "diagonal-0", "diagonal-1"
  ];
  strike.classList.add(strikeClasses[i]);
}

function resetStrikeLine() {
  const strike = document.querySelector('.strike');

  // Step 1: Disable transition temporarily
  strike.style.transition = "none";

  // Step 2: Remove all extra classes instantly
  strike.className = "strike"; // keep only base class

  // Step 3: Force reflow (to apply transition = none)
  void strike.offsetWidth;

  // Step 4: Re-enable transition for future animations
  strike.style.transition = "0.4s ease";
}

let reset = document.querySelector('.reset-button');
reset.addEventListener('click', () => {
  let allsquares = document.querySelectorAll('.squares');
  allsquares.forEach(square => {
    square.innerHTML = "";
  })

let boxes = document.querySelectorAll('.box');
      boxes.forEach(box => {
        box.classList.remove('filled');
      });
  turn = "X";
  gameOverPlayed=false;
  resetStrikeLine();
  changeText();
  document.querySelector(".gif").style.opacity = 0;
})