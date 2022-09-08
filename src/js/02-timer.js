import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_green.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let startTime;
const btnStart = document.querySelector('button');
btnStart.disabled = true;

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

  const setInter = setInterval(() => {
    const elements = convertMs(startTime - Date.now());

    for (const key in elements) {
      document.querySelector(`span[data-${key}]`).textContent = elements[key];
    }

    const sumTime = Object.values(elements).reduce(
      (acc, i) => Number(acc) + Number(i)
    );
    console.log(sumTime);
    if (sumTime === 0) {
      clearInterval(setInter);
      Notify.success('Ваше время вышло');
    }
  }, 1000);

  btnStart.disabled = true;
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
