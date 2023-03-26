const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let score = 0;
let time = 10;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

difficultySelect.value = difficulty;

text.focus();
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const updateDom = () => {
  word.textContent = getRandomWord();
};
updateDom();

const scoreCounter = () => {
  score++;
  scoreEl.textContent = score;
};

const gameOver = () => {
  endgameEl.innerHTML = `
  <h1> Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  
  `;
  endgameEl.style.display = 'flex';
};

const timeInterval = setInterval(timeDown, 1000);

const timer = (timeDown) => {
  if (time >= 0) {
    setInterval(timeDown, 1000);
  } else {
    return;
  }
};

function timeDown() {
  time--;
  timeEl.textContent = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

text.addEventListener('input', () => {
  if (text.value.toLowerCase() === word.textContent) {
    updateDom();
    scoreCounter();
    text.value = '';

    switch (difficulty) {
      case 'easy':
        time += 4;
        break;
      case 'medium':
        time += 3;
        break;
      case 'hard':
        time += 2;
        break;
    }
  }
});

settingsForm.addEventListener('change', (e) => {
  localStorage.setItem('difficulty', e.target.value);
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});
