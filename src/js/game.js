export default class Game {
  constructor() {
    this.numberCorrect = 0;
    this.keystrokeCounter = 0;
    this.waitingForBackspace = false;
  }
  evalChar(keystrokeChar, arrayChar) {
    // if(this.waitingForBackspace === true) {
    //   if(keystrokeChar === temp)  { //temp === backspace
    //     this.waitingForBackspace = false;
    //     //collectUserInput(); //frontend function
    //   } else {
    //     // recommend error message
    //     //collectUserInput();
    //   }
    // } else if (keystrokeChar === arrayChar) {
    //   this.numberCorrect ++
    //   //collectUserInput();
    // } else {
    //   this.waitingForBackspace = true;
    //   //collectUserInput();
    // }
  }
}

// collectUserInput()
  

// <input type="text" onkeydown="myFunction()"> 

// <onchange=function()>

// $("input").on('keystroke',function)

// keyStrokeChar = $("#inputField").val('').charAt(length);


// `KeyboardEvent: key='${event.key}' | code='${event.code}'`