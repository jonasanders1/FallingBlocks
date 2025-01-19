// import { useEffect } from "react";
import "./App.css";
import Game from "./Game";
import styled from "styled-components";
import Header from "./components/Header";
import { useState } from "react";
// import { socket } from "./socket";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <GameContainer>
        <Game onToggleModal={setIsModalOpen} isModalOpen={isModalOpen} />
      </GameContainer>
    </>
  );
}

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default App;
