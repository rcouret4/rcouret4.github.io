/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var triggered = false



  let mode 

  let chaserPoints = 0
  let walkerPoints = 0
  let timer = 30
  let botDifficulty = 0

  let empTimer = 15

  let empVariation = 0

  let empReady = true

  let chaserCurrentSpeed = 3

  let score = 0

  let timesPopped = 0

let health = 3

  
  
  while (!mode) {
  const bOF= prompt("Do you want to play against a bot or a friend?")
 console.log(bOF)



if (bOF == "bot" || bOF == "b" || bOF == "robot" ) {
 mode = "bot"
}
else if (bOF == "p" || bOF == "player" || bOF == "friend" || bOF == "f" || bOF == "amigo" || bOF == "")
  { mode = "player"}

else if (bOF == null)  {
  mode = "bot"
}

else { alert("What does "+bOF+" mean??")}
  }

  $("#chaser").css("outline-style", "dashed")
  $("#walker").css("outline-style", "dashed")

 

  $("#timer").text(timer)


  if (mode == "player") {
$("#emp").text("")
  }

  setInterval(handleTimer, 1000)
  function handleTimer() {
    timer = timer -1
  
    $("#timer").text(timer)
    if (mode == "bot") {
      $("#timer").text(timer+" DIFF: "+botDifficulty*10)
    }
    if (timer == 0) {
      timer = 30
      $("#timer").text(timer)
      if (mode == "bot") {
        $("#timer").text(timer+" DIFF: "+botDifficulty*10)
      }
      endGameWalker()
    }
  }


  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  var randomColor2 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

 

  $("#wscore").css("-webkit-text-stroke-color", randomColor)
  $("#cscore").css("-webkit-text-stroke-color", randomColor2)

  if (mode == "bot") {
    $("#cscore").text("")
    $("#wscore").text("Score: 0")
    $("#hearts").text("❤️  ❤️  ❤️")
  }

  var positionX = 0; // the x-coordinate location for the box
var speedX = 0; // the speed for the box along the x-axis


let currentlyPressing = []

const OGwalker = {
  y:parseFloat($("#walker").css("top")),
  x: parseFloat($("#walker").css("left")),
  ySpeed:0,
  xSpeed:0,
}

const OGchaser = {
  y:parseFloat($("#chaser").css("top")),
  x: parseFloat($("#chaser").css("left")),
  ySpeed:0,
  xSpeed:0,
}

var walker = {
  y:parseFloat($("#walker").css("top")),
  x: parseFloat($("#walker").css("left")),
  ySpeed:0,
  xSpeed:0,
}

var chaser = {
  y:parseFloat($("#chaser").css("top")),
  x: parseFloat($("#chaser").css("left")),
  ySpeed:0,
  xSpeed:0,
}




$("#walker").css('background-color',randomColor)


$("#chaser").css('background-color',randomColor2)

  const KEY =  {
"LEFT": 37, //l
"RIGHT": 39, //r
"DOWN": 40, //d
"UP": 38, //u

"A": 65,
"D": 68,
"S": 83,
"W": 87,

"R": 82,
  };
  
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);      
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   
    repositionGameItem()
    redrawGameItem()
    wallCollision()
    checkForCollision()

    if (mode == "bot") {
      botChasePlayer()
    }

    let anyXWalker = false
let anyYWalker = false

