// import { useEffect } from "react";
import "./App.css";
import Game from "./Game";
import styled from "styled-components";
// import { socket } from "./socket";

function App() {
  return (
    <GameContainer>
      <Game />
    </GameContainer>
  );
}

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
`;

export default App;
