const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const clickBtn = document.getElementById("clickBtn");
const resetBtn = document.getElementById("resetBtn");
const powerBtn = document.getElementById("powerBtn");
const toastEl = document.getElementById("toast")

let score = 0;
let combo = 1;
let lastClickAt = 0;
let powerActive = false;
let powerTimeoutId = null;
let pointsPerClick = 1;

const btnclasses = ["btn-a", "btn-b", "btn-c", "btn-d", "btn-e"];
let btnClassIndex = 0;

function render() {
    scoreEl.textContent = String(score);
    comboEl.textContent = "x" + String(combo);
}

function updateCombo(now) {
    const dt = now -lastClickAt;
    if ( dt > 0 && dt < 450) combo = Math.min(5,combo +1 );
    else combo = 1;
}

function cycleButtoncolor() {
    clickBtn.classList.remove(btnclasses[btnClassIndex]);
    btnClassIndex = (btnClassIndex + 1) %
    btnclasses.length;
    clickBtn.classList.add(btnclasses[btnClassIndex]);
}

function toast(msg) {
    toastEl.hidden = false;
    toastEl.textContent = msg;
    setTimeout(() => {toastEl.hidden = true; }, 1200);
}

clickBtn.addEventListener("click", () => {
    const now = Date.now();
    updateCombo(now);

    const multiplayer = combo * (powerActive ? 2 : 1);
    score += (pointsPerClick * multiplayer);

    cycleButtoncolor();
    lastClickAt = now;

    if ( combo === 5) toast("MAX COMBO!");
    render();
});