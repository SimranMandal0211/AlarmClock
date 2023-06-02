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
setAlarm.addEventListener('click', () => {
    alarmIndex += 1;

    // alarmObj
    let alarmObj = [];
    alarmObj.id = `${alarmIndex}+${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

// Start Alarm
    // alarmImg
    let playAlarmImg = document.querySelector('.clockImg');

const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute('data-id');
    let [exists, obj, index] = searchObject('id',searchId);
    if(exists){
        alarmsArray[index].isActive = true;
    }
    playAlarmImg.setAttribute('src', 'Alarm_Clock_Animation_High_Res.png');
    playAlarmImg.classList.add('playAlarmImg');
};

// Stop Alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute('data-id');
    let [exists, obj, index] = searchObject('id', searchId);
    if(exists){
        alarmsArray[index].isActive = false;
        alarmsArray.pause();
        playAlarmImg.setAttribute('src', 'alarm-clock.png');
    }
};

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