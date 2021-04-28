export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.textArray = [];
    this.gameOver = false;
  }

  setTextArray(text){
    let tempTextArray = String(text).split('');
    this.textArray = [];
    for (let i=0; i<tempTextArray.length; i++){
      if (tempTextArray[i]==="\r" || tempTextArray[i] === "\n"){
        this.textArray.push("Enter");
      } else if (tempTextArray[i]==="\t"){
        this.textArray.push("Tab");
      } else {
        this.textArray.push(tempTextArray[i]);
      }
    }
    // this.textArray = String(text).split('');
  }

  evalChar(keystrokeChar) {
    if(keystrokeChar === 'Shift') {
      console.log("Shift pressed, evalChar stopping");
      return;
    }
    this.keystrokeCounter++;
    if(this.waitingForBackspace === true) {
      if(keystrokeChar === 'Backspace')  { //8 === backspace
        this.waitingForBackspace = false;
        } else {
        // recommend error message
      }
    } else if (keystrokeChar === this.textArray[this.numberCorrect]) {  
      this.numberCorrect++;
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

  restartGame(){
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.gameOver = false;
  }
}