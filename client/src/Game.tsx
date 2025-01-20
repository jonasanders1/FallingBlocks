import GameBoard from "./components/GameBoard";
import styled from "styled-components";
import GameControls from "./utils/GameControls";

import { useGameStore } from "./store/gameStore";
import TetrominoDisplay from "./components/TetrominoDisplay";

import { useEffect } from "react";
import GameHeder from "./components/GameHeder";

interface GameProps {
  onToggleModal: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const Game = ({ onToggleModal, isModalOpen }: GameProps) => {
  // Initialize the game
  const init = useGameStore((state) => state.init);
  const startGravity = useGameStore((state) => state.startGravity);
  const stopGravity = useGameStore((state) => state.stopGravity);
  const startTimer = useGameStore((state) => state.startTimer);

  // Get the piece queue and hold piece
  const pieceQueue = useGameStore((state) => state.pieceQueue);
  const holdPiece = useGameStore((state) => state.holdPiece);

  // Initialize the game
  useEffect(() => {
    init();
    // Small delay before starting gravity for smoother initial experience
    const gravityTimeout = setTimeout(() => {
      startGravity();
      startTimer();
    }, 500);

    return () => {
      clearTimeout(gravityTimeout);
      stopGravity();
    };
  }, [init, startGravity, stopGravity, startTimer]);

  return (
    <GameContainer>
      <GameHeder />
      <GameBody>
        <StatsContainer>
          <TetrominoDisplay
            pieces={holdPiece ? [holdPiece] : []}
            variant="hold"
          />
        </StatsContainer>
        <GameBoard />
        <TetrominoDisplay pieces={pieceQueue} variant="next" />
        <GameControls onToggleModal={onToggleModal} isModalOpen={isModalOpen} />
      </GameBody>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameBody = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Game;
