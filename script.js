const gameContainer = document.getElementById("game");
let first_card = null;
let second_card = null;
let card_flipped = 0;
let no_click = false;
let score = 0;
let start = false;

const HS = localStorage.getItem("highscore");
const SB = document.getElementById("highScore");
SB.textContent = "'Lowest' High Score: " + HS;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    const start_button = document.getElementById("start");
    start_button.addEventListener("click", startGame);

    newDiv.addEventListener("click", handleCardClick);



    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  while (start == true) {
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    var target = event.target;
    if (no_click) return;
    if (event.target.classList.contains("flipped")) return;
    let curr_card = event.target;
    curr_card.style.backgroundColor = curr_card.classList[0];

    if (!first_card || !second_card) {
      curr_card.classList.add("flipped");
      first_card = first_card || curr_card;
      second_card = curr_card === first_card ? null : curr_card;
    }

    if (first_card && second_card) {
      no_click = true;
      let high_score = localStorage.getItem("highscore");
      if (high_score !== null) {
        if (score > high_score) {
          localStorage.setItem("highscore", score);
          const upd_hs = document.getElementById("highScore");
          upd_hs.textContent = "'Lowest' High Score: " + high_score;
        }
      }
      else {
        localStorage.setItem("highscore", score);
      }

    }
    let color_match1 = first_card.className;
    let color_match2 = second_card.className;
    console.log(color_match1);
    console.log(color_match2);
    if (color_match1 != color_match2) {
      setTimeout(() => {
        score += 1;
        let match_update = document.getElementById("actScore");
        match_update.textContent = "Guesses/ Your Score: " + score;
        first_card.style.backgroundColor = "";
        second_card.style.backgroundColor = "";
        first_card.classList.remove("flipped");
        second_card.classList.remove("flipped");
        first_card = null;
        second_card = null;
        no_click = false;
      }, "1000");
    } else {
      first_card.removeEventListener("click", handleCardClick);
      second_card.removeEventListener("click", handleCardClick);
      first_card = null;
      second_card = null;
      no_click = false;
      return;

    }

    /*if (target.classList == "red") {
      this.style.backgroundColor = "red";
    } else if (target.classList == "green") {
      this.style.backgroundColor = "green";
    } else if (target.classList == "blue") {
      this.style.backgroundColor = "blue";
    } else if (target.classList == "purple") {
      this.style.backgroundColor = "purple";
    } else {
      this.style.backgroundColor = "orange";
    }*/


  }
}


function startGame() {
  start = true;
  console.log(start);
  let start_button = document.getElementById("start");
  setTimeout(() => {
    start_button.style.backgroundColor = "lightgreen";
  }, "300");

}

// when the DOM loads
createDivsForColors(shuffledColors);
const restart_b = document.getElementById("restart");
restart_b.addEventListener("click", restart);
function restart() {
  window.location.reload(false);
}

/* */