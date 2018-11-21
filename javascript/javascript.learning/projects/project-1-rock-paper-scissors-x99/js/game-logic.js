// All code should be written in this file.

// 12 global variables
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;

let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

const P1 = 'Player One';
const P2 = 'Player Two';
const TIE = 'Tie';
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

//function setPlayerMoves
const setPlayerMoves = (player, m1t, m1v, m2t, m2v, m3t, m3v) => {
  // moveOneType = m1t, etc
  if (!m1t || !m1v || !m2t || !m2v || !m3t || !m3v) {
    return;
  }

  if (!validTypes(m1t, m2t, m3t)) {
    return;
  }

  if (!validValues(m1v, m2v, m3v)) {
    return;
  }

  switch (player) {
    case P1:
      playerOneMoveOneType = m1t;
      playerOneMoveOneValue = m1v;
      playerOneMoveTwoType = m2t;
      playerOneMoveTwoValue = m2v;
      playerOneMoveThreeType = m3t;
      playerOneMoveThreeValue = m3v;
      break;

    case P2:
      playerTwoMoveOneType = m1t;
      playerTwoMoveOneValue = m1v;
      playerTwoMoveTwoType = m2t;
      playerTwoMoveTwoValue = m2v;
      playerTwoMoveThreeType = m3t;
      playerTwoMoveThreeValue = m3v;
      break;
    }
};

const validTypes = (t1, t2, t3) => validType(t1) && validType(t2) && validType(t3);

const validType = (type) => (type === ROCK || type ===  PAPER || type === SCISSORS);

const validValues = (v1, v2, v3) => v1 >= 1 && v2 >= 1 && v3 >= 1 && v1 + v2 + v3 <= 99;

// function getRoundWinner Winner
const getRoundWinner = round => {
  let p1t;
  let p1v;
  let p2t;
  let p2v;

  switch (round) {
    case 1:
      p1t = playerOneMoveOneType;
      p1v = playerOneMoveOneValue;
      p2t = playerTwoMoveOneType;
      p2v = playerTwoMoveOneValue;
      break;

    case 2:
      p1t = playerOneMoveTwoType;
      p1v = playerOneMoveTwoValue;
      p2t = playerTwoMoveTwoType;
      p2v= playerTwoMoveTwoValue;
      break;

    case 3:
      p1t = playerOneMoveThreeType;
      p1v = playerOneMoveThreeValue;
      p2t = playerTwoMoveThreeType;
      p2v = playerTwoMoveThreeValue;
      break;

    default:
      return null;
    }

    return evaluateMove(p1t, p1v, p2t, p2v);
};

const evaluateMove = (p1t, p1v, p2t, p2v) => {
    // ensure all moves are present
    if (!p1t || !p1v || !p2t || !p2v) {
      return null;
    }

    // if the types are the same then the winner is based on the higher value
    if (p1t === p2t) {
      if (p1v === p2v) {
        return TIE;
      }
      return p1v > p2v ? P1 : P2;
    }

    // types are different, usual RPS rules apply
    switch (p1t) {
      case ROCK:
        return p2t === SCISSORS ? P1 : P2;

      case PAPER:
        return p2t === ROCK ? P1 : P2;

      case SCISSORS:
        return p2t === PAPER ? P1 : P2;
    }
};

let p1wins;
let p2wins;

const allGlobalsDefined = () =>
  playerOneMoveOneType &&
  playerOneMoveOneValue &&
  playerOneMoveTwoType &&
  playerOneMoveTwoValue &&
  playerOneMoveThreeType &&
  playerOneMoveThreeValue &&
  playerTwoMoveOneType &&
  playerTwoMoveOneValue &&
  playerTwoMoveTwoType &&
  playerTwoMoveTwoValue &&
  playerTwoMoveThreeType &&
  playerTwoMoveThreeValue;

// function getGameWinner
const getGameWinner = () => {
  if (!allGlobalsDefined()) {
    return null;
  }

  let r1Winner = getRoundWinner(1);
  let r2Winner = getRoundWinner(2);
  let r3Winner = getRoundWinner(3);

  p1wins = 0
  p2wins = 0;
  incrementScores(r1Winner);
  incrementScores(r2Winner);
  incrementScores(r3Winner);

  if (p1wins === p2wins) {
    return TIE;
  }
  return p1wins > p2wins ? P1 : P2;
};

const incrementScores = winner => {
  switch (winner) {
    case P1:
     p1wins += 1;
     break;

    case P2:
      p2wins += 1;
      break;
  }
};

// function setComputerMoves
const setComputerMoves = () => {
  setPlayer2MoveTypes();
  setPlayer2MoveValues();
};

const setPlayer2MoveTypes = () => {
  playerTwoMoveOneType = getRandomType();
  playerTwoMoveTwoType = getRandomType();
  playerTwoMoveThreeType = getRandomType();
};

const randomInteger = n => Math.floor(Math.random() * n);

const getRandomType = () => {
  switch (randomInteger(3)) {
    case 0: return ROCK;
    case 1: return PAPER;
    case 2: return SCISSORS;
  }
};

const setPlayer2MoveValues = () => {
  // each value must be at least 1, leaves 96 points to distibute
  let remaining = 96;
  let portion = randomInteger(remaining);
  playerTwoMoveOneValue = portion + 1;
  remaining -= portion;

  portion = randomInteger(remaining);
  playerTwoMoveTwoValue = portion + 1;
  remaining -= portion;

  playerTwoMoveThreeValue = remaining + 1;

  // console.log(`
  //  p2v1 = ${playerTwoMoveOneValue}
  //  p2v2 = ${playerTwoMoveTwoValue}
  //  p2v3 = ${playerTwoMoveThreeValue}
  //  `);
  
};
