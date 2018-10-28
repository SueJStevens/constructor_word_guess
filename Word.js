/* **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

  * An array of `new` Letter objects representing the letters of the underlying word

  * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

  * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
  */


/*  _
.__(.)< (Bird Song)
 \___)   
~~~~~~~~~~~~~~~~~~~~*/


//Word requires Letter.js
// requiring our Letter module exported from letter.js
var Letter = require("./Letter.js");

//constructor 
function Word(wordIn) {
  this.word = wordIn;
  this.lettersArr = []; //An array of `new` Letter objects representing the letters of the underlying word
  this.wordFound = false;

  // gets letters and pushes to letters array (Works!)
  this.getLetters = function () {
    for (var i = 0; i < this.word.length; i++) {
      var newLetter = new Letter(this.word[i]);
      this.lettersArr.push(newLetter);
      //console.log(newLetter);
    }
  } //end getLetters function

  /* A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)*/

  // checks to see if letter is in the word
  this.ltrExists = function (guessedLetter) {
    result = false;
    str = guessedLetter + " does not exist in the word. Try again."
    for (var i = 0; i < this.lettersArr.length; i++) {
      if (this.lettersArr[i].checkGuess(guessedLetter) === true) {
        console.log(this.lettersArr[i]);
        result = true;
        str = "Guessed Letter: " + guessedLetter + " found."
        //break;
      }
    }
    console.log(str);
    return result;
  } //end Letter Exists function

  /* A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.*/
  this.wordDisplay = function () {
    var display = ''
    for (var i = 0; i < this.lettersArr.length; i++) {
      display += this.lettersArr[i].letterMask();
    }
    return display
  } //end Word Display Function

  // checks to see if user found the current word (does not work!).
  this.checkWord = function () {
    this.wordFound = true;
    for (var i = 0; i < this.lettersArr.length; i++) {
      var str = this.lettersArr[i].letterMask();
      if (this.lettersArr[i].letterMask()===" _ ") {
        this.wordFound = false;
        break;
      }
    }
  } //end CheckWord function

} //end constructor


// exporting our Word Constructor. We will require it in index.js
module.exports = Word;

/* var myWord = new Word("Bird");
var userGuess = "i";
//console.log(myWord);
//console.log(myWord.word);
myWord.getLetters();
//console.log(myWord.lettersArr[0].character); //the character from word that is now in the letter constructor.
console.log(myWord.ltrExists(userGuess));
console.log(myWord.wordDisplay());
console.log(myWord.wordFound);
userGuess = "B";
console.log(myWord.ltrExists(userGuess));
console.log(myWord.wordDisplay());
console.log(myWord.wordFound);
userGuess = "d";
console.log(myWord.ltrExists(userGuess));
console.log(myWord.wordDisplay());
console.log(myWord.wordFound);
userGuess = "r";
console.log(myWord.ltrExists(userGuess));
console.log(myWord.wordDisplay());
myWord.checkWord();
console.log(myWord.wordFound);
 */


