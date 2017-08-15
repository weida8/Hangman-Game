var wordBank = ["hello world", "game of thrones", "usa", "happy"];
var currentword = wordBank[Math.floor((Math.random() * wordBank.length))];
var wordLength = currentword.length;
var userStatus = false;
var display = "";
var life = 10;
var progress = 0;

document.onkeyup = function(event) {
  if (userStatus === false) {
    setUp();
  }else {
    play(event.key);
  }
}

function setUp() {
  for(var i = 0; i<wordLength; i++) {
      if (currentword.charAt(i) === " ") {
        display += "&nbsp";
      } else {
        display += "_ ";
      }
  }
  userStatus = true;
  var textToDisplay = "<p>"+display+"</p>";
  document.querySelector("#screen").innerHTML = textToDisplay ;
}

function wordUpdate(location) {
  progress += 1;
  display = display.substring(0, location)+currentword[location]+display.substring(location+1, wordLength+1);
  var textToDisplay = "<p>"+display+"</p>";
  document.querySelector("#screen").innerHTML = textToDisplay;
}

function play(input) {
  var location = currentword.search(input);
  if(location === -1 && life != 0) {
    life -= 1;
  } else if(location === -1 && life === 0){
    document.querySelector("#result").innerHTML = "<p>You ran out of lives! =(</p>";
  } else if(progress === wordLength) {
    document.querySelector("#result").innerHTML = "<p>You Won! =) Hit any key to play again!</p>";
    userStatus = false;

  }
    else {
    wordUpdate(location);
  }
}
