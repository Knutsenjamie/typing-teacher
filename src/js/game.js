export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.textArray = [];
    this.gameOver = false;
  }

  setTextArray(text){
    this.textArray=String(text).split('');
  }

  evalChar(keystrokeChar) {
    this.keystrokeCounter++;
    if(this.waitingForBackspace === true) {
      if(keystrokeChar === 'Backspace')  { //8 === backspace
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