import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    isTimerRunning: false,
    isReset: true,
    timeLimit: 25,
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      minutes: 25,
      seconds: 0,
      isTimerRunning: false,
      isReset: true,
      timeLimit: 25,
    })
  }

  onClickStartAndPause = event => {
    console.log(event.target)
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      clearInterval(this.timerId)
      this.setState({
        isTimerRunning: false,
      })
    } else {
      this.timerId = setInterval(this.countDown, 1000)
    }
  }

  countDown = () => {
    const {minutes, seconds} = this.state

    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState({isTimerRunning: false})
    } else {
      this.setState({
        minutes: seconds === 0 ? minutes - 1 : minutes,
        seconds: seconds === 0 ? 59 : seconds - 1,
        isTimerRunning: true,
        isReset: false,
      })
    }
  }

  onIncrement = () => {
    const {isReset, timeLimit} = this.state

    if (isReset) {
      this.setState({
        minutes: timeLimit + 1,
        timeLimit: timeLimit + 1,
      })
    }
  }

  onDecrement = () => {
    const {isReset, timeLimit} = this.state

    if (isReset && timeLimit !== 0) {
      this.setState({
        minutes: timeLimit - 1,
        timeLimit: timeLimit - 1,
      })
    }
  }

  render() {
    const {minutes, seconds, isTimerRunning, timeLimit} = this.state

    const minutesText = minutes < 10 ? `0${minutes}` : minutes
    const secondsText = seconds < 10 ? `0${seconds}` : seconds
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    const imageSrc = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const buttonText = isTimerRunning ? 'Pause' : 'Start'
    const imgAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="timer-card">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">{`${minutesText}:${secondsText}`}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-options-card">
            <div className="buttons-card">
              <button
                type="button"
                className="start-button button"
                onClick={this.onClickStartAndPause}
              >
                <img className="button-image" src={imageSrc} alt={imgAltText} />
                <p className="button-para">{buttonText}</p>
              </button>

              <button
                type="button"
                className="reset-button button"
                onClick={this.onReset}
              >
                <img
                  className="button-image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="instruction-para">Set Timer limit</p>
            <div className="increase-decrease-timer-card">
              <button
                type="button"
                className="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="timer-limit">{timeLimit}</p>
              <button
                type="button"
                className="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
