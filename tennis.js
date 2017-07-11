function* pointsGenerator() {
  let currentScore;

  currentScore = 0;
  yield currentScore;

  currentScore = 15;
  yield currentScore;

  currentScore = 30;
  yield currentScore;

  currentScore = 40;
  let scoreOtherPlayer;
  scoreOtherPlayer = yield currentScore;
  while (true) {
    if (scoreOtherPlayer === 40 || (scoreOtherPlayer == "D" && currentScore == "D")) {
      currentScore = "A";
      scoreOtherPlayer = yield currentScore;
    } else if (scoreOtherPlayer === "A") {
      currentScore = "D";
      scoreOtherPlayer = yield currentScore;
    } else {
      yield "win";
      break;
    }
  }
}

class Match {
  constructor() {
    this.resetGameScore();
    this.gamesPlayerA = 0;
    this.gamesPlayerB = 0;
  }
  resetGameScore() {
    this.pointsGeneratorPlayerA = pointsGenerator();
    this.pointsGeneratorPlayerB = pointsGenerator();
    this.pointsPlayerA = this.pointsGeneratorPlayerA.next().value;
    this.pointsPlayerB = this.pointsGeneratorPlayerB.next().value;
  }
  scorePoint(player) {
    if (player === "playerA") {
      let point = this.pointsGeneratorPlayerA.next(this.pointsPlayerB).value;
      if (point === "win") {
        this.gamesPlayerA++;
        this.resetGameScore();
      } else if (point === "D") {
        this.pointsPlayerA = point;
        this.pointsPlayerB = point;
      } else {
        this.pointsPlayerA = point;
      }
    }
    if (player === "playerB") {
      let point = this.pointsGeneratorPlayerB.next(this.pointsPlayerA).value;
      if (point === "win") {
        this.gamesPlayerB++;
        this.resetGameScore();
      } else if (point === "D") {
        this.pointsPlayerA = point;
        this.pointsPlayerB = point;
      } else {
        this.pointsPlayerB = point;
      }
    }
  }
  getGameScore() {
    if (this.pointsPlayerA === "A") return "Adv A";
    if (this.pointsPlayerB === "A") return "Adv B";
    if (this.pointsPlayerA === "D") return "Deuce";
    if (this.pointsPlayerB === "D") return "Deuce";
    return `${this.pointsPlayerA}-${this.pointsPlayerB}`;
  }
  getScore() {
    return `${this.gamesPlayerA}/${this.gamesPlayerB} ${this.getGameScore()}`;
  }
}

module.exports = { Match, pointsGenerator };
