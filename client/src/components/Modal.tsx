import { useGameStore } from "../store/gameStore";
import "../styles/modal.css";
import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const stopGravity = useGameStore((state) => state.stopGravity);
  const startGravity = useGameStore((state) => state.startGravity);
  const init = useGameStore((state) => state.init);
  const startTimer = useGameStore((state) => state.startTimer);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const gameOverReason = useGameStore((state) => state.gameOverReason);
  const score = useGameStore((state) => state.score);
  const totalLinesCleared = useGameStore((state) => state.totalLinesCleared);

  useEffect(() => {
    if (isOpen && !isGameOver) {
      stopGravity();
      stopTimer();
    } else if (!isOpen && !isGameOver) {
      startGravity();
      startTimer();
    }
  }, [isOpen, stopGravity, startGravity, startTimer, stopTimer, isGameOver]);

  if (!isOpen && !isGameOver) return null;

  const handleRestart = () => {
    init();
    startTimer();
    startGravity();
    onClose();
  };

  const handleResume = () => {
    if (!isGameOver) {
      onClose();
    }
  };

  const getGameOverMessage = () => {
    switch (gameOverReason) {
      case 'blockout':
        return "Game Over - No space for new piece!";
      case 'lockout':
        return "Game Over - Pieces stacked too high!";
      case 'timeout':
        return "Time's Up!";
      default:
        return "Game Over!";
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isGameOver ? (
          <>
            <h2>{getGameOverMessage()}</h2>
            <div className="modal-stats">
              <p>Final Score: {score}</p>
              <p>Lines Cleared: {totalLinesCleared}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={handleRestart}>Play Again</button>
            </div>
          </>
        ) : (
          <>
            <h2>Game Menu</h2>
            <div className="modal-buttons">
              <button onClick={handleResume}>Resume</button>
              <button onClick={handleRestart}>Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
