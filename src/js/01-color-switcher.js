function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
buttonStart.disabled = false;
buttonStop.disabled = true;

buttonStart.addEventListener('click', e => {
  e.preventDefault();
  buttonStart.disabled = true;
  buttonStop.disabled = false;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;

  clearInterval(timerId);
});
