import "../styles/nextPiece.css";
import { useGameStore } from "../store/gameStore";
import { TetrominoType } from "../types/tetrominios";
import I from "../assets/I.png";
import O from "../assets/O.png";
import T from "../assets/T.png";
import S from "../assets/S.png";
import Z from "../assets/Z.png";
import J from "../assets/J.png";
import L from "../assets/L.png";

const NextPiece = () => {
  const pieceQueue = useGameStore((state) => state.pieceQueue);

  const getPieceImage = (type: TetrominoType) => {
    switch (type) {
      case "I":
        return <img src={I} alt="I" />;
      case "O":
        return <img src={O} alt="O" />;
      case "T":
        return <img src={T} alt="T" />;
      case "S":
        return <img src={S} alt="S" />;
      case "Z":
        return <img src={Z} alt="Z" />;
      case "J":
        return <img src={J} alt="J" />;
      case "L":
        return <img src={L} alt="L" />;
      default:
        return "";
    }
  };

  return (
    <div className="next-piece-container">
      <h1 className="next-piece-title">Next</h1>

      <div className="next-piece-cell-container">
        {pieceQueue.map((piece, index) => (
          <div key={index} className="next-piece-cell">
            <div className="next-piece-cell-inner">
              <div className="next-piece-cell-inner-piece">
                {getPieceImage(piece)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
