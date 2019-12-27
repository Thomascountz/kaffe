function decorateTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
}

let brewStarted = false;
function startBrew(event: Event) {
  if (brewStarted === true) { return; }
  const brewTimer: HTMLElement | null = document.getElementById("brew-timer");
  if (brewTimer === null) {
    console.error("No element with id: `brew-timer` found in DOM");
    return;
  }
  brewStarted = true;
  const startedAt = now();
  startTimer(brewTimer, startedAt);
}

function now(): number {
   return Math.round(new Date().getTime() / 1000);
}

function startTimer(brewTimer: HTMLElement, startedAt: number) {
  updateStepIfTime(0);
  setInterval(() => {
    const brewTime = now() - startedAt;
    brewTimer.innerHTML = decorateTime(brewTime);
    updateStepIfTime(brewTime);
    console.log(brewTime);
  }, 1000);
}

function updateStepIfTime(brewTime: number) {
  const query = `[data-step-at='${String(brewTime)}']`;
  const steps = document.querySelectorAll(query);
  if (steps.length > 0) {
    const previousSteps = document.querySelectorAll(".list-group-item-success");
    previousSteps.forEach((step: Element, index: number, allPreviousSteps: NodeListOf<Element>) => {
      step.classList.remove("list-group-item-success");
      step.classList.add("list-group-item-secondary");
    });
    steps.forEach((step: Element, index: number, allSteps: NodeListOf<Element>) => {
      step.classList.add("list-group-item-success");
    });
  }
}

function displayTime(minute: number, second: number): string {
  return `${minute}:${String(second).padStart(2, "0")}`;
}
