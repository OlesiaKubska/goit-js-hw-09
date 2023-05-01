const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

const body = document.body;
let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
startBtn.disabled = true; // Вимикаємо кнопку "Start"
intervalId = setInterval(changeBodyBgColor, 1000); // Запускаємо зміну кольору фону щосекунди
}

function onStopClick() {
startBtn.disabled = false; // Вмикаємо кнопку "Start" знову
clearInterval(intervalId); // Зупиняємо зміну кольору фону
}

function changeBodyBgColor() {
const color = getRandomHexColor();
body.style.backgroundColor = color; // Змінюємо колір фону
}

//Функція getRandomHexColor використовується для генерації випадкового кольору у форматі шістнадцяткового коду
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}