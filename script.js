let userScore = 0;
let computerScore = 0;
let is2Player = false;
let lastChoice = null;

const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("history");
const modeSwitch = document.getElementById("mode-switch");
const playerLabel = document.getElementById("player-label");

modeSwitch.addEventListener("change", () => {
  is2Player = modeSwitch.checked;
  playerLabel.textContent = is2Player ? "Player 2" : "Computer";
  resetGame();
});

function playGame(choice) {
  if (is2Player && lastChoice === null) {
    lastChoice = choice;
    resultDiv.textContent = "Player 2, make your move!";
    return;
  }

  const player1 = is2Player ? lastChoice : choice;
  const player2 = is2Player ? choice : getComputerChoice();
  const result = getResult(player1, player2);

  displayResult(player1, player2, result);
  updateScore(result);
  addToHistory(player1, player2, result);
  lastChoice = null;
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

function getResult(p1, p2) {
  if (p1 === p2) return "draw";
  if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "paper" && p2 === "rock") ||
    (p1 === "scissors" && p2 === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function displayResult(user, comp, result) {
  let msg = `Player 1 chose ${user} | ${is2Player ? "Player 2" : "Computer"} chose ${comp}. `;
  if (result === "win") {
    resultDiv.textContent = msg + "🎉 Player 1 Wins!";
    document.getElementById("win-sound").play();
  } else if (result === "lose") {
    resultDiv.textContent = msg + `🎉 ${is2Player ? "Player 2" : "Computer"} Wins!`;
    document.getElementById("lose-sound").play();
  } else {
    resultDiv.textContent = msg + "😐 It's a Draw!";
    document.getElementById("draw-sound").play();
  }
}

function updateScore(result) {
  if (result === "win") {
    userScore++;
  } else if (result === "lose") {
    computerScore++;
  }
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
}

function addToHistory(p1, p2, result) {
  const li = document.createElement("li");
  li.textContent = `You: ${p1} | ${is2Player ? "P2" : "CPU"}: ${p2} → ${result.toUpperCase()}`;
  historyList.prepend(li);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  lastChoice = null;
  userScoreSpan.textContent = "0";
  computerScoreSpan.textContent = "0";
  resultDiv.textContent = "Make your move!";
  historyList.innerHTML = "";
}
