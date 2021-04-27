export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.textArray = "";
    this.gameOver = false;
  }

  setTextArray(text){
    this.textArray=String(text).split('');
  }

  evalChar(keyCode) {
    this.keystrokeCounter++;
    if(this.waitingForBackspace === true) {
      if(keystrokeChar === "\u0008")  { //temp === backspace
        this.waitingForBackspace = false;
        } else {
        // recommend error message
      }
    } else if (String.fromCharCode(keyCode) === this.textArray[this.numberCorrect]) {  //once we determine that's it's not a backspace, we should convert it into a character.  The character in the array will be ' ' for a space so if we convert it will we get ' ' === ' '
      // so here we should have else if (String.fromCharCode(keyCode))
      this.numberCorrect ++
      if(this.numberCorrect === this.textArray.length){
        this.gameOver = true;
      }
    } else {
      this.waitingForBackspace = true;
    }
  }
  getAccuracy(){
    return this.numberCorrect/this.keystrokeCounter;
  }
}

// keystrokeChar is a keycode like 8 for backspace
// check for backspace for if waiting on backspace
// if it's not backspace and we're not waiting on backspace we want to compare this key to the current letter of the textArray
// keycode doesn't look like the character from textArray
// keystrokeCodeConvertedToCharacter = String.fromCharCode(keystrokeChar); turns key code 65 into "a"

// if32it's32not32backspace32and32we're32not32waiting32on32backspace we want to compare this key to the current letter of the textArray



// THAT"S WHY WE NEED TO CONVERT IT AFTER WE DETERMINE IT"S NOT A BACKSPACE


// let myChar = "\b" <--backspace char
// undefined

// myChar

// "\u0008"  <--backspace utf code