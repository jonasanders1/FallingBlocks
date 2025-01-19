import { useGameStore } from '../store/gameStore';
import '../styles/score.css'


const Score = () => {
  const score = useGameStore((state) => state.score);
  const level = useGameStore((state) => state.level);
  const linesCleared = useGameStore((state) => state.linesCleared);
  const totalLinesCleared = useGameStore((state) => state.totalLinesCleared);

  return (
    <div className="score-container">
      <div className="score-box">
        <h2 className="score-title">Score</h2>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-box">
        <h2 className="score-title">Level</h2>
        <span className="score-value">{level}</span>
      </div>
      <div className="score-box">
        <h2 className="score-title">Lines</h2>
        <span className="score-value">{totalLinesCleared}</span>
      </div>
      <div className="score-box">
        <h2 className="score-title">Last Clear</h2>
        <span className="score-value">{linesCleared}</span>
      </div>
    </div>
  );
};

export default Score;
