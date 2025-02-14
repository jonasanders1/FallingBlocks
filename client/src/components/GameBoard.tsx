import { useCallback } from "react";
import { TETROMINOES } from "../types/tetrominios";
import { rotateMatrix, useGameStore } from "../store/gameStore";
import { VISIBLE_BOARD_HEIGHT, HIDDEN_ROWS, BOARD_WIDTH } from "../constants/board";
import "../styles/GameBoard.css";

const GameBoard = () => {
  const { currentPiece, board, findDropPosition } = useGameStore();

  const renderCell = useCallback(
    (row: number, col: number) => {
      // Adjust row index to account for hidden rows
      const actualRow = row + HIDDEN_ROWS;
      
      // Check if there's a locked piece in this cell
      const lockedPiece = board[actualRow][col];
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

      const piece = TETROMINOES[currentPiece.type];
      const rotatedShape = rotateMatrix(piece.shape, currentPiece.rotation);

      // Calculate shadow position
      const dropPosition = findDropPosition();

      // Check if cell is part of the shadow
      const inShadow = rotatedShape.some((shapeRow, pieceY) =>
        shapeRow.some((cell, pieceX) => {
          const boardX = dropPosition.x + pieceX;
          const boardY = dropPosition.y + pieceY;
          return cell === 1 && boardX === col && boardY === actualRow;
        })
      );

      // Check if cell is part of the current piece
      const inPiece = rotatedShape.some((shapeRow, pieceY) =>
        shapeRow.some((cell, pieceX) => {
          const boardX = currentPiece.position.x + pieceX;
          const boardY = currentPiece.position.y + pieceY;
          return cell === 1 && boardX === col && boardY === actualRow;
        })
      );

      const cellClass = (row + col) % 2 === 0 ? "dark-cell" : "light-cell";

      const style = inPiece
        ? {
            backgroundColor: piece.color,
            border: "4px solid rgba(255,255,255,0.2)",
          }
        : inShadow
        ? {
            backgroundColor: cellClass === "dark-cell" ? "#2c2c2c" : "#2e2e30",
            border: `2px dashed rgba(255,255,255,0.2)`,
          }
        : undefined;

      return (
        <div
          key={`cell-${row}-${col}`}
          className={`grid-cell ${cellClass}`}
          style={style}
        />
      );
    },
    [currentPiece, board, findDropPosition]
  );

  return (
    <div className="game-board">
      <div className="game-grid">
        {Array.from({ length: VISIBLE_BOARD_HEIGHT }, (_, row) => (
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
