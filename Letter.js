/* **Letter.js**: Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

  * A string value to store the underlying character for the letter

  * A boolean value that stores whether that letter has been guessed yet

  * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

  * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
  */

//constructor 
function Letter (character, isGuessed) {
  this.character = character;  //* A string value to store the underlying character for the letters in the word phrase
  this.isGuessed = false; //* A boolean value that stores whether that letter has been guessed yet

 
  
  /* A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed 
  Display blanks, an underscore, or the letter guessed */
  this.letterMask = function() {
    var result = "";
    if (this.character === " ") {
      //this.isGuessed = true;
      result = "  ";
    } else 
    if (this.isGuessed === false) { 
      result = " _ ";
    } else {
      result = " "+this.character+" ";
    }
    //console.log("____________________Result from LetterMask Function from //Letter.js____________________")

    //console.log(result);
    return result;
  } //end letterMask function

  /* A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly */
  this.checkGuess = function(ltr) {
    var result = false;
    if (ltr === this.character) {      
      this.isGuessed = true;
      result = true;
    } 
    return result;
//    console.log("____________________CheckGuess Function from //Letter.js____________________");
//    console.log("The Guess is: " + ltr);
//    console.log("The Letter from the word: " + this.character);
//    console.log("isGuessed Variable: "+this.isGuessed);
//    console.log//("__________________________________________________________________________");

  } //end checkGuess function

} //end constructor

// exporting our Letter Constructor. We will require it in Word.js
module.exports = Letter;

//Testing Information
//var a = new Letter("a",false);
//var b = new Letter("b",true);
//a.letterMask();
//b.letterMask();
//a.checkGuess("c");
//b.checkGuess("b");
