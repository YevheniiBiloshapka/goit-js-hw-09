import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let startTime;
const btnStart = document.querySelector('button');
btnStart.disabled = true;

const dataSet = {
  dataDay: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinute: document.querySelector('span[data-minutes]'),
  dataSecond: document.querySelector('span[data-seconds]'),
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd.m.Y H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0];
    btnStart.disabled = false;
  },
});

btnStart.addEventListener('click', onclick => {
  if (startTime < Date.now()) {
    Notify.failure('Вы выбрали неверную дату');
    btnStart.disabled = true;
    return;
  } else {
    Notify.success('Данный введены вверно начинаю отсчет');
  }
  let intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(startTime - Date.now());
    dataSet.dataDay.innerHTML = `${days}`;
    dataSet.dataHours.innerHTML = `${hours}`;
    dataSet.dataMinute.innerHTML = `${minutes}`;
    dataSet.dataSecond.innerHTML = `${seconds}`;
  }, 1000);

  btnStart.disabled = true;
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
