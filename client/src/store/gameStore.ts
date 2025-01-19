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
  dropPiece: () => void;
  lockPiece: () => void;
  isValidMove: (
    position: { x: number; y: number },
    rotation?: number
  ) => boolean;
  shouldLockPiece: () => boolean;
  findDropPosition: () => { x: number; y: number };
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

  shouldLockPiece: () => {
    const { currentPiece } = get();
    const nextPosition = {
      x: currentPiece.position.x,
      y: currentPiece.position.y + 1,
    };
    return !get().isValidMove(nextPosition);
  },

  findDropPosition: () => {
    const { currentPiece } = get();
    let dropY = currentPiece.position.y;

    // Keep moving down until we hit something
    while (get().isValidMove({ x: currentPiece.position.x, y: dropY + 1 })) {
      dropY++;
    }

    return { x: currentPiece.position.x, y: dropY };
  },

  dropPiece: () => {
    const dropPosition = get().findDropPosition();
    set((state) => ({
      currentPiece: {
        ...state.currentPiece,
        position: dropPosition,
      },
    }));
    get().lockPiece();
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

      // If moving down and hit something, lock the piece
      if (direction.y > 0 && !state.isValidMove(newPosition)) {
        state.lockPiece();
      }

      return state;
    }),

  lockPiece: () =>
    set((state) => {
      const { currentPiece, board } = state;
      const piece = TETROMINOES[currentPiece.type];
      const rotatedShape = rotateMatrix(piece.shape, currentPiece.rotation);
      const newBoard = [...board.map((row) => [...row])];

      // Add the piece to the board
      rotatedShape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              newBoard[boardY][boardX] = piece.color;
            }
          }
        });
      });

      // Generate a new piece
      return {
        board: newBoard,
        currentPiece: {
          type: ["I", "O", "T", "S", "Z", "J", "L"][
            Math.floor(Math.random() * 7)
          ] as TetrominoType,
          position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
          rotation: 0,
        },
      };
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
