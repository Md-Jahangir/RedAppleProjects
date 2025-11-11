/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 11-05-2023
 * @Description :- Handles Loader.
 ************************************/

//#region - Class defination 
class Timer {
    // export default class Timer {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.FULL_DASH_ARRAY = null;
        this.WARNING_THRESHOLD = null;
        this.ALERT_THRESHOLD = null;
        this.COLOR_CODES = null;
        this.TIME_LIMIT = null;
        this.timePassed = null;
        this.timeLeft = null;
        this.timerInterval = null;
        this.remainingPathColor = null;
    };

    InitializeVariableValue(_timeValue) {
        this.FULL_DASH_ARRAY = 283;
        this.WARNING_THRESHOLD = 7;
        this.ALERT_THRESHOLD = 4;

        this.COLOR_CODES = {
            info: {
                color: "green"
            },
            warning: {
                color: "orange",
                threshold: this.WARNING_THRESHOLD
            },
            alert: {
                color: "red",
                threshold: this.ALERT_THRESHOLD
            }
        };

        this.TIME_LIMIT = _timeValue;
        this.timePassed = 0;
        this.timeLeft = this.TIME_LIMIT;
        this.timerInterval = null;
        this.remainingPathColor = this.COLOR_CODES.info.color;
    };

    CreateTheTimer() {
        document.getElementById("sec_timer_animation").innerHTML = "";
        document.getElementById("sec_timer_animation").innerHTML = `
        <div class="base-timer">
          <svg class="base-timer__svg" viewBox="0 0 100 100" >
            <g class="base-timer__circle">
              <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                class="base-timer__path-remaining ${this.remainingPathColor}"
                d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
              ></path>
            </g>
          </svg>
          <span id="base-timer-label" class="base-timer__label">${this.formatTime(
            this.timeLeft
        )}</span>
        </div>
        `;
    };

    onTimesUp() {
        clearInterval(this.timerInterval);
        let obj = document.getElementById("base-timer-path-remaining");
        obj.classList.remove("base-timer__path-remaining");
    };



    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timePassed = this.timePassed += 1;
                this.timeLeft = this.TIME_LIMIT - this.timePassed;
                document.getElementById("base-timer-label").innerHTML = this.formatTime(
                    this.timeLeft
                );
                this.setCircleDasharray();
            }
            if (this.timeLeft === 0) {
                this.onTimesUp();
            }
        }, 1000);
    };

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${seconds}`;
    };

    setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = this.COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    };

    setCircleDasharray() {
        const circleDasharray = `${(
            this.calculateTimeFraction() * this.FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    };

    calculateTimeFraction() {
        const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
        return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    };

    /**
    * Show the Timer screen.
    * @public 
    * @returns {null} 
    */
    ShowTimerAnimation() {
        document.getElementById("sec_more_visible_time").style.display = 'block';
        let timerSecobj = document.getElementById("sec_timer_animation");
        timerSecobj.style.display = "block";
        this.CreateTheTimer();
        this.startTimer();
    };

    /**
    * Hide the Timer screen.
    * @returns {null} 
    */
    HideTimerAnimation() {
        document.getElementById("sec_more_visible_time").style.display = 'none';
        let timerSecobj = document.getElementById("sec_timer_animation");
        timerSecobj.style.display = "none";

    };

};
//#endregion 
let timer = new Timer();
export { timer as Timer };