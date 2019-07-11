const win = document.getElementById("win");
const lose = document.getElementById("lose");
const draw = document.getElementById("draw");

let numOfWins = JSON.parse(localStorage.getItem("wins"));
let numOfLoses = JSON.parse(localStorage.getItem("loses"));
let numOfDraws = JSON.parse(localStorage.getItem("draws"));

if (numOfWins === null) {
  win.innerHTML = "0";
} else {
  win.innerHTML = numOfWins;
}

if (numOfLoses === null) {
  lose.innerHTML = "0";
} else {
  lose.innerHTML = numOfLoses;
}

if (numOfDraws === null) {
  draw.innerHTML = "0";
} else {
  draw.innerHTML = numOfDraws;
}


function resetScores() {
  localStorage.removeItem("wins");
  localStorage.removeItem("loses");
  localStorage.removeItem("draws");
  win.innerHTML = "0";
  lose.innerHTML = "0";
  draw.innerHTML = "0";
}
