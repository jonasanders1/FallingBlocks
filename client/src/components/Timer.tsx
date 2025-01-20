import "../styles/timer.css";

const Timer = () => {
  return (
    <div className="timer">
      <h1 className="timer-title">
        Time: <span className="timer-value">00:39</span>
      </h1>

      <div className="timer-bar"></div>
    </div>
  );
};

export default Timer;
