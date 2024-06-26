/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

async function bubbleSort (array) {
    

for (var i = 0; i< array.length-1; i++) {
    
    for (var j = array.length-1; j > i+1; j--) {
        
     
    
    
if ((array[j].value) < (array[j-1].value))
    {console.log("trigger")
        swap(array,j,j-1)


updateCounter(bubbleCounter);
await sleep();
    }
}

}


}




// TODO 3: Implement quickSort

async function quickSort (array,le,ri) {
 
if ((ri - le) > 0) {
    var index = partition(array,le,ri)
}
if (le < (index - 1))
    {quickSort(array, le, index - 1)}
if (index < ri) {
    quickSort(array, index, ri)
}
}

// TODOs 4 & 5: Implement partition

async function partition (array,le,ri) {
    var pivot = array[Math.floor((ri + le)/2)].value;
   

while (array[le].value < array[ri].value) {
  console.log(pivot+" "+array[le].value+" "+array[ri].value)

    while (array[le].value < pivot ) {array[le].value = array[le].value+1
        console.log(pivot+" "+array[le].value+" "+array[ri].value)
    }
    while (array[ri].value > pivot ) {array[ri].value = array[ri].value-1
        console.log(pivot+" "+array[le].value+" "+array[ri].value)
    }
   
    if (array[le].value< array[ri].value) {
        swap(array,le,ri)
        updateCounter(bubbleCounter);
await sleep();
    }
}
return(le+1)
}

// TODO 1: Implement swap

function swap (array,i,j) {
    // forgot what this is called, but it switches the indexes without ever having to create a variable
    [array[i], array[j]] = [array[j], array[i]]
    drawSwap(array, i, j)
        // pass array,i,j to drawSwap
    
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}