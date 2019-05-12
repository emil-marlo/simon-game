var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if(!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});



$("div[type=button]").click(function() {
  var userChosenColor = this.id;
  userPattern.push(userChosenColor);

  //play sound when user clicks
  playSound(userChosenColor);

  //animate pressed when button is clicked
  animatePress(userChosenColor);

  //check user's chosen color
  var last = userPattern.length - 1;
  checkAnswer(last);


});



function nextSequence() {

  //reset level for the next round
  userPattern=[];

  //update level by 1
  level++;

  //update h1 text per level
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playSound
  playSound(randomChosenColor);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("right");

    if(userPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }

  else{
    console.log("wrong");
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

    $("h1").text("Game Over, Press Any Key to Start");

    startOver();
  }

}

//function to restart the game 
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
