var sequenceArray = [];
var sequenceLength = 0;
var numberInSequence = 0;

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
    document.querySelector("." + lastColorInSequence).classList.toggle("pressed");
    setTimeout(()=>{
        document.querySelector("." + lastColorInSequence).classList.toggle("pressed")}
        , 150);
}

function sequnceChecker() {
    if($(".start-game").css("display") !== "none"){
        return;
    }
    var buttonColor = this.classList[1];
    if(sequenceArray[numberInSequence] === buttonColor){
        var sound = new Audio("sounds/" + buttonColor + ".mp3");
        sound.play();
    }
    numberInSequence++;
    if(numberInSequence > sequenceLength){
        numberInSequence = 0;
        sequenceLength++;
        setTimeout(nextSequence, 300);
    }
    
}

function squareHighlight() {
    this.classList.toggle("pressed");
    setTimeout(()=>{this.classList.toggle("pressed")}, 80);
}
// Hides start game button and calls the next sequence 
// after waiting for the button to hidefunction
$(".start-game").on("click", function(){
    $(this).hide("fast");
    setTimeout(nextSequence, 190);
});

$(".btn").on("click", squareHighlight);
$(".btn").on("click", sequnceChecker);
