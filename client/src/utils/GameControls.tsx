// src/components/GameControls.tsx
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

interface GameControlsProps {
  onToggleModal: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const GameControls = ({ onToggleModal, isModalOpen }: GameControlsProps) => {
  const { movePiece, rotatePiece, dropPiece, holdCurrentPiece } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggleModal(!isModalOpen);
        return;
      }

      // Only process other controls if modal is closed
      if (!isModalOpen) {
        switch (event.key) {
          case "ArrowLeft":
            movePiece({ x: -1, y: 0 });
            break;
          case "ArrowRight":
            movePiece({ x: 1, y: 0 });
            break;
          case "ArrowDown":
            movePiece({ x: 0, y: 1 });
            break;
          case "ArrowUp":
            rotatePiece();
            break;
          case " ":
            dropPiece();
            break;
          case "Shift":
            holdCurrentPiece();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, rotatePiece, dropPiece, holdCurrentPiece, onToggleModal, isModalOpen]);

  return null;
};

export default GameControls;
