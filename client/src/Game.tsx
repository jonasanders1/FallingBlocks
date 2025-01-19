import GameBoard from "./components/GameBoard";
import NextPiece from "./components/NextPiece";
import OnHold from "./components/OnHold";
import styled from "styled-components";
import GameControls from "./utils/GameControls";
import { useGameStore } from "./store/gameStore";
import { useEffect } from "react";

const Game = () => {
  const init = useGameStore((state) => state.init);
  
  useEffect(() => {
    init();
  }, [init]);

  return (
    <GameContainer>
      <OnHold />
      <GameBoard />
      <NextPiece />
      <GameControls />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;

export default Game;
