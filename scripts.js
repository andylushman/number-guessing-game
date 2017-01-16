//**********GLOBAL VARIABLE**************//
var appVars = {};
//********** Initialization**********//
function setAppVars () {
  appVars.submitBtn = document.getElementById("submit-btn");
  appVars.clearBtn = document.getElementById("clear-btn");
  appVars.resetBtn = document.getElementById("reset-btn");
  appVars.rangeBtn = document.getElementById("range-btn");
  appVars.guessInput = document.getElementById("guess-input");
  appVars.lastGuess = document.querySelector(".last-guess");
  appVars.gameMessage = document.querySelector(".game-message");
  appVars.min = document.getElementById("min");
  appVars.max = document.getElementById("max");
  appVars.secretNum = null;
}

function bindEvents() {
  appVars.submitBtn.addEventListener('click', handleSubmit);
  appVars.clearBtn.addEventListener('click', clearGuessInput);
  appVars.resetBtn.addEventListener('click', handleReset);
  appVars.rangeBtn.addEventListener('click', handleNewRange);
  appVars.guessInput.addEventListener("keyup", toggleSubmitBtn);
}

function initialization(){
  setAppVars();
  setSecretNum();
  bindEvents();
}
//************ Event Handlers******//
function toggleSubmitBtn(){
  if(appVars.guessInput.value){
    enableBtn(appVars.submitBtn);
  } else {
    disableBtn(appVars.submitBtn);
  }
}

function handleSubmit(){
  //valadiate,
      // check guessInput value to make sure its a number
        // if (not a number) error to user
        // else (its a number) compare it to the secret number
  var userGuess = parseInt(appVars.guessInput.value);

  if(isNaN(userGuess)){

    alert("Please enter a valid number");
    return;

  } else {
    compare(userGuess);
    enableBtn(appVars.resetBtn);
  }
}

function clearGuessInput(){
  // empty guess box
  appVars.guessInput.value = "";
}

function handleReset(){
  // clear all ui
    //reset userGuess
    // reset lastGuess
    // reset min/max
  disableBtn(appVars.resetBtn);
  clearGuessInput();
  displayMessage("#", "");
  appVars.min.value = 1;
  appVars.max.value = 100;
}

function handleNewRange(){
  // validate
    //that min/max are numbers and that max > min
      //if true set range and set new secret number
      // else error message
  var min = parseInt(appVars.min.value);
  var max = parseInt(appVars.max.value);
  if(isNaN(min) || isNaN(max) || max < min){
    alert("Please enter a valid range");
  } else {
    setSecretNum();
  }
}

//******* Helpers ********//
function compare(num){
  // compare
    // compare guessInput to secret number
      // if (its the same) call scuccess functions
      //else if (less than) inform user
      //else if (greater than) inform user

  if(num === appVars.secretNum){
    // alert("Nice job! You guessed the correct number!");
    //display message and display user gesss
    displayMessage(num, "BOOM! You got the correct number!");
  } else if (num < appVars.secretNum) {
    // alert("Sorry, your guess is too low");
    displayMessage(num, "Sorry, your guess is too low");
  } else {
    // alert("Sorry, your guess is too high");
    displayMessage(num, "Sorry, your guess is too high");
  }
}

function setSecretNum() {
    var max = parseInt(appVars.max.value);
    var min = parseInt(appVars.min.value);
    appVars.secretNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(appVars.secretNum);
}

function displayMessage(num, message) {
  appVars.lastGuess.innerHTML = num;
  appVars.gameMessage.innerHTML = message;
}

function enableBtn(btn){
  btn.disabled = false;
}

function disableBtn(btn){
  btn.disabled = true;
}

initialization();
