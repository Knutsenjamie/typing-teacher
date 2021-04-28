import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './js/game.js';

function catchBackspace(event) {
  console.log("This is event.key: "+event.key);
  if(event.key==='Backspace'){
    console.log("backspace pushed");
    $(document).off("keydown", catchBackspace);
    $('#inputTextbox').removeAttr('disabled');
    $('#inputTextbox').focus();
  }
  else{
    console.log("other key pushed");
  }
}

$(document).ready(function(){
  let gameObject = new Game();
  let defaultText= "please type console.log()";
  gameObject.setTextArray(defaultText);
  $('.showText').html(`<p>${gameObject.textArray.join("")}</p>`);
  $('#inputTextbox').keydown(function(event){
    let keypressEvent = event.key; 
    console.log(event.key);
    gameObject.evalChar(keypressEvent);
    if(gameObject.gameOver){
      console.log("Game finished!");
    }
    //maybe disable textbox if waiting for backspace
    
    // if(gameObject.waitingForBackspace){
    //   $('#inputTextbox').attr('disabled', 'disabled');
    //   $('#inputTextbox').removeClass('is-valid');
    //   $('#inputTextbox').addClass('is-invalid');
    //   document.addEventListener("keydown", catchBackspace(event));
    // }
    //some sort of styling on... displayed text(?) if correct/incorrect
    // let outputString;
    // if (keypressEvent.toUpperCase() === "A"){
    //   outputString = `<span class="text-success">${keypressEvent}</span>`;
    //   $('#inputTextbox').removeClass('is-invalid');
    //   $('#inputTextbox').addClass('is-valid');
    //   $('#inputTextbox').attr('disabled', 'disabled');
    //   $(document).on("keydown", catchBackspace);
    // } else {
    //   outputString = `<span class="text-danger">${keypressEvent}</span>`;
    //   $('#inputTextbox').removeClass('is-valid');
    //   $('#inputTextbox').addClass('is-invalid');
    // }
    // $('.showText').append(outputString);
  });

  $('#inputFile').change(function() {
    const file = this.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = function(e) {
      fileContent = e.target.result;
      console.log(fileContent);
      $('.showText').html(`<p>${fileContent}</p>`); //replace with return fileContent when migrating to backend
    };
    reader.readAsText(file);
    //set text array in game object
  });
});

// jQuery.get(thefile), function(data) {
//   $('#txtData').val(data);
// }


// jQuery.get('file', function(data) {
//     const myTextfile = data;
// });
