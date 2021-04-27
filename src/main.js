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
      outputString = `<textAr class="text-success">${keypressEvent}</span>`;
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
    console.log("A file was selected");
    // const input = this;
    const url = $(this).val();
    console.log(url);
  })
});

// jQuery.get(thefile), function(data) {
//   $('#txtData').val(data);
// }


// jQuery.get('file', function(data) {
//     const myTextfile = data;
// });