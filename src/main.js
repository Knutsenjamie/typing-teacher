import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Game from "./js/game.js";
import ProgrammingQuotesApi from "./js/programming-quotes-api.js";

function catchBackspace(event, game) {
  let keystroke = event.key;
  game.evalChar(keystroke);
  if (!game.waitingForBackspace) {
    $(document).off();
    $("#inputTextbox").removeAttr("disabled");
    $("#inputTextbox").removeClass("is-invalid");
    $("#inputTextbox").addClass("is-valid");
    $("#inputTextbox").focus();
    event.preventDefault();
  } 
}

function gameOver(game) {
  $("#inputTextbox").attr("disabled", "disabled");
  let percentAccuracy = Math.round(game.getAccuracy() * 100);
  let speed = Math.round(game.textArray.length / (game.time / 1000));
  $("#inputTextbox").val(
    `Good job! Your accuracy was ${percentAccuracy}% and your speed was ${speed} characters per second`
  );
}

function highlightCompletedText(game) {
  let textArray = [...game.textArray];
  const positionToInsertClosingTag = game.numberCorrect;
  textArray.splice(positionToInsertClosingTag, 0, "</span>");
  textArray.unshift('<p><span class="text-success">');
  textArray.push("</p");
  $(".showText").html(textArray.join(""));
}

function getSafeRandomQuote(game) {
  let randomQuotePromise = ProgrammingQuotesApi.getRandomQuotePromise();
  randomQuotePromise
    .then(function (randomQuoteResponse) {
      if (randomQuoteResponse instanceof Error) {
        throw Error(
          `Programming Quotes API Request Error: ${randomQuoteResponse.message}`
        );
      }
      const isSafe = ProgrammingQuotesApi.isContentSafe(
        randomQuoteResponse.quote
      );
      if (isSafe) {
        game.setTextArray(randomQuoteResponse.quote);
        $(".showText").html(`<p>${randomQuoteResponse.quote}</p>`);
        return;
      }
      getSafeRandomQuote(game); //recursive maybe should put additional restrictions on in the future (limit # of calls)
    })
    .catch(function (error) {
      return error;
    });
}

$(document).ready(function () {
  let gameObject = new Game();
  let startTime;
  let endTime;
  getSafeRandomQuote(gameObject);

  $("#inputTextbox").keydown(function (event) {
    if (gameObject.keystrokeCounter === 0) {
      startTime = new Date().getTime();
    }
    let keypressEvent = event.key;
    if (keypressEvent === "Tab") {
      event.preventDefault();
      let currentContent = $("#inputTextbox").val();
      $("#inputTextbox").val(currentContent + "\t");
    }
    gameObject.evalChar(keypressEvent);
    if (gameObject.gameOver) {
      endTime = new Date().getTime();
      gameObject.time = endTime - startTime;
      gameOver(gameObject);
    }

    if (gameObject.waitingForBackspace) {
      $("#inputTextbox").attr("disabled", "disabled");
      $("#inputTextbox").removeClass("is-valid");
      $("#inputTextbox").addClass("is-invalid");
      $(document).on("keydown", function (event) {
        catchBackspace(event, gameObject);
      });
      $(document).focus();
    } else {
      highlightCompletedText(gameObject);
    }
  });

  $("#inputFile").change(function () {
    $("#inputTextbox").val("");
    $("#inputTextbox").addClass("is-valid");
    $("#inputTextbox").removeClass("is-invalid");
    $("#inputTextbox").removeAttr("disabled");
    $("#inputTextbox").focus();
    gameObject.restartGame();
    const file = this.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = function (e) {
      fileContent = e.target.result;
      gameObject.setTextArray(fileContent);
      $(".showText").html(`<p>${fileContent}</p>`);
    };
    reader.readAsText(file);
  });

  $("#restartButton").click(function () {
    gameObject.restartGame();
    highlightCompletedText(gameObject);
    $("#inputTextbox").val("");
    $("#inputTextbox").addClass("is-valid");
    $("#inputTextbox").removeClass("is-invalid");
    $("#inputTextbox").removeAttr("disabled");
    $("#inputTextbox").focus();
  });

  $("#randomQuoteButton").click(function () {
    getSafeRandomQuote(gameObject);
    gameObject.restartGame();
    $("#inputTextbox").val("");
    $("#inputTextbox").addClass("is-valid");
    $("#inputTextbox").removeClass("is-invalid");
    $("#inputTextbox").removeAttr("disabled");
    $("#inputTextbox").focus();
  });
});
