"use strict";

const DECK_COUNT = 1;
let DECK_ID = undefined;

$cardBtn = $("#new-card");
$deck = $("#deck");

/* Returns a “deck_id” — an ID to a unique, shuffled deck of cards. */
async function getDeckId() {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${DECK_COUNT}`);

  const data = await response.json();

  return data.deck_id;

}

/* draws a card from the given deck ID, and returns info about the card drawn. */
async function getCard() {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=1`
  );

  const data = await response.json();

  return data.cards;

}

async function handleBtnClick() {
  const card = await getCard();

  console.log(card);
}


$(window).on("load", async function () {
  DECK_ID = await getDeckId();
}
);

$cardBtn.on("click", handleBtnClick);

