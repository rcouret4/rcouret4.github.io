/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var killAllTheApples = $("<div id = 'applez'>").appendTo(board)
var scoreElement = $("#score");
var highScoreElement = $("#highScore");
let first = true

// TODO 4a: Create the snake, apple and score variables
// Game Variables
var snake = {}
var apple = {}
var apples = []
var score = 0



// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;
var lastKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() {
  // TODO 4c-2: initialize the snake
// initialize the snake's body as an empty Array
console.log("init")
snake.body = [];

// make the first snakeSquare and set it as the head
makeSnakeSquare(10, 10);
snake.head = snake.body[0];
  // TODO 4b-2: initialize the apple

  makeApple()
  makeApple()
  makeApple()
  makeApple()
  makeApple()

  makeApple()
  makeApple()
  makeApple()
  makeApple()
  makeApple()

  // TODO 5a: Initialize the interval
// start update interval
updateInterval = setInterval(update, 130);

function update() {
  
  hasCollidedWithSnake()
  moveSnake();

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }

  let hi = hasCollidedWithApple()
  if (hi != false) {
    
    handleAppleCollision(hi);
  }
}
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  // TODO 5b: Fill in the update function's code block
}

function checkForNewDirection(event) {
  /* 
  TODO 6b: Update snake.head.direction based on the value of activeKey.
  
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */
  var triggered
  if (activeKey === KEY.LEFT && lastKey != KEY.RIGHT ) {
  snake.head.direction = "left";
triggered = true
  }
  else if (activeKey === KEY.RIGHT && lastKey != KEY.LEFT) {
    snake.head.direction = "right";
    triggered = true
    }
    if (activeKey === KEY.DOWN && lastKey != KEY.UP) {
      snake.head.direction = "down";
      triggered = true
      }
      if (activeKey === KEY.UP && lastKey != KEY.DOWN) {
        snake.head.direction = "up";
        triggered = true
        }

        if (lastKey != activeKey && triggered == true) {lastKey = activeKey}
    
       
  // FILL IN THE REST

}

function moveSnake() {
  if (snake.body.length > 2) {
  console.log("column is "+snake.body[1].column + " row is "+snake.body[1].row)

  }

 for (i = snake.body.length-1 ; i > 0 ; i--) {

    var snakeSquare = snake.body[i];
   
    var nextSnakeSquare = snake.body[i-1]
   
    var nextRow = nextSnakeSquare.row
    var nextColumn = nextSnakeSquare.column
    var nextDirection = nextSnakeSquare.column

    snakeSquare.direction = nextDirection;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
    
}
    
  checkForNewDirection();

  

  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  }
  if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  }
  if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  }
  if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }
  
  repositionSquare(snake.head);
}

function hasHitWall() {
  /* 
  TODO 8: Should return true if the snake's head has collided with the four walls of the
  board, false otherwise.
  
  
  HINT: What will the row and column of the snake's head be if this were the case?
  */


 
  if (snake.head.row == ROWS+1 || snake.head.column == COLUMNS+1 || snake.head.row == -1 || snake.head.column == -1)  {return true}
else {return false;}
  
}


function hasCollidedWithApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */
 
 for (i = 0; i<apples.length; i++) {

  if (snake.head.row == apples[i].row && snake.head.column == apples[i].column)  {return apples[i]}
  
 }
 
  return false;
}

function handleAppleCollision(yo) {
  console.log("collected apple at " + yo.column + (" ," + yo.row))
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);

  // Remove existing Apple and create a new one
  
  yo.element.remove();
  
  let itsThisDude

 for (i = 0; i < apples.length; i++)
  {
    if (apples[i] == yo)
      itsThisDude = i
  }
  
  
  apples.splice(itsThisDude,1)


  
  makeApple();

  


  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */

 var row;
  var column;



  if (snake.head.direction == KEY.LEFT || snake.head.direction == "left") {
    row = snake.tail.row
    column = snake.tail.column+1
  }
  else if (snake.head.direction == KEY.RIGHT || snake.head.direction == "right") {
    row = snake.tail.row
    column = snake.tail.column-1
  }
  else if (snake.head.direction == KEY.UP || snake.head.direction == "up") {
    row = snake.tail.row-1
    column = snake.tail.column
  }
  else if (snake.head.direction == KEY.DOWN || snake.head.direction == "down") {
    row = snake.tail.row+1
    column = snake.tail.column
  }

  // code to determine the row and column of the snakeSquare to add to the snake

  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
 
  for (i = snake.body.length-1; i > 0; i--) {
    if (snake.head.column === snake.body[i].column) {
      if (snake.head.row === snake.body[i].row) {
        return true;
      }
    }
  }
  /* 
  TODO 12: Should return true if the snake's head has collided with any part of the
  snake's body.
  
  HINT: Each part of the snake's body is stored in the snake.body Array. The
  head and each part of the snake's body also knows its own row and column.
  
  */

  return false;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  apples = []
  // clear board of all elements
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);


}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */


function makeApple() {

  // make the apple jQuery Object and append it to the board
  apple.element = $("<div>").addClass("apple").appendTo(board)

  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  let hi = {}
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  hi.row =randomPosition.row;
  hi.column = randomPosition.column;
  hi.element = apple.element

  apples.push(hi)


  // position the apple on the screen
  repositionSquare(apple);
}

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  // initialize a new snakeSquare Object
  var snakeSquare = {};

  // make the snakeSquare.element Object and append it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  // initialize the row and column properties on the snakeSquare Object
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the position of the snake on the screen
  repositionSquare(snakeSquare);

  // if this is the head, add the snake-head id
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  // add snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) {
  // TODO 6a: make the handleKeyDown function register which key is pressed
  activeKey = event.which;
  

}

/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}

/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable = false;
  var randomPosition = {};

  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);

    let rcol = randomPosition.column 
    let rrow = randomPosition.row

    //fix this
    let triggered = false

    console.log("attempting to place apple at " + rcol + " ," + rrow)

    for (i = snake.body.length-1; i > 0; i--) {
  
      if (snake.body[i].column == randomPosition.column && snake.body[i].row == randomPosition.row) {
        triggered = true
        console.log("warning warning triggered")
        console.log("tried to place on "+snake.body[i].column+" "+snake.body[i].row)
        
      }
    }

    if (triggered == false) {
    spaceIsAvailable = true
    console.log("theres a space")
    }
   

    /*
    TODO 13: After generating the random position determine if that position is
    not occupied by a snakeSquare in the snake's body. If it is then set 
    spaceIsAvailable to false so that a new position is generated.
    */
  }
if (spaceIsAvailable == true)
  return randomPosition;
}

function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}
