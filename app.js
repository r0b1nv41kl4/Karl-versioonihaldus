const scoreE1 = document.getElementById('score')
const comboE1 = document.getElementById('combo')
const clickBtn = document.getElementById('clickBtn')
const resetBtn = document.getElementById('resetBtn')
const powerBtn = document.getElementById('powerBtn')
const toastE1 = document.getElementById('toast')

let score = 0;
let combo = 1;
let lastClickAt = 0;
let powerActive = false;
let powerTimeoutId = null;
let powerPerClick = 1;

function render() {
  scoreE1.textContent = String(score);
  comboE1.textContent = "x" + String(combo);
}

function updateCombo(now) {
  const dt = now -lastClickAt;
  if (dt > 0 && dt < 450) combo = Math.min(5,combo +1);
  else combo = 1
}

function cycleButtonColor() {
  clickBtn.classList.remove(btnclasses[btnClassIndex]);
  btnClassIndex = (btnClassIndex + 1) %
  btnclasses.length;
  clickBtn.classList.add(btnclasses[btnClassIndex]);
}

function toast(msg) {
  toastE1.hidden = false;
  toastE1.textContent = msg;
  setTimeout(()=> toastE1.hidden = true); 1200;
}

clickBtn.addEventListener('click', () => {
  const now = Date.now();
  updateCombo(now);

  const multiplayer = combo * (powerActive ? 2 : 1);
  score += (pointsPerClick * multiplayer);

  cycleButtonColor();
  lastClickAt = now;

  if (combo === 5) toast('max combo miees');
  render();
})