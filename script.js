function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${day}/${month}/${year}`;
}

let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchSeconds = 0;

function updateStopwatch() {
    const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
    const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

document.getElementById('startStop').addEventListener('click', () => {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            updateStopwatch();
        }, 1000);
    }
    stopwatchRunning = !stopwatchRunning;
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchSeconds = 0;
    updateStopwatch();
});

let alarmTime = null;
let alarmTimeout = null;
const alarmSound = document.getElementById('alarmSound');

document.getElementById('setAlarm').addEventListener('click', () => {
    const alarmInput = document.getElementById('alarmTime').value;
    if (alarmInput) {
        const [hours, minutes] = alarmInput.split(':');
        alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        const now = new Date();
        const timeToAlarm = alarmTime.getTime() - now.getTime();

        if (timeToAlarm >= 0) {
            alarmTimeout = setTimeout(() => {
                document.getElementById('alarmMessage').style.display = 'block';
                alarmSound.play();
                alert('⏰ Alarme !');
            }, timeToAlarm);
        } else {
            alert('L\'heure de l\'alarme doit être dans le futur.');
        }
    }
});

function checkAlarm() {
    if (alarmTime) {
        const now = new Date();
        if (now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes() && now.getSeconds() === alarmTime.getSeconds()) {
            document.getElementById('alarmMessage').style.display = 'block';
            alarmSound.play();
            clearTimeout(alarmTimeout);
        }
    }
}

setInterval(updateClock, 1000);
updateClock();
setInterval(checkAlarm, 1000);
