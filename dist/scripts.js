"use strict";
var recipeName = "4:6";
if (document.readyState !== "loading") {
    renderRecipe(recipeName);
}
else {
    document.addEventListener("DOMContentLoaded", function () { renderRecipe(recipeName); });
}
function renderRecipe(name) {
    var stepList = document.getElementById("step-list");
    if (stepList === null) {
        console.error("No element with id: `step-list` found in DOM");
        return;
    }
    var recipe = recipies.find(function (r) { return r.name === name; });
    if (recipe === undefined) {
        console.error("No recipe with name: " + name + " found in DOM");
        return;
    }
    recipe.steps.forEach(function renderStep(step, index, steps) {
        var stepElement = buildProcessStepHTML(step);
        stepList.append(stepElement);
    });
}
var recipies = [
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
function buildProcessStepHTML(step) {
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("data-step-at", String(step.at));
    var stepProcess = document.createElement("p");
    stepProcess.classList.add("float-left");
    stepProcess.classList.add("text-monospace");
    stepProcess.innerText = step.process;
    var stepAt = document.createElement("p");
    stepAt.classList.add("float-right");
    stepAt.classList.add("text-monospace");
    stepAt.innerText = decorateTime(step.at);
    listItem.appendChild(stepAt);
    listItem.appendChild(stepProcess);
    return listItem;
}
function decorateTime(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds - minutes * 60;
    return String(minutes) + ":" + String(seconds).padStart(2, "0");
}
var brewStarted = false;
function startBrew(event) {
    if (brewStarted === true) {
        return;
    }
    var brewTimer = document.getElementById("brew-timer");
    if (brewTimer === null) {
        console.error("No element with id: `brew-timer` found in DOM");
        return;
    }
    brewStarted = true;
    var startedAt = now();
    startTimer(brewTimer, startedAt);
}
function now() {
    return Math.round(new Date().getTime() / 1000);
}
function startTimer(brewTimer, startedAt) {
    updateStepIfTime(0);
    setInterval(function () {
        var brewTime = now() - startedAt;
        brewTimer.innerHTML = decorateTime(brewTime);
        updateStepIfTime(brewTime);
        console.log(brewTime);
    }, 1000);
}
function updateStepIfTime(brewTime) {
    var query = "[data-step-at='" + String(brewTime) + "']";
    var steps = document.querySelectorAll(query);
    if (steps.length > 0) {
        var previousSteps = document.querySelectorAll(".list-group-item-success");
        previousSteps.forEach(function (step, index, allPreviousSteps) {
            step.classList.remove("list-group-item-success");
            step.classList.add("list-group-item-secondary");
        });
        steps.forEach(function (step, index, allSteps) {
            step.classList.add("list-group-item-success");
        });
    }
}
function displayTime(minute, second) {
    return minute + ":" + String(second).padStart(2, "0");
}
//# sourceMappingURL=scripts.js.map