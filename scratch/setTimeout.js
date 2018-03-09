// setTimeout(function () {
//     console.log('Heads!');
//   }, 1000);

// ************************************
// ****  Create a new Promise *********
// ************************************

// const timeoutPromise = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     resolve('Heads!');
//   }, 1000);
// });
  

// timeoutPromise
//   .then(msg => {
//     console.log(msg);
// });

// ************************************
// ****  Add Simple Random Boolean ****
// ************************************

// const timeoutPromise = new Promise((resolve, reject) => {
//   const rand = Boolean(Math.round(Math.random()));
//   setTimeout(function () {
//     if (rand) {
//       resolve('Heads!');
//     } else {
//       reject('Tails!');
//     }
//   }, 1000);
// });

// timeoutPromise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// **************************************************
// **  Wrap new Promise in function named coinFlip **
// **************************************************

function coinFlip(delay) {
  return new Promise((resolve, reject) => {
    const rand = Boolean(Math.round(Math.random()));
    setTimeout(function () {
      if (rand) {
        resolve('Heads!');
      } else {
        reject('Tails!');
      }
    }, delay);
  });
}
// coinFlip(1000)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Try to get 3 "Head!" in a row

// Chaining

coinFlip(500)
  .then(res => {
    console.log(1,res);
    return coinFlip(500);
  })
  .then(res => {
    console.log(2,res);
    return coinFlip(500);
  })
  .then(res => {
    console.log(3,res);
    return coinFlip(500);
  })
  .then(res => {
    console.log(4,res);
    return coinFlip(500);
  })
  .catch(err => {
    console.error(err);
  });

  // Promise

 const coin1 = coinFlip(100);
 const coin2 = coinFlip(200);
 const coin3 = coinFlip(300);

 Promise.all( [coin1, coin2, coin3] )
  .then(arrayOfResults => {
    console.log(arrayOfResults);
  })
    .catch(err => {
      console.error(err);
  });