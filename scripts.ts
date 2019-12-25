let timerStarted = false;
function startBrew() {
  if (timerStarted === true) { return; }
  const brewTimer: HTMLElement | null = document.getElementById("brew-timer");
  if (brewTimer === null) {
    console.error("No element with id: `brew-timer` found in DOM");
    return;
  }
  timerStarted = true;
  startTimer(brewTimer);
}

function startTimer(brewTimer: HTMLElement) {
  const currentTime = brewTimer.innerHTML;
  const minuteAndSecond = currentTime.split(/[:]+/);
  const minute = Number(minuteAndSecond[0]);
  const second = Number(minuteAndSecond[1]);
  let nextSecond = second + 1;
  let nextMinute = minute;
  if (nextSecond > 59) {
    nextSecond = 0;
  }
  if (nextSecond === 0) {
    nextMinute = minute + 1;
  }
  const newTime = displayTime(nextMinute, nextSecond);
  brewTimer.innerHTML = newTime;
  console.log(newTime);
  setTimeout(() => { startTimer(brewTimer); }, 1000);
}

function displayTime(minute: number, second: number): string {
  return `${minute}:${String(second).padStart(2, "0")}`;
}
