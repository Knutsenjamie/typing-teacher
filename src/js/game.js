export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
    this.textArray = ['d','e','f','a','u','l','t'];
    this.gameOver = false;
    this.timeElapsed = 0;
    this.timeLastSave = 0;
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
        this.saveProgress();
      } else {
        // recommend error message
      }
    } else if (keystrokeChar === this.textArray[this.numberCorrect]) {  
      this.numberCorrect++;
      this.saveProgress();
      if(this.numberCorrect === this.textArray.length){
        this.gameOver = true;
        
      }
    } else {
      this.waitingForBackspace = true;
      this.saveProgress();
    }
  }
  getAccuracy(){
    return this.numberCorrect/this.keystrokeCounter;
  }

  restartGame(){
    localStorage.clear();
    location.reload(true);
  }

  static makeObject(jsonString) {
    let jsonObject =  JSON.parse(jsonString);
    let game = new Game();
    Object.assign(game, jsonObject);
    return game;
  }

  saveProgress() {
    let currentTime = new Date().getTime()/1000;
    this.timeElapsed += (currentTime - this.timeLastSave);
    console.log("add to time elapsed: "+(currentTime - this.timeLastSave));
    console.log("save progress time elapsed: " + this.timeElapsed);
    this.timeLastSave = currentTime;
    console.log("saved at: "+this.timeLastSave);
    localStorage.setItem('game',JSON.stringify(this));
  }
}