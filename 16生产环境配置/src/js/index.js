import '../css/index.less';

const p = Promise.resolve('1111');
p.then((e) => {
  console.log(e);
});
