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
async function showNumberRace() {
  const p1 = fetch(`http://numbersapi.com/${getRandomNumber()}?json`);
  const p2 = fetch(`http://numbersapi.com/${getRandomNumber()}?json`);
  const p3 = fetch(`http://numbersapi.com/${getRandomNumber()}?json`);
  const p4 = fetch(`http://numbersapi.com/${getRandomNumber()}?json`);

  const answerPromise = await Promise.race(
    [p1, p2, p3, p4]
  );

  const response = await answerPromise.json();

  console.log(response.text);
}


/* Returns a random number between 0 and 100  */
function getRandomNumber() {
  let randomNumber = Math.random();
  return Math.floor(randomNumber * 101);
}

