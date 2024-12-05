let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        running = true;
    }
});

pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    display.textContent = "00:00:00.00";
    laps.innerHTML = ""; 
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-time');
        lapElement.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(num, size = 2) {
    let s = "0" + num;
    return s.substr(s.length - size);
}
