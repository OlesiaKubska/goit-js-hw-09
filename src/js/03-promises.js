import { Notify } from "notiflix";

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit); //додали обробник події submit до форми, який викликає функцію handleSubmit

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  
  const amount = parseInt(event.target.elements.amount.value);
  const delay = parseInt(event.target.elements.delay.value);
  const step = parseInt(event.target.elements.step.value);
  const promise = []; //створюємо масив promises, в який додаємо стільки промісів, скільки введ

  for (let i = 0; i < amount; i++) {
    promise.push(createPromise(i, delay + i * step));
  }
//Коли всі проміси будуть створені, використовуємо Promise.all для очікування їх виконання. 
  Promise.all(promise)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    event.currentTarget.reset();
    
}