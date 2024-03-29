// console.log($("h1"));
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
let wrong = 0;
let clickEnabled = false;
let h1 = $('#level-title')
let interval;

// $(".btn").click(nextSequence)

$(".btn").click(function() {
    if (!started || !clickEnabled) {
        return
    }

    // if (clickEnabled === false) {
    //     return
    // }
    // console.log(clickEnabled);
    
    let buttonID = $(this).attr(("id"))
    let userChosenColour = buttonID
    // console.log(userChosenColour);
    userPattern.push(userChosenColour);
    
    console.log('userPattern: ' + userPattern);
    playSound(userChosenColour)
    animatePress(this)
    // Check user's answer after each click
    checkAnswer(userPattern.length - 1);
})

$(document).keydown(function(e) {
    if (started === false) {
        console.log("Key PRESSED");
        start();
        nextSequence();
    } else {
        return
    }

})
function start() {
    started = true;
    level = 0;
    wrong = 0;
    // clickEnabled = true;
    $(h1).text('Level ' + level);
    clickEnabled = true;
    console.log(clickEnabled);
    console.log("started");
}

function nextSequence() {
    // console.log("object");
    level++;
    console.log('level ' + level);
    userPattern = [];
    $(h1).text('Level ' + level);
    function getRandomNumber() {
        return Math.floor(Math.random() * 4);
    }
    var randomNumber = getRandomNumber();
    // console.log(randomNumber);
    
    let randomChosenNumber = buttonColors[randomNumber];
    // console.log(randomChosenNumber);
    gamePattern.push(randomChosenNumber);
    console.log(gamePattern);
    
    displaySequence(randomChosenNumber);
    playSound(randomChosenNumber)
}

function displaySequence() {
    let i = 0;
    clickEnabled = false;
    interval = setInterval(() => {
        flash(gamePattern[i]);
        i++
        if (i >= gamePattern.length) {
            console.log('gamePattern[i] ' + gamePattern[i]);
            clearInterval(interval);
            clickEnabled = true;
            console.log(clickEnabled);
        }
    }, 300);
    
}

function flash(color) {
    // let count = 0;
    setTimeout(function() {
        $(`#${color}`).fadeOut(100).fadeIn(100);
        }, 50);
    }
    
    function playSound(name) {
        let audio = new Audio(`sounds/${name}.mp3`);
        audio.play()
    }
    
    function animatePress(buttonClicked) {
        $(buttonClicked).addClass("pressed")
        setTimeout(() => {
            $(buttonClicked).removeClass("pressed")
        }, 100)
        // console.log($(buttonClicked).attr('class'));
    }
    
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            console.log('right answer');
            if (level === 6) {
                $(h1).text('Congratulations!!! Yon WON... Reload');
                console.log('Congratulations!!! Yon WON.');
                console.log('userPattern length is ' + userPattern.length);
                clickEnabled = false;
                return;
            } else {
                // Wait 1000 milliseconds before next sequence
                setTimeout(nextSequence(), 1000);
            }
            
    }
}
else {
    gameOver()
    // let count = 0
    // wrong++;
    // level--;
    // console.log('Wrong: ' + wrong);
    // console.log("wrong answer");
    // setTimeout(() => {
    //     $(h1).text('Wrong');
    // }, 500)
    // console.log('level: ' + level);
    // gamePattern.pop()
    // userPattern = [];
    // // let interval = setInterval(() => {
    // //     count++
    // //         if (count >= 1) {
    // //         clearInterval(interval);
    // //     }
        
    // // }, 100);
    // console.log('nooooo');
    // // $(h1).text('Level ' + level);
}
    
}

function gameOver() {
    let audio = new Audio('./sounds/wrong.mp3')
    audio.play()
    $('body').addClass("game-over");
    setInterval(() => {
        $('body').removeClass("game-over");
    }, 100);
    $(h1).text('Game Over!!! Better luck next time... Reload');
    clickEnabled = false;
    started = false
    // if (wrong > 2) {
    // }
}