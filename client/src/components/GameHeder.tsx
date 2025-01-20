import "../styles/gameHeader.css";

import { useGameStore } from "../store/gameStore";
import { styled } from "styled-components";

const GameHeder = () => {
  const score = useGameStore((state) => state.score);
  const totalLinesCleared = useGameStore((state) => state.totalLinesCleared);
  const timeRemaining = useGameStore((state) => state.timeRemaining);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <GameHederContainer seconds={timeRemaining}>
      <h1 className="score-title">
        Score:<span className="score-value">{score}</span>
      </h1>
      <h1 className="stats-title">
        Lines:
        <span className="stats-value">{totalLinesCleared}</span>
      </h1>

      <h1 className="timer-title">
        Time:
        <span className="timer-value">{formatTime(timeRemaining)}</span>
      </h1>
    </GameHederContainer>
  );
};

const GameHederContainer = styled.div<{ seconds: number }>`
  background: linear-gradient(to bottom, #363636, #252525);
  color: white;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  position: relative;

  h1 {
    display: flex;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #808080;
  }

  span {
    font-weight: bold;
    color: white;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    display: block;
    transition: width 150ms ease;
    height: 4px;
    width: ${(props) => Math.min((props.seconds / 90) * 100, 100)}%;
    background-color: #24813dac;
  }
`;

export default GameHeder;
