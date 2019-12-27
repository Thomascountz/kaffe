import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "display" ]

  connect() {
    console.log("Connected to stopwatch controller")
    console.log(this)
  }

  start() {
    this.startStopwatch(this.now())
  }

  pause() {
  }

  reset() {
  }

  now() {
    return Math.round(new Date().getTime() / 1000);
  }

  startStopwatch(startedAt) {
    this.stopWatch = setInterval(() => {
      this.time = this.now() - startedAt
      console.log(this.time)
    }, 1000);
  }

  get time() {
    return parseInt(this.data.get("time"))
  }

  set time(value) {
    this.data.set("time", value)
    this.displayTime()
  }

  displayTime() {
    this.displayTargets.forEach((el, i) => {
      console.log(this.decorateTime((this.time)))
      el.innerHTML = this.decorateTime(this.time)
    });
  }

  decorateTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
  }

}

