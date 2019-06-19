"use strict";

var oldage = document.getElementsByClassName('deck');
/*
 * Create a list that holds all of your cards
 */
var teenage = document.querySelectorAll('.card');
var ar = [...teenage];
var move = 0;
var moveSection = document.getElementById('Moves');
var cardStore = [];
var match = 0;
var count = 3;
var count1 = 0;
var aim = 0;
var score = document.getElementById('score');
var starCount = [...document.getElementsByClassName('fa-star')];
var timeSection;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

window.onload = begin();

function begin() {
  var shufCard = shuffle(ar);
  for (var i = 0; i < shufCard.length; i++) {
    oldage[0].append(shufCard[i]);
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you cal  l from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
for (var i = 0; i < ar.length; i++) {
  ar[i].addEventListener("click", showCard);
}

var timeStatus = 0;

function showCard() {
  if (timeStatus == 0) {
    startTimer();
    timeStatus = timeStatus + 1;
  }
  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");
  cardStore.push(this);
  if (cardStore.length == 2) {
    move = move + 1;
    count1 = count1 + 1;
    rating();
    moveSection.innerHTML = move;
    if (cardStore[0].children[0].classList.item(1) == cardStore[1].children[0].classList.item(1)) {
      console.log("success");
      cardStore[0].classList.add("match", "disable");
      cardStore[1].classList.add("match", "disable");
      cardStore = [];
      match = match + 1;
      if (count1 == 1) {
        aim = aim + 10;
        score.innerHTML = aim;
        count1 = 0;
      } else if (count1 == 2) {
        aim = aim + 5;
        score.innerHTML = aim;
        count1 = 0;
      } else if (count1 >= 3) {
        aim = aim + 2;
        score.innerHTML = aim;
        count1 = 0;
      }
      if (match == 8) {
        clearInterval(timeSection);
        switch (count) {
          case 1:
            Swal.fire({
              type: 'success',
              title: 'u did it',
              position: 'top-end',
              html: 'you earned<strong style="color:gold"><i class="fa fa-star"></i></strong><br>moves: ' + move + '<br>time taken <br>' + hour + 'hour:' + min + 'min:' + sec + 'sec',
              confirmButtonText: '<i class="fa fa-repeat"></i> Restart',
              showCancelButton: true,
              cancelButtonColor: '#d33',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 2:
            Swal.fire({
              type: 'success',
              title: 'u did it',
              position: 'top-end',
              html: 'you earned<strong style="color:gold"><i class="fa fa-star"></i><i class="fa fa-star"></i></strong><br>moves: ' + move + '<br>time taken <br>' + hour + 'hour:' + min + 'min:' + sec + 'sec',
              confirmButtonText: '<i class="fa fa-repeat"></i> Restart',
              showCancelButton: true,
              cancelButtonColor: '#d33',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 3:
            Swal.fire({
              type: 'success',
              title: 'u did it',
              position: 'top-end',
              html: 'you earned<strong style="color:gold"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></strong><br>moves: ' + move + '<br>time taken <br>' + hour + 'hour:' + min + 'min:' + sec + 'sec',
              confirmButtonText: '<i class="fa fa-repeat"></i> Restart',
              showCancelButton: true,
              cancelButtonColor: '#d33',
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
        }

      }
    } else {
      console.log("failure");
      cardStore[0].classList.add("unmatch");
      cardStore[1].classList.add("unmatch");
      cardStore.map((son) => {
        setTimeout(() => {
          son.classList.remove("unmatch", "open", "show", "disable");
        }, 200)
        cardStore = [];
      })
    }
  }
}
// timer declaration

var sec = 0;
var min = 0;
var hour = 0;

function startTimer() {
  timeSection = setInterval(() => {
    sec = sec + 1;
    if (sec == 59) {
      sec = 0;
      min = min + 1;
    }
    if (min == 60) {
      min = 0;
      hour = hour + 1;
    }
    time.innerHTML = sec + "::" + min + "::" + hour;
  }, 1000)
}

function rating() {
  if (move > 12 && move <= 18) {
    count = 2;
    starCount[2].style.display = "none";
  }
  if (move > 18) {
    count = 1;
    starCount[1].style.display = "none";
  }
}
