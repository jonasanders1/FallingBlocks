import GameBoard from "./components/GameBoard";
import NextPiece from "./components/NextPiece";
import OnHold from "./components/OnHold";

const Game = () => {


  return (
    <div className="game">
      <OnHold />
      <GameBoard />
      <NextPiece />
    </div>
  );
};

export default Game;
