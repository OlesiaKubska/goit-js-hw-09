var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("7Y9D8");function i(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector("form").addEventListener("submit",(function(e){e.preventDefault();const t=parseInt(e.target.elements.amount.value),n=parseInt(e.target.elements.delay.value),o=parseInt(e.target.elements.step.value),r=[];for(let e=0;e<t;e++)r.push(i(e,n+e*o));Promise.all(promises).then((e=>{e.forEach((({position:e,delay:t})=>{notiflix.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)}))})).catch((e=>{e.forEach((({position:e,delay:t})=>{notiflix.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)}))}))}));
//# sourceMappingURL=03-promises.bf64509b.js.map
