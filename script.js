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
const createAlarm = (alarmObj) => {
    // Keys from object
    const {id, alarmHour, alarmMinute }= alarmObj;
    // Alarm Div
    let alarmDiv = document.createElement('div');
    alarmDiv.classList.add('alarm');
    alarmDiv.setAttribute('data-id', id);
    alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;
    // checkbox
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', (e) => {
        if(e.target.checked){
            startAlarm(e);
        }else{
            stopAlarm(e);
        }
    });
    alarmDiv.appendChild(checkbox);
    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
};

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