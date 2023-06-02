// Initial References
let timeRef = document.querySelector('.timer-display');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const activeAlarms = document.querySelector('.activeAlarms');
const setAlarm = document.getElementById('set');

let alarmsArray = [];
let alarmSound = new Audio('alarmClock.mp3');

let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;

// Append zeros for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for value in object

// Display Time
function displayTimer(){
    let date = new Date();
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds()),
    ];

    // display time
    timeRef.innerHTML = `${hours}:${minutes}:${seconds}`;

    // Alarm
    alarmsArray.forEach((alarm, index) => {
        if(alarm.isActive){
            if(`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`){
                alarmSound.play();
                alarmIndex.loop = true;
            }
        }
    });
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if(inputValue < 10){
        inputValue = appendZero(inputValue);
    }
    return inputValue
};

hourInput.addEventListener('input', () => {
    hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener('input', () => {
    minuteInput.value = inputCheck(minuteInput.value);
});
// Create alarm Div

// Set Alarm

// Start Alarm

// Stop Alarm

// Delete alarm

window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;

    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};