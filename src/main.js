import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import Game from './js/game.js';

$(document).ready(function(){
  $('#inputTextbox').keypress(function(event){
    let keypressEvent = String.fromCharCode(event.keyCode); 

    let outputString;
    if (keypressEvent.toUpperCase() === "A"){
      outputString = `<span class="text-success">${keypressEvent}</span>`;
      $('#inputTextbox').removeClass('is-invalid');
      $('#inputTextbox').addClass('is-valid');
    } else {
      outputString = `<span class="text-danger">${keypressEvent}</span>`;
      $('#inputTextbox').removeClass('is-valid');
      $('#inputTextbox').addClass('is-invalid');
    }
    $('.showText').append(outputString);
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