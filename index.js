"use strict";

const FAVORITE_NUMBER = 5;

/* Makes a request to the Numbers API (http://numbersapi.com)
and gets trivia about your favorite number */
async function showNumberTrivia() {
  const response = await fetch(`http://numbersapi.com/${FAVORITE_NUMBER}?json`);

  const data = await response.json();

  console.log(data.text);

}


/* asks for trivia about four different numbers
(using four separate requests),*/
async function showNumberRace(numbers) {
  promises = numbers.map(num => fetch(`http://numbersapi.com/${num}?json`))

  const answerPromise = await Promise.race(
    promises
  );

  const response = await answerPromise.json();

  console.log(response.text);
}


/* Returns a random number between 0 and 100  */
function getRandomNumber() {
  let randomNumber = Math.random();
  return Math.floor(randomNumber * 101);
}

/** ask trivia about several different numbers. console logs array of trivia for
 * responses with successful status code as well as array of error messages for
 * failed status code.
 */
async function showNumberAll(numbers) {
  promises = numbers.map(num => fetch(`http://numbersapi.com/${num}?json`))

  const results = await Promise.allSettled(promises);

  const fulfilledResps = results.filter(r => r.status == 'fulfilled' && r.value.ok === true);
  const facts = [];
  for (let result of fulfilledResps) {
    const fact = await result.value.json();
    facts.push(fact.text);
  }
  console.log('showNumberAll fulfilled:');
  console.log(facts);

  const failedResps = results.filter(
    r => r.status == 'rejected' || r.value.ok === false
  );
  const errs = [];
  for (let result of failedResps) {
    if (result.status == 'rejected') {
      errs.push(result.reason);
    } else {
      errs.push(`Request failed with status code ${result.value.status}`);
    }
  }

  console.log('showNumberAll rejected:');
  console.log(errs);
}

async function main() {
  console.log('showNumberTrivia');
  await showNumberTrivia();
  console.log('showNumberRace');
  await showNumberRace();
  await showNumberAll();
}

main();