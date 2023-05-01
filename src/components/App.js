import "./styles.css";
import { useEffect, useState } from "react";

let interval = null;
export default function App() {
  let defaultTimer = { hours: 0, minutes: 0, seconds: 0 };
  const [timer, setTimer] = useState(defaultTimer);
  const [start, setStart] = useState(false);

  const startTimer = () => {
    setStart(true);
    interval = setInterval(() => {
      setTimer((prev) => {
        let temp = { ...prev };
        if (temp.seconds == 0) {
          if (temp.minutes == 0) {
            if (temp.hours == 0) {
              clearInterval(interval);
            } else {
              temp.hours -= 1;
              temp.minutes = 59;
              temp.seconds = 59;
            }
          } else {
            temp.minutes -= 1;
            temp.seconds = 59;
          }
        } else {
          temp.seconds -= 1;
        }
        return temp;
      });
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setTimer({ ...timer, [field]: value });
  };

  const handleReset = () => {
    clearInterval(interval);
    setTimer(defaultTimer);
    setStart(false);
  };

  return (
    <div className="App">
      <h1>Count down timer</h1>
      <div className="Time">
        <div>Hours</div>
        <div>Minutes</div>
        <div>Seconds</div>
        {start ? (
          <>
            <div>{timer.hours.toString().padStart(2, "0")}</div>
            <div>{timer.minutes.toString().padStart(2, "0")}</div>
            <div>{timer.seconds.toString().padStart(2, "0")}</div>
          </>
        ) : (
          <>
            <input
              value={timer.hours}
              onChange={(evt) => handleInputChange("hours", evt.target.value)}
              type="text"
            ></input>
            <input
              value={timer.minutes}
              onChange={(evt) => handleInputChange("minutes", evt.target.value)}
              type="text"
            ></input>
            <input
              value={timer.seconds}
              onChange={(evt) => handleInputChange("seconds", evt.target.value)}
              type="text"
            ></input>
          </>
        )}
      </div>
      <button
        onClick={() => startTimer()}
        style={{ backgroundColor: "green", color: "white" }}
      >
        Start
      </button>
      <button
        style={{ marginLeft: "1rem", backgroundColor: "yellow" }}
        onClick={() => handleReset()}
      >
        Reset
      </button>
    </div>
  );
}
