import { useCallback } from "react";
import { TETROMINOES } from "../types/tetrominios";
import { rotateMatrix, useGameStore } from "../store/gameStore";
import "../styles/GameBoard.css";

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

const GameBoard = () => {
  const { currentPiece, board } = useGameStore();

  const renderCell = useCallback(
    (row: number, col: number) => {
      // Check if there's a locked piece in this cell
      const lockedPiece = board[row][col];
      if (lockedPiece) {
        return (
          <div
            key={`cell-${row}-${col}`}
            className="grid-cell"
            style={{
              backgroundColor: lockedPiece,
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          />
        );
      }

      // Rest of the existing rendering logic for the current piece
      const piece = TETROMINOES[currentPiece.type];
      const rotatedShape = rotateMatrix(piece.shape, currentPiece.rotation);
      const pieceStyle = {
        backgroundColor: piece.color,
        border: "3px solid rgba(255,255,255,0.2)",
      };
  
      const inPiece = rotatedShape.some((shapeRow, pieceY) =>
        shapeRow.some((cell, pieceX) => {
          const boardX = currentPiece.position.x + pieceX;
          const boardY = currentPiece.position.y + pieceY;
          return cell === 1 && boardX === col && boardY === row;
        })
      );
  
      return (
        <div
          key={`cell-${row}-${col}`}
          className={`grid-cell ${(row + col) % 2 === 0 ? "dark-cell" : "light-cell"}`}
          style={inPiece ? pieceStyle : undefined}
        />
      );
    },
    [currentPiece, board]
  );

  return (
    <div className="game-board">
      <div className="game-grid">
        {Array.from({ length: BOARD_HEIGHT }, (_, row) => (
          <div key={`row-${row}`} className="grid-row">
            {Array.from({ length: BOARD_WIDTH }, (_, col) =>
              renderCell(row, col)
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
