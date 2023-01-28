let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let playedCards = [];

let number = 0;
let isGame = true;
let cardsField = document.getElementById("cards");
let realCards = document.getElementById("real_cards");
let playedCardsField = document.getElementById("played_cards");
let info = document.getElementById("info");
let rel = document.getElementById("reload");

let congratDiv = document.getElementById("congrat");

info.innerHTML = "Take the card!";

function shuffle(arr) {
  let rand, temp;
  for (let i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

shuffle(cards);

cardsField.innerHTML = cards;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");

  event.target.appendChild(document.getElementById(data));
  play(cards, data);
}
function showCards(cards) {
  return cards.join(", ");
}

function checkWin(who, card) {
  info.innerHTML = who + " take " + card;

  if (card == "Q") {
    congratDiv.classList.remove("visibile");
    congratDiv.innerHTML = who + " win!";
    info.innerHTML = who + " win!";

    stop();
    fly();
    return true;
  }
  return false;
}
function fly() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].style.transitionDelay = i * 0.5 + "s";
    card_elements[i].classList.add("rotate");
  }
}

function stop() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].removeEventListener("click", play);
  }
  isGame = false;
}

function myMove(elId) {
  isGame = false;
  let b = false;
  number = Number(elId.substr(3));
  if (number > cards.length || number < 0) {
    throw new Error("Input error! Try again!");
  }
  if (checkWin("You ", cards[number])) {
    b = true;
  } else {
    setTimeout(removeCard.bind(null, number), 200);
    isGame = true;
  }
  return b;
}
function computerMove() {
  isGame = false;
  let b = false;
  number = Math.floor(Math.random() * cards.length);

  let computerCard = document.getElementById(`rc_${number}`);
  console.log(computerCard.id);

  if (checkWin("I ", cards[number])) {
    b = true;
    return b;
  } else {
    setTimeout(removeCard.bind(this, number), 200);
    isGame = true;
  }
  return b;
}
function removeCard(number) {
  playedCards.push(cards[number]);
  cards.splice(number, 1);
  cardsField.innerHTML = cards;
  generateCards(cards, realCards, "");
  generateCards(playedCards, playedCardsField, "p");
  addEventCardList();
}

function play(cards, elId) {
  if (!isGame) return;
  try {
    if (myMove(elId)) return;
    setTimeout(computerMove, 300);
  } catch (ex) {
    info.innerHTML = ex.message;
  }
}

function newPlay() {
  location.reload();
  return false;
}
function tidy(symbol) {
  switch (symbol) {
    case "2":
      return "&#9824;<br><br>&#9824;";
    case "3":
      return "&#9824;<br>&#9824;<br>&#9824;";
    case "4":
      return "&#9824; &#9824;<br><br>&#9824; &#9824;";
    case "5":
      return "&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;";
    case "6":
      return "&#9824; &#9824;<br>&#9824; &#9824;<br>&#9824; &#9824;";
    case "7":
      return "&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;<br>&#9824; &#9824;";
    case "8":
      return "&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;";
    case "9":
      return "&#9824; &#9824;<br>&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;<br>&#9824; &#9824;";
    case "10":
      return "&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;<br>&#9824; &#9824;<br>&#9824;<br>&#9824; &#9824;";

    default:
      return `&#9824;<br>${symbol}<br>&#9824;`;
  }
  //   return isNaN(symbol) ? `&#9824; ${symbol} &#9824;` : "&#9824;".repeat(symbol);
}
function whatText(symbol) {
  if (isNaN(symbol)) return "big-letters";
  symbol = +symbol;
  if (symbol <= 6) return "big-letters";
  else if (symbol <= 7 && symbol > 6) return "midium-letters";
  else return "small-letters";
}
function generateCards(cards, cardsF, s) {
  cardsF.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardsF.innerHTML += `<div id="rc_${i}${s}" class="card ${whatText(
      cards[i]
    )}" draggable="true" ondragstart="drag(event)"><span>${tidy(
      cards[i]
    )}</span></div>`;
  }
}
function addEventCardList() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].addEventListener("click", play);
  }
}

window.onload = function () {
  generateCards(cards, realCards, "");
  addEventCardList();
  rel.addEventListener("click", newPlay);
};
