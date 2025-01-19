// src/components/GameControls.tsx
import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

const GameControls = () => {
  const { movePiece, rotatePiece, dropPiece } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, rotatePiece, dropPiece]);

  return null;
};

export default GameControls;
