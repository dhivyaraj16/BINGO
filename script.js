// Emoji set
const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];

let cardsArray = [];
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let bestScore = localStorage.getItem('bestScore') || null;

// DOM
const gameBoard = document.getElementById('gameBoard');
const movesSpan = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');
const overlay = document.getElementById('congrats');
const playAgainBtn = document.getElementById('playAgainBtn');
const timerSpan = document.getElementById('timer');
const bestScoreSpan = document.getElementById('bestScore');

// Sounds
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');
const winSound = new Audio('sounds/win.mp3');

function initGame() {
  // reset
  cardsArray = [...emojis, ...emojis];
  flippedCards = [];
  lockBoard = false;
  matchedCount = 0;
  moves = 0;
  timer = 0;
  clearInterval(timerInterval);
  timerSpan.textContent = 'Time: 0s';
  movesSpan.textContent = 'Moves: 0';
  gameBoard.innerHTML = '';
  overlay.classList.add('hidden');

  shuffle(cardsArray);
  createBoard();
  startTimer();

  if (bestScore) {
    bestScoreSpan.textContent = `Best: ${bestScore}s`;
  } else {
    bestScoreSpan.textContent = 'Best: --';
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  cardsArray.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = emoji;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.textContent = '?';

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => handleCardClick(card));

    gameBoard.appendChild(card);
  });
}

function handleCardClick(card) {
  if (lockBoard) return;
  if (card.classList.contains('flip')) return;
  if (flippedCards.length === 1 && flippedCards[0] === card) return;

  card.classList.add('flip');
  flipSound.play();
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesSpan.textContent = 'Moves: ' + moves;
    lockBoard = true;

    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      matchedCount++;
      matchSound.play();
      resetFlipped();
      if (matchedCount === emojis.length) {
        setTimeout(() => {
          gameWin();
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        resetFlipped();
      }, 1000);
    }
  }
}

function resetFlipped() {
  flippedCards = [];
  lockBoard = false;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerSpan.textContent = `Time: ${timer}s`;
  }, 1000);
}

function gameWin() {
  clearInterval(timerInterval);
  overlay.classList.remove('hidden');
  launchConfetti();
  winSound.play();

  // Save best score
  if (!bestScore || timer < bestScore) {
    bestScore = timer;
    localStorage.setItem('bestScore', bestScore);
    bestScoreSpan.textContent = `Best: ${bestScore}s`;
  }
}

restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

function launchConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#ff69b4', '#ffa07a', '#87cefa'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

// Start
initGame();
