var wordBank = ["hello world", "game of thrones", "usa", "happy"];
var currentword = "";
var currentwordData = "";
var wordLength = 0;
var userStatus = false;
var display = "";
var life = 10;
var progress = 0;


document.onkeyup = function(event) {
  console.log("currentword: "+currentword);
  console.log("wordLength: "+wordLength);
  console.log("userStatus: "+userStatus);
  console.log("life: "+life);
  console.log("progress: "+progress);
  if(userStatus === "done"){
    return;
  }else if (userStatus === false) {
    document.querySelector("#result").innerHTML = "<p></p>";
    setUp();
  }else {
    play(event.key);
  }
}

function setUp() {
    var lengthDeduction = 0;
  currentwordData = "";
  display = "";
  currentword = wordBank[Math.floor((Math.random() * wordBank.length))];
  wordLength = currentword.length;
  for(var i = 0; i<wordLength; i++) {
      if (currentword.charAt(i) === " ") {
        display += "&nbsp";
        currentwordData +=" ";
        lengthDeduction += 1;
      } else {
        display += "_ ";
        currentwordData +="_";
      }
  }
  wordLength -= lengthDeduction;
  userStatus = true;
  var textToDisplay = "<p>"+display+"</p>";
  document.querySelector("#screen").innerHTML = textToDisplay;
}

function wordUpdate(location) {
  progress += 1;
  console.log("wordUpdate progress: "+progress);
  currentwordData = currentwordData.substring(0, location)+currentword[location]+currentwordData.substring(location+1, currentwordData.length);
  display = "";
  display = dataToDisplay(currentwordData);
  var textToDisplay = "<p>"+display+"</p>";
  document.querySelector("#screen").innerHTML = textToDisplay;
  var worldPlaceHolder = currentword.replace(event.key, "~");
  currentword = worldPlaceHolder;
  if(progress === wordLength) {
    document.querySelector("#result").innerHTML = "<p>You Won! =) Hit any key to play again!</p>";
    progress = 0;
    userStatus = false;
    display = "";
  }
}

function dataToDisplay(word) {
  for(var i = 0; i<word.length; i++) {
      if (word.charAt(i) === " ") {
        display += "&nbsp";
      } else if (word.charAt(i) != "_"){
        display += word.charAt(i)+" ";
      } else {
        display += "_ ";
      }
  }
  return(display);
}

function play(input) {
  var location = currentword.search(input);
  if(location === -1 && life != 0) {
    life -= 1;
  } else if(location === -1 && life === 0){
    document.querySelector("#result").innerHTML = "<p>You ran out of lives! =(</p>";
    userStatus = "done";
  } else {
    wordUpdate(location);
  }
}
