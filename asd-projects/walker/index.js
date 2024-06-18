/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  var randomColor2 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  var positionX = 0; // the x-coordinate location for the box
var speedX = 0; // the speed for the box along the x-axis

let currentlyPressing = []

var walker = {
  y:0,
  x:0,
  ySpeed:0,
  xSpeed:0
}

var chaser = {
  y:0,
  x:0,
  ySpeed:0,
  xSpeed:0
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
  function handleKeyDown(event) {
   

    if (event.which === KEY.DOWN  || event.which === KEY.UP  ||event.which === KEY.RIGHT  ||event.which === KEY.LEFT  ) {
    if (event.which === KEY.DOWN) {
      console.log("down")
      walker.ySpeed = +5
      currentlyPressing.push("down")
  }
  if (event.which === KEY.UP) {
    console.log("up")
    walker.ySpeed = -5
    currentlyPressing.push("up")
}
if (event.which === KEY.LEFT) {
  console.log("left")
  walker.xSpeed = -5
  currentlyPressing.push("left")
}
if (event.which === KEY.RIGHT) {
  console.log("right")
  walker.xSpeed = +5
  currentlyPressing.push("right")
}
    }

      if (event.which === KEY.S) {
        console.log("down")
        chaser.ySpeed = +3
       
    }
    if (event.which === KEY.W) {
      console.log("up")
      chaser.ySpeed = -3
      
  }
  if (event.which === KEY.A) {
    console.log("left")
    chaser.xSpeed = -3
   
  }
  if (event.which === KEY.D) {
    console.log("right")
    chaser.xSpeed = +3
    
  }

  


  }

  


  function handleKeyUp(event) {
   

   
    if (event.which === KEY.DOWN) {

      console.log("down")

      let isxPossible = true

     console.log(currentlyPressing)

     

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
    var chaser = $("#chaser")
    var walker = $("#walker")
console.log(chaser.css("top"))
// here
    if (chaser.top <= walker.bottom && chaser.bottom >= walker.top && chaser.left <= walker.right && chaser.right >= walker.left)
      {console.log("wtf am I ding")}
  }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
