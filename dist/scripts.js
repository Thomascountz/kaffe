"use strict";
var timerStarted = false;
function startBrew() {
    if (timerStarted == true) {
        return;
    }
    var brewTimer = document.getElementById("brew-timer");
    if (brewTimer == null) {
        console.error("No element with id: `brew-timer` found in DOM");
        return;
    }
    timerStarted = true;
    startTimer(brewTimer);
}
function startTimer(brewTimer) {
    var currentTime = brewTimer.innerHTML;
    var minuteAndSecond = currentTime.split(/[:]+/);
    var minute = Number(minuteAndSecond[0]);
    var second = Number(minuteAndSecond[1]);
    var nextSecond = second + 1;
    var nextMinute = minute;
    if (nextSecond > 59) {
        nextSecond = 0;
    }
    if (nextSecond == 0) {
        nextMinute = minute + 1;
    }
    var newTime = displayTime(nextMinute, nextSecond);
    brewTimer.innerHTML = newTime;
    console.log(newTime);
    setTimeout(function () { startTimer(brewTimer); }, 1000);
}
function displayTime(minute, second) {
    return minute + ":" + String(second).padStart(2, "0");
}
//# sourceMappingURL=scripts.js.map