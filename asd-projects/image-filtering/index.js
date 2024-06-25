// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here


applyFilter(reddify)
applyFilterNoBackground(increaseGreenByBlue)
applyFilterNoBackground(decreaseBlue)
applySmudge("down", "left", 5)
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction) {
var rgbString

  for(i = 0; i < image.length; i++)
    {
for(z = 0; z < image[i].length; z++) {
  rgbString = image[i][z]


  var rgbNumbers = rgbStringToArray(rgbString)

  
filterFunction(rgbNumbers)


  rgbString = rgbArrayToString(rgbNumbers)

  

  image[i][z] = rgbString
  
}
    }
}

// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction) {
var bgR = rgbStringToArray(image[0][0])[0]
var bgG = rgbStringToArray(image[0][0])[1]
var bgB = rgbStringToArray(image[0][0])[2]

  var rgbString
  
    for(i = 0; i < image.length; i++)
      {
  for(z = 0; z < image[i].length; z++) {
   
    rgbString = image[i][z]
  
  
    var rgbNumbers = rgbStringToArray(rgbString)
  
  
    if (rgbNumbers[RED] === bgR && rgbNumbers[BLUE] === bgB && rgbNumbers[GREEN] === bgG) {

    }
    else 
    
  filterFunction(rgbNumbers)
  
  
    rgbString = rgbArrayToString(rgbNumbers)
  
    

    image[i][z] = rgbString
    
  }
      }
  }

// TODO 5: Create the keepInBounds function

function keepInBounds (b){
  return b > 255 ? 255 : b < 0 ? 0 : 0

}



// TODO 3: Create reddify function

function reddify (pRed) {
pRed[RED] = 200
}

// TODO 6: Create more filter functions

function decreaseBlue (bl) {
  return(keepInBounds(bl[BLUE] = bl[BLUE] - 50))

}

function increaseGreenByBlue (gr) {
return(keepInBounds(gr[GREEN] + gr[BLUE]))
}
// CHALLENGE code goes below here



function applySmudge(directionA,directionB,intensity) {

    var rgbString
    
      for(i = 0; i < image.length; i++)
        {
    for(z = 0; z < image[i].length; z++) {
     
      rgbString = image[i][z]

      // define neighbors
    
      let leftN
      let rightN
      let upN
      let downN
      if (z > 0) {  
        leftN = rgbStringToArray((image[i][z-1]))
  
      }
      
      if (z < image[i].length-1) {  
      
        rightN = rgbStringToArray((image[i][z+1]))
  
      }
      

      if (i > 0) {  upN = rgbStringToArray((image[i-1][z]))}

      if (i < image.length-1) {  downN = rgbStringToArray((image[i+1][z]))
     
      }
    

      // put them in an object so it isnt a pain to call all fo them
      let neighbors = {

      "left": leftN,
      "right": rightN,
      "up": upN,
      "down": downN,
      }

   
   
    
      var rgbNumbers = rgbStringToArray(rgbString)
      var bgR = rgbStringToArray(image[0][0])[0]
      var bgG = rgbStringToArray(image[0][0])[1]
      var bgB = rgbStringToArray(image[0][0])[2]
       
        if (rgbNumbers[RED] === bgR && rgbNumbers[BLUE] === bgB && rgbNumbers[GREEN] === bgG) {
    
        }
        else {
   // call smudgeMech depending on the param direction
   let nTotality

    if (directionA == "left") {
      if (leftN) {
   
        nTotality = smudgeMech("left",intensity, rgbNumbers, neighbors)
        var toString = rgbArrayToString(nTotality)
        image[i][z-1] = toString


      }
    }
  
    if (directionA == "right") {
      if (rightN) {
        nTotality = smudgeMech("right",intensity, rgbNumbers, neighbors)
        var toString = rgbArrayToString(nTotality)
        image[i][z+1] = toString

      }
    }
    if (directionA == "up") {
      if (upN) {
        nTotality = smudgeMech("up",intensity, rgbNumbers, neighbors)
        var toString = rgbArrayToString(nTotality)
        image[i-1][z] = toString
      }
    }
    if (directionA == "down") {
      if (downN) {
        nTotality = smudgeMech("down",intensity, rgbNumbers, neighbors)
        var toString = rgbArrayToString(nTotality)
        image[i+1][z] = toString
      }
    }
  
    
    
      rgbString = rgbArrayToString(rgbNumbers)
    
      

      image[i][z] = rgbString
      
    }
        }
    }


    // define helper function
    function smudgeMech (direct, y, queue, neighbors) {

      // get the rgbs
    let alteredR = queue[0]/y
    let alteredG = queue[1]/y
    let alteredB = queue[2]/y

   
    var neighborsArr = [(alteredR+neighbors[direct][0]-30), (alteredG+neighbors[direct][1]-30),(alteredB+neighbors[direct][2]-30)]
return(neighborsArr)
    
    }}