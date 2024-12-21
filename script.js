const hoursLabel = document.getElementById('hours');
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

/// stopwatch variables

let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
}

function pauseTimer() {
    clearInterval(interval); 
    addToLapList();
    interval = setInterval(updateTimer, 1000); 
    startButton.disabled = false; 
}

function stopTimer() {
    clearInterval(interval);
    addToLapList(); 
    startButton.disabled = false; 
}


function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    displayTimer();
}

function displayTimer() {
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);  
    hoursLabel.textContent = padTime(hours);  
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapList.innerHTML = '';
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}
