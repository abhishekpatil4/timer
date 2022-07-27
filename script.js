//global variables
var flag = 0;
const countDownEl = document.getElementById('countdown');

//function to display time
function displayTime(time){
    minutes = Math.floor(time / 60);
    seconds = time % 60;

    //if minutes/seconds if less than 10 than 0 will be displayed before single digit
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    countDownEl.innerHTML = `${minutes}:${seconds}`;
}

//funtion thats called when timer starts
function startTimer(mint, sec, thisButton, buttonType) {
    if(sec < 0 || mint < 0 || isNaN(mint) || isNaN(sec)) 
    {
        alert("Invalid input!");
        clearInterval(refreshId);
        return 0;
    }

    var startSound = new Audio('sounds/nothingStart.mp3'); //play audio when start
    startSound.play();
    
    if(buttonType==0)
    {
        thisButton.disabled = true; //Checking if its START buttoon & disabling once function starts
    }
    
    if (mint == 0 && sec == 0) { //default time
        sec = 30;
    }
    
    var time = Number(mint*60) + Number(sec);
    
    displayTime(time);
    var flag_sound = 0;
    var refreshId = setInterval(updateCountdown, 1000);
    //setInterval() calls the function every 1 second
    // setInterval() returns an interval ID, which you can pass to clearInterval()

    function updateCountdown() {
        //when timer turns 00:00, button is enabled and function returns
        if (minutes <= 0 && seconds <= 0) {
            countDownEl.innerHTML = `00:00`;
            thisButton.disabled = false;
            return;
        }

        //when refresh button is pressed flag is set to 1
        if (flag == 1) {
            console.log("from startTimer() function, flag has been set!");
            clearInterval(refreshId);
            return 0;
        }
        
        if(time <= 3 && flag_sound == 0)
        {
            flag_sound = 1;
            var endingSound = new Audio('sounds/timerEnding.mp3'); //play audio when start
            endingSound.play();
        }

        //calling display function
        displayTime(time);
        time--;
        console.log("Time: " + time);
    }

}


//function thats called when Restart button is pressed
function restartTimer(mint, sec, thisButton, buttonType) {
    flag = 1; //setting flag to 1 to stop previous timer

    var restartSound = new Audio('sounds/nothing.mp3'); //play audio when restart
    restartSound.play();

    //Restart blink and calls the startTimer
    countDownEl.innerHTML = `RELOAD`;
    setTimeout(function() {
        countDownEl.innerHTML = `‎`; 
    }, 200);
    setTimeout(function() {
        countDownEl.innerHTML = `RELOAD`; 
    }, 500);
    setTimeout(function() {
        countDownEl.innerHTML = `‎`; 
        flag = 0;
        startTimer(mint, sec, thisButton, buttonType);
    }, 1000);
}

