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

  useEffect(() => {
    if (isOpen) {
      stopGravity();
    } else {
      startGravity();
    }
  }, [isOpen, stopGravity, startGravity]);

  if (!isOpen) return null;

  const handleRestart = () => {
    init();
    startGravity();
    onClose();
  };

  const handleResume = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Menu</h2>
        <div className="modal-buttons">
          <button onClick={handleResume}>Resume</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
