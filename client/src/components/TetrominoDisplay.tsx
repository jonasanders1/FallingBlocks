import { TetrominoType } from "../types/tetrominios";

// Types
import I from "../assets/I.png";
import O from "../assets/O.png";
import T from "../assets/T.png";
import S from "../assets/S.png";
import Z from "../assets/Z.png";
import J from "../assets/J.png";
import L from "../assets/L.png";
// Styles
import "../styles/tetrominoDisplay.css";

interface TetrominoDisplayProps {
  pieces: TetrominoType[];
  variant?: "hold" | "next";
  
}

const TetrominoDisplay = ({
  pieces,
  variant = "next",
}: TetrominoDisplayProps) => {
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
        return null;
    }
  };

  return (
    <div className={`tetromino-display ${variant}`}>
      <div className="tetromino-display-container">
        {pieces.length === 0 && (
          <div className="tetromino-cell">
            <div
              className={`tetromino-cell-inner ${
                pieces.length === 0 ? "empty" : ""
              }`}
            >
              <span>Empty</span>
            </div>
          </div>
        )}
        {pieces.map((piece, index) => (
          <div key={index} className="tetromino-cell">
            <div className="tetromino-cell-inner">{getPieceImage(piece)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TetrominoDisplay;