let anyXChaser = false
let anyYChaser = false

    for (i = 0;i <= currentlyPressing.length; i++) {


if (! (currentlyPressing[i] == "left" || currentlyPressing[i] == "right") ) {
  anyXWalker = true
}

if (! (currentlyPressing[i] == "up" || currentlyPressing[i] == "down")) {
  anyYWalker = true
}

if (! (currentlyPressing[i] == "A" || currentlyPressing[i] == "D")) {
  anyXChaser = true
}

if (! (currentlyPressing[i] == "W" || currentlyPressing[i] == "S")) {
  anyYChaser = true
}

if (i == currentlyPressing.length) {
  if (anyXWalker == false) {
walker.xSpeed = 0
  }

  if (anyYWalker == false) {
    walker.ySpeed = 0
      }

      if (anyXChaser == false) {
        chaser.xSpeed = 0
          }

          if (anyYWalker == false) {
            chaser.ySpeed = 0
              }
}

  }

}
  
  /* 
  Called in response to events.
  */


  //



  function handleKeyDown(event) {
   

    if (event.which === KEY.DOWN  || event.which === KEY.UP  ||event.which === KEY.RIGHT  ||event.which === KEY.LEFT  ) {
    if (event.which === KEY.DOWN) {
     
      walker.ySpeed = +5
      currentlyPressing.push("down")
  }
  if (event.which === KEY.UP) {
   
    walker.ySpeed = -5
    currentlyPressing.push("up")
}
if (event.which === KEY.LEFT) {

  walker.xSpeed = -5
  currentlyPressing.push("left")
}
if (event.which === KEY.RIGHT) {
 
  walker.xSpeed = +5
  currentlyPressing.push("right")
}
    }

      if (event.which === KEY.S) {
        if (mode == "player") {
       
        chaser.ySpeed = +3
        }
       
    }
    if (event.which === KEY.W) {
      if (mode == "player") {
      chaser.ySpeed = -3
      }
  }
  if (event.which === KEY.A) {
    if (mode == "player") {
    chaser.xSpeed = -3
    }
  }
  if (event.which === KEY.D) {
    if (mode == "player") {
    chaser.xSpeed = +3
    }
  }

  if (mode == "bot") {
if (event.which === KEY.R) {
  if (empReady) {
    timesPopped = timesPopped+1
    empReady = false
  let empDuration = 0
  $("#emp").text("")


  var et = setInterval(setEmpTimer, 1000)
  function setEmpTimer() {
  empTimer --

  if (empTimer == 0) {
    clearInterval(et)
    empTimer = 15
    $("#emp").text("[EMP READY]")
    empReady = true
  }

    
  }
  
  triggerEMP()
  empBackground()
  var inter = setInterval(triggerEMP,1000)

  function triggerEMP () {
    if (empVariation > 0) {
    empAnimation()
    } else {
      $("#chaser").css("outline-color", "white")
    }

   
empDuration ++

if (empDuration < 5) {
// pause the chaser
empVariation = 2
chaserCurrentSpeed = 0
}

if (empDuration == 5) {
  // slow the chaser
empVariation = 1
chaserCurrentSpeed = 1.5
  }

  if (empDuration == 10) {
    empVariation = 0
    chaserCurrentSpeed = 3
   
    $("#chaser").css("outline-color", "white")
      clearInterval(inter)
    
  }

}

function empAnimation () {

  if ( $("#chaser").css("outline-color") == "rgb(255, 255, 255)" ) {
  
    $("#chaser").css('outline-color','#00569D');

    

  }
  else { $("#chaser").css("outline-color", "white")
 
  }


}

function empBackground () {
let blue = 255

var a = setInterval(changeColor, 1)

function changeColor () {

blue = blue-2
  $("#board").css('background-color','rgb(0,0,'+blue+')');

  if (blue < 0 ) {
    clearInterval(a)
  }

}

}
  }

  }


  }

}


  function handleKeyUp(event) {
   

   
    if (event.which === KEY.DOWN) {


      let isxPossible = true

   

     

      if (isxPossible == true)
 {      walker.ySpeed = 0 }
  }

  if (event.which === KEY.UP) {
 

      
 {      walker.ySpeed = 0 }

}
if (event.which === KEY.LEFT) {

    
 {      walker.xSpeed = 0 }
}
if (event.which === KEY.RIGHT) {
  


{      walker.xSpeed = 0 }
}
    

      if (event.which === KEY.S) {
     
       
   {      chaser.ySpeed = 0 }
    }
    if (event.which === KEY.W) {
     
  
 {      chaser.ySpeed = 0 }
  }
  if (event.which === KEY.A) {

     
{      chaser.xSpeed = 0 }
  }
  if (event.which === KEY.D) {
   
{      chaser.xSpeed = 0 }
  }

    


  }



  //////////////////////////fd//////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() { 
walker.x += walker.xSpeed
walker.y+= walker.ySpeed

