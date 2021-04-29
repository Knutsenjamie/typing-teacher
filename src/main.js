import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './js/game.js';

function catchBackspace(event, game) {
  
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

  let speed = Math.round(game.textArray.length/(game.timeElapsed));
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

$(document).ready(function() {
  // When page is opened, game is set to the game stored in local storage if it exists
  let gameObject = null;
  $('#restart').click(function () {
    gameObject.restartGame();
  });

  if (localStorage.getItem('game') != null) {
    let jsonString = localStorage.getItem('game');
    gameObject = Game.makeObject(jsonString);
    gameObject.timeLastSave = 0;
    console.log("game loaded timeLastSaved: "+gameObject.timeLastSave+" timeElapsed: "+gameObject.timeElapsed);
    let alreadyTyped = gameObject.textArray.slice(0,gameObject.numberCorrect).join('');
    $('#inputTextbox').val(alreadyTyped);

  } else {
    gameObject = new Game();
    gameObject.setTextArray("console.log()")
    console.log("new game: "+gameObject);
    localStorage.setItem('game', JSON.stringify(gameObject));
  }

  $('#inputTextbox').addClass('is-valid');
 
  $('.showText').html(`<p>${gameObject.textArray.join("")}</p>`);
  $('#inputTextbox').keydown(function(event) {
    if (gameObject.timeLastSave === 0) {
      gameObject.timeLastSave = new Date().getTime()/1000;
      console.log("timeLastSave was 0 set to "+gameObject.timeLastSave);
    }
    let keypressEvent = event.key; 
    console.log(event.key);
    if(keypressEvent === 'Tab') {
      event.preventDefault();
      //let cursorPosition = $('#inputTextbox').selectionStart;
      let currentContent = $('#inputTextbox').val();
      $('#inputTextbox').val(currentContent + '\t');
    }
    gameObject.evalChar(keypressEvent);
    if(gameObject.gameOver) {
      console.log("game end time elapsed is: "+gameObject.timeElapsed);
      gameOver(gameObject);
    }
    
    if(gameObject.waitingForBackspace) {
      $('#inputTextbox').attr('disabled', 'disabled');
      $('#inputTextbox').removeClass('is-valid');
      $('#inputTextbox').addClass('is-invalid');
      $(document).on("keydown", function(event) {
        catchBackspace(event, gameObject);
      });
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
    localStorage.clear();
    const file = this.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = function(e) {
      fileContent = e.target.result;
      let gameObject = new Game();
      gameObject.setTextArray(fileContent);
      localStorage.setItem('game',JSON.stringify(gameObject));
      $('.showText').html(`<p>${fileContent}</p>`); //replace with return fileContent when migrating to backend
      console.log("This is inside reader.onload: Your textArray is now: " + JSON.stringify(gameObject.textArray));
    };
    reader.readAsText(file);
    location.reload(true);
  });
});