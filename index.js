// Act after a key is pressed
var level = 1;
var squaresOrder = [];
var index = 0;
var score = 0;
var maxScore = 0;
var start = false;
var restart = false;

$(document).on("keydown", function () {
  // Call to the primary function
  keyToStartPressed();
});

$(document).click(function (event) {
    if (!start) {
        keyToStartPressed();
    }
    else {
        clickOnSquare(event);
    }
});

function keyToStartPressed() {
  // Change h1 tag to level 1
  var text = $("#level-title").text();
  if (!start && restart) {
    start = false;
    restart = false;
    $("body").removeClass("game-over");
    $("#level-title").text("Level 1");
  }
  if (!start) {
    start = true;
    $("#level-title").text("Level 1");
    //select a square randomly
    var square = selectRandom();
    squaresOrder.push(square);
    var squareSelector = "." + square;

    // fadein and fadeout and display the sound
    fadeInFadeOut(squareSelector);
    makeSound(square);
  }
}

function clickOnSquare(event) {
    if (start) {
        var squareClicked = event.target.id;
        makeSound(squareClicked);
        var squareClickedSelector = "." + squareClicked;
        fadeInFadeOut(squareClickedSelector);
        // Si el color fue el correcto subir de nivel y
        // volver a reproducir un nuevo color
        if (
            squaresOrder[index] === squareClicked &&
            index + 1 === squaresOrder.length
        ) {
            level++;
            score++;
            $("#level-title").text("Level " + level.toString());
            $(".score").text("Score: " + score.toString());
            setTimeout(() => {
            nextSquare();
            }, 1000);
            index = 0;
        } else if (squaresOrder[index] === squareClicked) {
            index++;
        } else {
            // Si el color fue incorrecto
            gameOver();
        }
    }
}

function gameOver() {
  if (score > maxScore) {
    maxScore = score;
    $(".max-score").text("Max Score: " + maxScore.toString());
  }
  score = 0;
  index = 0;
  squaresOrder = [];
  level = 1;
  $(".score").text("Score: 0");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  makeSound("wrong");
  restart = true;
  start = false;
}

function nextSquare() {
  //select a square randomly
  var square = selectRandom();
  squaresOrder.push(square);
  var squareSelector = "." + square;

  // fadein and fadeout and display the sound
  makeSound(square);
  fadeInFadeOut(squareSelector);
}

function selectRandom() {
  var squares = [];
  squares.push("green");
  squares.push("red");
  squares.push("yellow");
  squares.push("blue");
  var index = Math.floor(Math.random() * 3);
  return squares[index];
}

function fadeInFadeOut(square) {
  $(square).fadeOut();
  setTimeout(() => {
    $(square).fadeIn();
  }, 100);
}

function makeSound(square) {
  var audio = new Audio("sounds/" + square + ".mp3");
  audio.play();
}
