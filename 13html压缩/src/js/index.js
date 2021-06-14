import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.promise.js'; // import '@babel/polyfill';

const add = function add(a, b) {
  return a + b;
};

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了');
  }, 2000);
  resolve();
});
console.log(promise);
console.log(add(1, 3));
