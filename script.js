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
    if(buttonType==0)
    {
        thisButton.disabled = true; //Checking if its START buttoon & disabling once function starts
    }
    
    if (mint == 0 && sec == 0) { //default time
        sec = 30;
    }
    var time = Number(mint*60) + Number(sec);
    
    displayTime(time);

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

        //calling display function
        displayTime(time);
        time--;
    }

}


//function thats called when Restart button is pressed
function restartTimer(mint, sec, thisButton, buttonType) {
    flag = 1; //setting flag to 1 to stop previous timer

    //Restart blink and calls the startTimer
    countDownEl.innerHTML = `RESTART!`;
    setTimeout(function() {
        countDownEl.innerHTML = `‎`; 
    }, 333);
    setTimeout(function() {
        countDownEl.innerHTML = `RESTART!`; 
    }, 666);
    setTimeout(function() {
        countDownEl.innerHTML = `‎`; 
        flag = 0;
        startTimer(mint, sec, thisButton, buttonType);
    }, 1000);
}

