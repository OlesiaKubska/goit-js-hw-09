// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

//Змінні intervalId, selectedDate та currentDate використовуються для зберігання значень інтервалу часу, які відповідають за таймер, вибраної користувачем дати та поточної дати відповідно
let intervalId = null;
let selectedDate = null;
let currentDate = null;

//За допомогою методу querySelector() змінним присвоюються елементи DOM
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
const startButton = document.querySelector("button[data-start]");

//За допомогою flatpickrInput до змінної присвоюється елемент DOM, який відповідає за відображення вибраної користувачем дати та часу
const flatpickrInput = document.querySelector('#datetime-picker');

startButton.disabled = true;
startButton.addEventListener('click', onStartCounter); 


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    // перевірка на вибір майбутньої дати
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure("Please choose a date in the future.");
    } else {
      selectedDate = selectedDates[0].getTime();
      startButton.disabled = false;
      Notify.success("Okay!");
    }
  },
};
  
// Отримання дати, введеної користувачем за допомогою flatpickr
const fp = flatpickr(flatpickrInput, options); 

function onStartCounter() {
  counter.start();
}

// функція для конвертування мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  // Кількість мілісекунд у одиниці часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Розрахунок кількості днів
  const days = Math.floor(ms / day);
  // Розрахунок кількості годин
  const hours = Math.floor((ms % day) / hour);
  // Розрахунок кількості хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Розрахунок кількості секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//створюється об'єкт counter, який містить методи start() та stop().
const counter = {
  //Метод start() запускає таймер, який зберігається у змінній intervalId. В методі start() використовується метод setInterval() для оновлення таймера кожну секунду.
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimerface(convertMs(deltaTime));
      startButton.disabled = true;
      flatpickrInput.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();
        Notify.info('Congratulation! Timer stopped!');
      }
    }, 1000);
  },
//Метод stop() зупиняє таймер
  stop() {
    startButton.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimerface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${addLeadingZero(days)}`;
  dataHours.textContent = `${addLeadingZero(hours)}`;
  dataMinutes.textContent = `${addLeadingZero(minutes)}`;
  dataSeconds.textContent = `${addLeadingZero(seconds)}`; // Форматування часу та відображення його на сторінці
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0'); //додає ведучі нулі до чисел з одним розрядом
}