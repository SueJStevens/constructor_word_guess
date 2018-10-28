/* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses

3. `Letter.js` *should not* `require` any other files.

4. `Word.js` *should only* require `Letter.js`
*/

// requiring our Word module exported from Word.js
//var myRequire = require("./Word.js");



/*
     ("`-''-/").___..--''"`-._
     `6_ 6  )   `-.  (     ).`-.__.`)
     (_Y_.)'  ._   )  `._ `. ``-..-'
   _..`--'_..-_/  /--'_.' ,'  Draft #3 of Hangman - Constructor Version
  (il),-''  (li),'  ((!.-'    Sue J. Stevens <StevensStock@gmail.com>
*/



// dependency for inquirer npm package
var inquirer = require("inquirer");

var Word = require('./Word.js');

var randomWord = "";

var guessedLetters = [];

var guessesRemaining = 10;

startGame();

/* Randomly selects a word and uses the `Word` constructor to store it */
function generateRandomWord() {
  var wordsArr = ['terrapin', 'bear', 'dire wolf', 'china cat', 'bird song', 'carrion crow', "monkey"];
  randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  return randomWord;
}

/* Prompts the user for each guess and keeps track of the user's remaining guesses */
function startGame() {

  // clears guessedLetters before a new game starts if it's not already empty.
  if (guessedLetters.length > 0) {
    guessedLetters = [];
  }

  console.log('---------------------------------------------------------');
  console.log('');
  console.log('Guess! The! Word!');
  console.log('');
  console.log('---------------------------------------------------------');

  //prompt user
  inquirer.prompt([
    {
      name: 'play',
      type: 'confirm',
      message: 'Are you ready to start the game?'
    }
  ]).then(function (answer) {
    if (answer.play) {
      console.log('');
      console.log('The category is . . .Animals');
      console.log('You get 10 guesses to guess the right word.');
      console.log('Good Luck!');
      console.log('');
      newGame();
    } else {
      console.log('That is too bad! We would have had fun.');
    }
  });

}

function newGame() {

  if (guessesRemaining === 10) {
    //game on
    console.log('---------------------------------------------------------');
    //generate random word
    randomWord = generateRandomWord();
    //define the new word
    var myWord = new Word(randomWord);
    //populate the letters array
    myWord.getLetters();

    // displays current word as blanks.
    console.log('');
    console.log(myWord.wordDisplay());
    console.log('');
    promptUser();

  } else {
    //game over
  }

  function promptUser() {
    inquirer.prompt([
      {
        name: "letter",
        type: "input",
        message: "Guess a Letter!",
        validate: function (value) {
          //capture what the user typed and evaluate it to elimate anything that isn't a valid letter
          var userChoice = (value).toLowerCase();
          //console.log("Your Choice: " + userChoice);
          if (userChoice.length === 1
            && userChoice >= "a"
            && userChoice <= "z"
          ) {
            return true;
          } else {
            console.log("Only letters, please.");
            return false;
          }
        } //end validation
      }
    ]).then(function (value) {

      var userChoice = value.letter;
      //console.log(userChoice);

      // check to see if you guessed that letter already and set flag to false
      var guessedAlready = false;
      for (var i = 0; i < guessedLetters.length; i++) {
        if (userChoice === guessedLetters[i]) {
          guessedAlready = true;
        } //end if
      } //end loop

      if (guessedAlready === false) {
        // push letter into array
        guessedLetters.push(userChoice);

        // variable to check if letter was in the word
        var found = myWord.ltrExists(userChoice);
        if (found === false) {
            guessesRemaining--

            console.log('Guesses remaining: ' + guessesRemaining);
            console.log('---------------------------------------------------------');
            console.log('');
            console.log(myWord.wordDisplay());
            console.log('');
            console.log('---------------------------------------------------------');
            console.log('Letters guessed: ' + guessedLetters);
        } else {
            console.log('Yes! You are correct!!');

            if (myWord.checkWord() === true) {
                console.log('');
                console.log(myWord.wordDisplay());
                console.log('');
                console.log('----- YOU WIN -----');
                startGame();
            } else {
                console.log('Guesses remaining: ' + guessesRemaining);
                console.log('');
                console.log(myWord.wordDisplay());
                console.log('');
                console.log('---------------------------------------------------------');
                console.log('Letters guessed: ' + guessedLetters);
            }
        }

        // if guessesRemaining and the current word isn't found prompt the user
        if (guessesRemaining > 0 && myWord.wordFound === false) {
            promptUser();
        } else if (guessesRemaining === 0) { // if you don't have any guesses left and haven't found the word you lose
            console.log('');              
            console.log('----- GAME OVER -----');
            console.log('');
            console.log('The word you were trying to guess was: ' + randomWord);
            console.log('');                
        }
    } else { // prompts the user that they guessed that letter already
        console.log('You\'ve guessed that letter already, try again.')
        promptUser();
    }

    })
  }

};