import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "display", "trigger", "indicator" ]

  connect() {
    this.renderButton()
    this.renderTime()
  }

  toggle(event) {
    if (this.isRunning) {
      this.stop()
      this.renderButton()
    } else {
      this.time = 0
      this.start(this.now())
      this.renderButton()
    }
  }

  now() {
    return Math.round(new Date().getTime() / 1000);
  }

  start(startedAt) {
    this.isRunning = true
    this.stopWatch = setInterval(() => {
      this.time = this.now() - startedAt
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.stopWatch)
  }

  get isRunning() {
    return this.data.get("isRunning").toLowerCase() === "true"
  }

  set isRunning(value) {
    this.data.set("isRunning", value.toString())
  }

  get time() {
    return parseInt(this.data.get("time"))
  }

  set time(value) {
    this.data.set("time", value)
    this.renderTime()
    this.updateIndicators()
  }

  renderTime() {
    this.displayTargets.forEach((el, i) => {
      el.innerHTML = this.decorateTime(this.time)
    });
  }

  renderButton() {
    if (this.isRunning) {
      this.triggerTargets.forEach((el, i) => {
        el.innerHTML = "Stop Brew"
        el.classList.remove("btn-outline-primary")
        el.classList.add("btn-outline-danger")
      })
    } else {
      this.triggerTargets.forEach((el, i) => {
        el.innerHTML = "Start Brew"
        el.classList.remove("btn-outline-danger")
        el.classList.add("btn-outline-primary")
      })
    }
  }

  decorateTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
  }

  updateIndicators() {
    if (this.indicatorTargets.some((indicator) => {
      return indicator.dataset.stepAt == this.time.toString()
    })) {
      this.indicatorTargets.forEach((indicator, i) => {
        if (parseInt(indicator.dataset.stepAt) == this.time) {
          indicator.classList.add("list-group-item-success")
        } else if (parseInt(indicator.dataset.stepAt) < this.time) {
          indicator.classList.remove("list-group-item-success")
          indicator.classList.add("list-group-item-secondary")
        } else {
          indicator.classList.remove("list-group-item-success")
          indicator.classList.remove("list-group-item-secondary")
        }
      })
    }
  }
}

