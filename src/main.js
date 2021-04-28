import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './js/game.js';

function catchBackspace(event, game) {
  console.log("This is event.key: "+event.key);
  let keystroke = event.key;
  game.evalChar(keystroke);
  if(!game.waitingForBackspace){
    console.log("backspace pushed");
    $(document).off();
    $('#inputTextbox').removeAttr('disabled');
    $('#inputTextbox').removeClass('is-invalid');
    $('#inputTextbox').addClass('is-valid');
    $('#inputTextbox').focus();
    event.preventDefault();
    // let inputTextboxArray=$('#inputTextbox').val().split("");
    // game.numberCorrect=0;
    // for(let i=0; i<inputTextboxArray.length; i++){
    //   if(game.textArray[i]===inputTextboxArray[i]){
    //     game.numberCorrect++;
    //     console.log("TW: " + game.textArray[i]);
    //   }
    // }
    console.log("gameObject.waitingForBackspace is " + game.waitingForBackspace);
    console.log("next letter to type: " + game.textArray[game.numberCorrect]);
    // gameObject.waitingForBackspace=true;
    // console.log("After it's set to true, gameObject.waitingForBackspace is " + gameObject.waitingForBackspace);
  }
  else{
    console.log("other key pushed");
  }
}

function gameOver(game){
  $('#inputTextbox').attr('disabled', 'disabled');
  let percentAccuracy=Math.round(game.getAccuracy()*100);
  let speed = Math.round(game.textArray.length/(game.time/1000));
  $('#inputTextbox').val(`Good job! Your accuracy was ${percentAccuracy}% and your speed was ${speed} characters per second`);
}

function highlightCompletedText(game){
  let textArray = [...game.textArray];
  const positionToInsertClosingTag = game.numberCorrect;
  textArray.splice(positionToInsertClosingTag, 0, '</span>');
  textArray.unshift('<p><span class="text-success">');
  textArray.push('</p');
  $('.showText').html(textArray.join(""));
}

$(document).ready(function(){
  let gameObject = new Game();
  let startTime;
  let endTime;
  let defaultText= "this is the default practice typing text";
  gameObject.setTextArray(defaultText);
  $('#inputTextbox').addClass('is-valid');
  $('.showText').html(`<p>${gameObject.textArray.join("")}</p>`);
  $('#inputTextbox').keydown(function(event){
    if (gameObject.keystrokeCounter===0){
      startTime = new Date().getTime();
    }
    let keypressEvent = event.key; 
    console.log(event.key);
    gameObject.evalChar(keypressEvent);
    if(gameObject.gameOver){
      console.log("Game finished!");
      endTime=new Date().getTime();
      gameObject.time = endTime - startTime;
      console.log("This is the time: " + gameObject.time);
      gameOver(gameObject);
    }
    
    if(gameObject.waitingForBackspace){
      $('#inputTextbox').attr('disabled', 'disabled');
      $('#inputTextbox').removeClass('is-valid');
      $('#inputTextbox').addClass('is-invalid');
      $(document).on("keydown", function(event){
        catchBackspace(event, gameObject);
      });
    } else {
      highlightCompletedText(gameObject);
    }
    // some sort of styling on... displayed text(?) if correct/incorrect
    // let outputString;
    // if (keypressEvent.toUpperCase() === "A"){
    //   outputString = `<span class="text-success">${keypressEvent}</span>`;
    //   $('#inputTextbox').removeClass('is-invalid');
    //   $('#inputTextbox').addClass('is-valid');
    //   $('#inputTextbox').attr('disabled', 'disabled');
      
    // } else {
    //   outputString = `<span class="text-danger">${keypressEvent}</span>`;
    //   $('#inputTextbox').removeClass('is-valid');
    //   $('#inputTextbox').addClass('is-invalid');
    // }
    // $('.showText').append(outputString);
  });

  $('#inputFile').change(function() {
    $('#inputTextbox').val("");
    $('#inputTextbox').addClass('is-valid');
    $('#inputTextbox').removeClass('is-invalid');
    $('#inputTextbox').removeAttr('disabled');
    $('#inputTextbox').focus();
    gameObject.restartGame();
    const file = this.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = function(e) {
      fileContent = e.target.result;
      gameObject.setTextArray(fileContent);
      console.log(fileContent);
      $('.showText').html(`<p>${fileContent}</p>`); //replace with return fileContent when migrating to backend
      console.log("This is inside reader.onload: Your textArray is now: " + JSON.stringify(gameObject.textArray));
    };
    reader.readAsText(file);
  });
});

// jQuery.get(thefile), function(data) {
//   $('#txtData').val(data);
// }


// jQuery.get('file', function(data) {
//     const myTextfile = data;
// });
