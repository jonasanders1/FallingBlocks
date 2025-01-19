import GameBoard from "./components/GameBoard";

import styled from "styled-components";
import GameControls from "./utils/GameControls";

import { useGameStore } from "./store/gameStore";
import TetrominoDisplay from "./components/TetrominoDisplay";
import Stats from "./components/Stats";

import { useEffect } from "react";

interface GameProps {
  onToggleModal: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const Game = ({ onToggleModal, isModalOpen }: GameProps) => {
  // Initialize the game
  const init = useGameStore((state) => state.init);
  const startGravity = useGameStore((state) => state.startGravity);
  const stopGravity = useGameStore((state) => state.stopGravity);

  // Get the piece queue and hold piece
  const pieceQueue = useGameStore((state) => state.pieceQueue);
  const holdPiece = useGameStore((state) => state.holdPiece);

  // Initialize the game
  useEffect(() => {
    init();
    // Small delay before starting gravity for smoother initial experience
    const gravityTimeout = setTimeout(() => {
      startGravity();
    }, 500);

    return () => {
      clearTimeout(gravityTimeout);
      stopGravity();
    };
  }, [init, startGravity, stopGravity]);

  return (
    <div>
      <GameContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TetrominoDisplay
            title="Hold"
            pieces={holdPiece ? [holdPiece] : []}
            variant="hold"
          />
          <Stats />
        </div>
        <GameBoard />
        <TetrominoDisplay title="Next" pieces={pieceQueue} variant="next" />
        <GameControls onToggleModal={onToggleModal} isModalOpen={isModalOpen} />
      </GameContainer>
    </div>
  );
};

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;

export default Game;
