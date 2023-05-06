import { Notify } from "notiflix";

const form = document.querySelector('form');
//додали обробник події submit до форми, який викликає функцію handleSubmit
form.addEventListener('submit', event => {
  event.preventDefault();
  
  const amount = parseInt(form.amount.value);
  const delay = parseInt(form.delay.value);
  const step = parseInt(form.step.value);
  
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}); 

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