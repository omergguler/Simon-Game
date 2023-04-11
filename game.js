var hasStarted = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var idName = "#" + randomChosenColour;
    $(idName).fadeOut(50).fadeIn(50);
    var audioName = "sounds/" + randomChosenColour + ".mp3";
    playSound(audioName);
    animatePress(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
}

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour) {
    var className = "." + currentColour;
    $(className).addClass("pressed");
    setTimeout(function() {
        $(className).removeClass("pressed");
    },100);
}

$(".btn").on("click", function(e) {
    var userChoosenColor = e.target.id;    
    userClickedPattern.push(userChoosenColor);
    var audioName = "sounds/" + userChoosenColor + ".mp3";
    playSound(audioName);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

document.addEventListener("keydown", function(event) {
    if (hasStarted == false) {
        hasStarted = true;
        $("#level-title").html("Level " + level);
        nextSequence();
    } else{
        
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if(userClickedPattern.length === gamePattern.length){
            resetUserPattern();
            setTimeout(
                function() 
                {
                    nextSequence();
                }, 1000);
            
        }
    } else{
        $("body").addClass("game-over");
        $("#level-title").html("GAME OVER!")
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        setTimeout(
            function() 
            {
                history.go(0)
            }, 1000);
        resetUserPattern();
        hasStarted = false;
    }
    
}

function resetUserPattern() {
    userClickedPattern = [];
}

