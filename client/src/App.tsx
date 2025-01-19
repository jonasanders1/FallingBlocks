// import { useEffect } from "react";
import "./App.css";
import GameBoard from "./Game";
import GameHeader from "./components/GameHeder";
// import { socket } from "./socket";

function App() {
  return (
    <div>
      <GameHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <GameBoard />
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
