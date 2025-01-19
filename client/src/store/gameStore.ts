import { create } from "zustand";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants/board";
import { TetrominoType, TETROMINOES } from "../types/tetrominios";

interface GameState {
  board: (string | null)[][];
  currentPiece: {
    type: TetrominoType;
    position: { x: number; y: number };
    rotation: number;
  };
  setCurrentPiece: (piece: TetrominoType) => void;

  // Actions
  movePiece: (direction: { x: number; y: number }) => void;
  rotatePiece: () => void;
  isValidMove: (
    position: { x: number; y: number },
    rotation?: number
  ) => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  ),
  currentPiece: {
    type: "T",
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0,
  },

  setCurrentPiece: (type) =>
    set(() => ({
      currentPiece: {
        type,
        position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
        rotation: 0,
      },
    })),

  isValidMove: (position, rotation = get().currentPiece.rotation) => {
    const piece = TETROMINOES[get().currentPiece.type];
    const rotatedShape = rotateMatrix(piece.shape, rotation);

    // Try original position first
    if (isValidPosition(rotatedShape, position)) {
      return true;
    }

    // If rotating, try wall kicks
    if (rotation !== get().currentPiece.rotation) {
      // Try moving left/right by 1 or 2 spaces
      for (const xOffset of [-1, 1, -2, 2]) {
        const newPosition = { x: position.x + xOffset, y: position.y };
        if (isValidPosition(rotatedShape, newPosition)) {
          // Update the position reference to allow the move
          position.x = newPosition.x;
          return true;
        }
      }

      // Try moving up by 1 or 2 spaces
      for (const yOffset of [-1, -2]) {
        const newPosition = { x: position.x, y: position.y + yOffset };
        if (isValidPosition(rotatedShape, newPosition)) {
          // Update the position reference to allow the move
          position.y = newPosition.y;
          return true;
        }
      }
    }

    return false;

    // Helper function to check if a position is valid
    function isValidPosition(shape: number[][], pos: { x: number; y: number }) {
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const newX = pos.x + x;
            const newY = pos.y + y;

            if (
              newX < 0 ||
              newX >= BOARD_WIDTH ||
              newY < 0 ||
              newY >= BOARD_HEIGHT ||
              get().board[newY][newX] !== null
            ) {
              return false;
            }
          }
        }
      }
      return true;
    }
  },

  movePiece: (direction) =>
    set((state) => {
      const newPosition = {
        x: state.currentPiece.position.x + direction.x,
        y: state.currentPiece.position.y + direction.y,
      };

      if (state.isValidMove(newPosition)) {
        return {
          currentPiece: {
            ...state.currentPiece,
            position: newPosition,
          },
        };
      }
      return state;
    }),

  rotatePiece: () =>
    set((state) => {
      const newRotation = (state.currentPiece.rotation + 1) % 4;

      if (state.isValidMove(state.currentPiece.position, newRotation)) {
        return {
          currentPiece: {
            ...state.currentPiece,
            rotation: newRotation,
          },
        };
      }
      return state;
    }),
}));

// Helper function to rotate matrix
export function rotateMatrix(matrix: number[][], rotation: number): number[][] {
  let rotated = [...matrix];
  for (let i = 0; i < rotation; i++) {
    rotated = rotated[0].map((_, index) =>
      rotated.map((row) => row[index]).reverse()
    );
  }
  return rotated;
}
