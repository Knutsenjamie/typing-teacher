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
    console.log("gameObject.waitingForBackspace is " + game.waitingForBackspace);
    console.log("next letter to type: " + game.textArray[game.numberCorrect]);
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
    if(keypressEvent === 'Tab'){
      event.preventDefault();
      let currentContent = $('#inputTextbox').val();
      $('#inputTextbox').val(currentContent + '\t');
    }
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
      $(document).focus();
    } else {
      highlightCompletedText(gameObject);
    }
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
      $('.showText').html(`<p>${fileContent}</p>`);
      console.log("This is inside reader.onload: Your textArray is now: " + JSON.stringify(gameObject.textArray));
    };
    reader.readAsText(file);
  });

  $("#restartButton").click(function(){
    gameObject.restartGame();
    highlightCompletedText(gameObject);
    $('#inputTextbox').val("");
    $('#inputTextbox').addClass('is-valid');
    $('#inputTextbox').removeClass('is-invalid');
    $('#inputTextbox').removeAttr('disabled');
    $('#inputTextbox').focus();
  });
});