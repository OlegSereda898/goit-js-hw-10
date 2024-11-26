import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
        iziToast.error({
        title: "Error",
        message: "Please choose a date in the future.",
        position: "topRight",
        backgroundColor: "#ef4040",
        titleColor: "#ffff",
        messageColor: "#ffff"
        });
        startButton.disabled = true;
    } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
    }
    },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
    if (!userSelectedDate) return;

    startCountdown();
    startButton.disabled = true;
    dateTimePicker.disabled = true;
});

function startCountdown() {
    updateTimerFields(convertMs(userSelectedDate - new Date()));

    timerInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    if (timeDifference <= 0) {
        clearInterval(timerInterval);
        iziToast.success({
        title: "Finished",
        message: "The countdown has ended.",
        });
        resetUI();
        return;
    }
    updateTimerFields(convertMs(timeDifference));
    }, 1000);
}

function resetUI() {
    dateTimePicker.disabled = false;
    startButton.disabled = true;
    updateTimerFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

function updateTimerFields({ days, hours, minutes, seconds }) {
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

