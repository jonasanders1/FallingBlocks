import "../styles/stats.css";
import { useGameStore } from "../store/gameStore";

const Stats = () => {
  const totalLinesCleared = useGameStore((state) => state.totalLinesCleared);
  const level = useGameStore((state) => state.level);
  return (
    <div className="stats-container">
      <div className="stats-box">
        <h2 className="stats-title">Lines</h2>
        <span className="stats-value">{totalLinesCleared}</span>
      </div>
      <div className="stats-box">
        <h2 className="stats-title">Level</h2>
        <span className="stats-value">{level}</span>
      </div>
    </div>
  )
}

export default Stats
      