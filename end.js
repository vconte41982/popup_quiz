const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.querySelector("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 7;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disable = !username.value;
});

saveHighScore = (e) => {
  e.preventDafault();
};
const score = {
  score: mostRecentScore
  name: username.value
}

highScores.push(score)

highScores.slice(7)

localStorage.setItem("highScore", JSON.stringify(higscores))
window.location.assign(/)
