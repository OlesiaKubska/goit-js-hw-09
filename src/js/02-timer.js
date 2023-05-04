// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");

// Задайте значення за замовчуванням для змінних selectedDate та interval
let interval;
// let selectedDate;

// Функція, яка запускає таймер, та є обробником події для кнопки "Start"
function startTimer() {
  // Розрахунок різниці в мілісекундах між датою, введеною користувачем та поточною датою
  const msDiff = selectedDate.getTime() - new Date().getTime();
  
  //перевірку на те, чи існує поточний інтервал перед його зупинкою, щоб уникнути помилок в разі повторної натискання кнопки "Stop".
  if (interval) {
    clearInterval(interval);
  }

  // Інтервал, який буде викликати функцію, що відображає залишок часу, кожну секунду.
  interval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = selectedDate - now; 

    if (timeLeft < 0) {
      clearInterval(interval);
      startButton.disabled = true;
      Notify.success("Timer has ended!");
    } else {
      // Форматування часу та відображення його на сторінці
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }
  }, 1000);
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

// Обробник події для кнопки "Start"
startButton.addEventListener("click", () => {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
    // перевірка на вибір майбутньої дати
      if (selectedDate < new Date()) {
        Notify.failure("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
        startTimer(selectedDate);
      }
    },
  };

  // Отримання дати, введеної користувачем за допомогою flatpickr
  const datepicker = flatpickr("#date", options);
  startButton.disabled = true;
});

// Обробник події для кнопки "Stop", який буде зупиняти інтервал.
// stopButton.addEventListener("click", () => {
//   clearInterval(interval);
//   startButton.disabled = false;
// });

const dateInput = document.querySelector("#date");
// dateInput.value = new Date().toLocaleDateString(); //встановлює значення value для dateInput як поточну дату, отриману з new Date().toLocaleDateString()

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}