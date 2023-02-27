var sequenceArray = [];
var sequenceLength = 0;
var numberInSequence = 0;

// Adds a color to the array based on the random number than with a delay plays a sound 
// to the user and highlights the button that has been added to the sequence
function nextSequence() {
    var randNumber = Math.round(Math.random() * 3);
    switch (randNumber) {
        case 0:
            sequenceArray.push("blue");
            break;
        case 1:
            sequenceArray.push("red");
            break;
        case 2:
            sequenceArray.push("yellow");
            break;
        case 3:
            sequenceArray.push("green");
            break;
        default:
            console.log(randNumber);
            break;
    }
    var lastColorInSequence = sequenceArray[sequenceArray.length - 1];
    var sound = new Audio("sounds/" + lastColorInSequence + ".mp3");
    sound.play(); 
    $("." + lastColorInSequence).fadeOut(100).fadeIn(100);
}

function toggleGameOver() {
    document.querySelector("body").classList.toggle("game-over");
    document.querySelector(".game-end-title").classList.toggle("disappear");
}

// function checks if the start game button is hidden if not returns nothing, than checks if 
// the button clicked was the right button and plays a sound at the end it checks if the button 
// we clicked was last in sequence if so it runs nextSequence and resets the numberInSequence 
// postion and iterates sequenceLength
function sequnceChecker() {
    if($(".start-game").css("display") !== "none"){
        return;
    }
    var buttonColor = this.classList[1];
    if(sequenceArray[numberInSequence] === buttonColor){
        var sound = new Audio("sounds/" + buttonColor + ".mp3");
        sound.play();
    }else {
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        toggleGameOver();
        $(".start-game").show("fast");
        sequenceLength = 0;
        sequenceArray = [];
        return;
    }
    numberInSequence++;
    if(numberInSequence > sequenceLength){
        numberInSequence = 0;
        sequenceLength++;
        setTimeout(nextSequence, 300);
    }
    
}
// Highlights a button when it is pressed
function squareHighlight() {
    $(this).fadeOut(100).fadeIn(100);
}
// Hides start game button and calls the next sequence 
// after waiting for the button to hide and toggles the game 
// over screen if it detects it
$(".start-game").on("click", function(){
    $(this).hide("fast");
    if (document.querySelector("body").classList.length > 0){
        toggleGameOver();
    }
    setTimeout(nextSequence, 190);
});

$(".btn").on("click", squareHighlight);
$(".btn").on("click", sequnceChecker);