chaser.x += chaser.xSpeed
chaser.y+= chaser.ySpeed
  }

  function wallCollision() {

    if (walker.x > $("#board").width()-50) {

      walker.x = walker.x-5
  }

  if (walker.x < 0) {
    walker.x = walker.x+5
  }

    if (walker.y < 0) {
      walker.y = walker.y+5
    }

    if (walker.y > $("#board").height()-50) {
      walker.y = walker.y-5
  }

  


  //

  if (chaser.x > $("#board").width()-50) {

    chaser.x = chaser.x-5
}

if (chaser.x < 0) {
  chaser.x = chaser.x+5
}

  if (chaser.y < 0) {
    chaser.y = chaser.y+5
  }

  if (chaser.y > $("#board").height()-50) {
    chaser.y = chaser.y-5
}

}

  function redrawGameItem() { 
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);

    $("#chaser").css("left", chaser.x);
    $("#chaser").css("top", chaser.y);
  }

  function checkForCollision() {
    var chaserz = $("#chaser")
    var walkerz = $("#walker")
   

// here
    if (parseFloat(chaserz.css("top")) < parseFloat(walkerz.css("top"))+parseFloat(walkerz.css("height")) && parseFloat(chaserz.css("top"))+parseFloat(chaserz.css("height")) > parseFloat(walkerz.css("top")) && parseFloat(chaserz.css("left")) < parseFloat(walkerz.css("left"))+parseFloat(walkerz.css("width")) && parseFloat(chaserz.css("left"))+parseFloat(chaserz.css("width")) > parseFloat(walkerz.css("left")))
      {
       if (empVariation != 2)
        {
        endGame() 
        }
      }
  }



  function endGame() {
    if (mode == "player") {
    // stop the interval timer
    chaserPoints ++
    //console.log("- GAME END - \n CHASER: "+chaserPoints+" | WALKER: "+walkerPoints)

    $("#cscore").text(chaserPoints)

    }

    timer = 30
    $("#timer").text(timer)

    if (mode == "bot") {

      health = health-1

      if (health == 2)
        {$("#hearts").text("❤️  ❤️")}
      else if (health == 1)
        {$("#hearts").text("❤️")}
      else if (health == 0)
        {$("#hearts").text("")
score = score-timesPopped*10

let judgement
if (score <= 0) {judgement = "Did you lose on purpose?"}
else if (score <= 10) {judgement = "Not horrible, but you could do better."}
else if (score >= 50 && score <= 99) {judgement = "Wow!!"}
else if (score >= 100 && score <= 499) {judgement = "Whos even playing this game this far??"}
else if (score >= 500 && score <= 999) {judgement = "Wowzers"}

else if (score >= 1000) {judgement = "U MIGHT be himmothy"}



          alert("Your final score was: "+score +"\n \n You activated EMP "+timesPopped+" times, resulting in a score alteration of "+ -timesPopped*10+". EMPS arent cheap! \n \n " +judgement)
          location.reload()
        

        }
      


      $("#timer").text(timer+" DIFF: "+Math.round(botDifficulty*10,1))
    }
    walker.x = OGwalker.x
    walker.y = OGwalker.y

    chaser.x = OGchaser.x
    chaser.y= OGchaser.y

  

    

    
    

    // turn off event handlers
    
  }

  function botChasePlayer () {
    if (Math.round(chaser.x) >= Math.round(walker.x))
      {chaser.xSpeed = -chaserCurrentSpeed-botDifficulty
        if (walker.x+3 > chaser.x && walker.x-3 < chaser.x && empVariation < 1)
          {
            chaser.xSpeed = -1
          }}

    if (Math.round(chaser.x) <= Math.round(walker.x))
      {chaser.xSpeed = chaserCurrentSpeed+botDifficulty
    if (walker.x+3 > chaser.x && walker.x-3 < chaser.x && empVariation < 1)
      {
        chaser.xSpeed = 1
      }}

    if (Math.round(chaser.y) >= Math.round(walker.y))
      {chaser.ySpeed = -chaserCurrentSpeed-botDifficulty
        if (walker.y+3 > chaser.y && walker.y-3 < chaser.y && empVariation < 1)
          {
            chaser.ySpeed = -1
          }
      }

    if (Math.round(chaser.y) <= Math.round(walker.y))
      {chaser.ySpeed = chaserCurrentSpeed+botDifficulty
    if (walker.y+3 > chaser.y && walker.y-3 < chaser.y && empVariation < 1)
      {
        chaser.ySpeed = 1
      }}
  }

  function endGameWalker () {
    if (mode == "player") {
    walkerPoints ++
    $("#wscore").text(walkerPoints)
    }
    else {
      walkerPoints++
      var scoreAddition = 1*(botDifficulty*20+1)
      score = score+scoreAddition
      $("#wscore").text("Score: "+Math.round(score,1))
    }


    timer = 30
    $("#timer").text(timer)

    if (mode == "bot") {
      
      $("#timer").text(timer+" DIFF: "+Math.round(botDifficulty*10,1))
    }
    walker.x = OGwalker.x
    walker.y = OGwalker.y

    chaser.x = OGchaser.x
    chaser.y= OGchaser.y

    botDifficulty = botDifficulty+0.1

  

  }
  
}
