export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.textArray = String("console.log(x)").split('');
    this.gameOver = false;
  }
  evalChar(keystrokeChar) {
    this.keystrokeCounter++;
    if(this.waitingForBackspace === true) {
      if(keystrokeChar === "\u0008")  { //temp === backspace
        this.waitingForBackspace = false;
        } else {
        // recommend error message
      }
    } else if (keystrokeChar === this.textArray[this.numberCorrect]) {
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


// let myChar = "\b" <--backspace char
// undefined

// myChar

// "\u0008"  <--backspace utf code