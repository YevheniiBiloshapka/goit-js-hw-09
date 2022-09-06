import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitForm = document.querySelector('.form');
const btnStart = document.querySelector('button');
submitForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  btnStart.disabled = true;

  const { delay, step, amount } = e.currentTarget.elements;
  const el = {
    dataDelay: +delay.value,
    dataStep: +step.value,
    dataAmount: +amount.value,
  };
  outputMessagesByPosition(el);
}

function outputMessagesByPosition({ dataDelay, dataStep, dataAmount }) {
  let newDelay;

  for (let position = 1; position <= dataAmount; position++) {
    newDelay = dataDelay + dataStep * (position - 1);
    createPromise(position, newDelay)
      .then(({ position, delay }) =>
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      btnStart.disabled = false;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
