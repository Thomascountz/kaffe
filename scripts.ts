const recipeName = "4:6";
if (document.readyState !== "loading") {
  renderRecipe(recipeName);
} else {
  document.addEventListener("DOMContentLoaded", () => { renderRecipe(recipeName); } );
}

function renderRecipe(name: string) {
  const stepList: HTMLElement | null = document.getElementById("step-list");
  if (stepList === null) {
    console.error("No element with id: `step-list` found in DOM");
    return;
  }

  const recipe = recipies.find((r) => r.name === name);
  if (recipe === undefined) {
    console.error(`No recipe with name: ${name} found in DOM`);
    return;
  }

  recipe.steps.forEach(function renderStep(step: IStep, index: number, steps: IStep[]) {
    const stepElement = buildProcessStepHTML(step);
    stepList.append(stepElement);
  });
}

interface IStep {
  process: string;
  at: number;
}

interface IRecipe {
  name: string;
  steps: IStep[];
}

const recipies: IRecipe[] = [
  {
    name: "4:6",
    steps: [
      { process: "add 50g", at: 0 },
      { process: "add 70g = 120g", at: 45 },
      { process: "add 60g = 180g", at: 90 },
      { process: "add 60g = 240g", at: 135 },
      { process: "add 60g = 300g", at: 180 },
    ],
  },
];

function buildProcessStepHTML(step: IStep): HTMLElement {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.setAttribute("data-step-at", String(step.at));

  const stepProcess = document.createElement("p");
  stepProcess.classList.add("float-left");
  stepProcess.classList.add("text-monospace");
  stepProcess.innerText = step.process;

  const stepAt = document.createElement("p");
  stepAt.classList.add("float-right");
  stepAt.classList.add("text-monospace");
  stepAt.innerText = decorateTime(step.at);

  listItem.appendChild(stepAt);
  listItem.appendChild(stepProcess);

  return listItem;
}

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
