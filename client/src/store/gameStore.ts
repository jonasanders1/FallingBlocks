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
  pieceQueue: TetrominoType[];
  holdPiece: TetrominoType | null;
  canHold: boolean;
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
  generateNewPiece: () => void;
  refillQueue: () => void;
  init: () => void;
  holdCurrentPiece: () => void;
  gravitySpeed: number;
  isPlaying: boolean;
  gravityTimer: NodeJS.Timeout | null;
  startGravity: () => void;
  stopGravity: () => void;
  clearLines: () => void;
  score: number;
  level: number;
  linesCleared: number;
  totalLinesCleared: number;
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
  pieceQueue: [],
  holdPiece: null,
  canHold: true,
  gravitySpeed: 800, // Slightly faster for smoother feel
  isPlaying: false,
  gravityTimer: null,
  score: 0,
  level: 1,
  linesCleared: 0,
  totalLinesCleared: 0,

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

      // Generate next piece from queue
      state.generateNewPiece();

      // First update the board
      set({ board: newBoard, canHold: true });

      // Then check and clear lines
      get().clearLines();

      return {};
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

  generateNewPiece: () =>
    set((state) => {
      // Get next piece from queue
      const [nextPiece, ...remainingPieces] = state.pieceQueue;

      // Add a new random piece to maintain 4 pieces
      const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
      const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
      const newQueue = [...remainingPieces, randomPiece];

      return {
        currentPiece: {
          type: nextPiece,
          position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
          rotation: 0,
        },
        pieceQueue: newQueue,
      };
    }),

  refillQueue: () =>
    set(() => {
      const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
      // Create initial queue of 4 random pieces
      const initialQueue = Array.from({ length: 4 }, () => {
        const randomIndex = Math.floor(Math.random() * pieces.length);
        return pieces[randomIndex];
      });

      return {
        pieceQueue: initialQueue,
      };
    }),

  init: () => {
    set({
      board: Array.from({ length: BOARD_HEIGHT }, () =>
        Array(BOARD_WIDTH).fill(null)
      ),
      currentPiece: {
        type: "T",
        position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
        rotation: 0,
      },
      score: 0,
      level: 1,
      linesCleared: 0,
      totalLinesCleared: 0,
      gravitySpeed: 800,
      holdPiece: null,
      canHold: true,
    });
    get().refillQueue();
    get().generateNewPiece();
  },

  holdCurrentPiece: () =>
    set((state) => {
      // If we can't hold, return current state
      if (!state.canHold) return state;

      const currentType = state.currentPiece.type;
      let nextPiece;

      // If there's no held piece, get next piece from queue
      if (state.holdPiece === null) {
        const [next, ...remaining] = state.pieceQueue;
        nextPiece = next;

        // Generate new piece for queue
        const pieces: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

        return {
          holdPiece: currentType,
          canHold: false,
          currentPiece: {
            type: nextPiece,
            position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
            rotation: 0,
          },
          pieceQueue: [...remaining, randomPiece],
        };
      }

      // If there is a held piece, swap with current piece
      return {
        holdPiece: currentType,
        canHold: false,
        currentPiece: {
          type: state.holdPiece,
          position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
          rotation: 0,
        },
      };
    }),

  startGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    const timer = setInterval(() => {
      const state = get();
      if (!state.isPlaying) return;

      const newPosition = {
        x: state.currentPiece.position.x,
        y: state.currentPiece.position.y + 1,
      };

      if (state.isValidMove(newPosition)) {
        set((state) => ({
          currentPiece: {
            ...state.currentPiece,
            position: newPosition,
          },
        }));
      } else {
        state.lockPiece();
      }
    }, get().gravitySpeed);

    set({ isPlaying: true, gravityTimer: timer });
  },

  stopGravity: () => {
    const currentTimer = get().gravityTimer;
    if (currentTimer) {
      clearInterval(currentTimer);
    }
    set({ isPlaying: false, gravityTimer: null });
  },

  clearLines: () => {
    const { board } = get();
    const newBoard = [...board.map((row) => [...row])];
    let linesCleared = 0;

    // Check each row from bottom to top
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((cell) => cell !== null)) {
        newBoard.splice(row, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        linesCleared++;
        row++;
      }
    }

    if (linesCleared > 0) {
      const scoreIncrease = calculateScore(linesCleared);
      const currentTotalLines = get().totalLinesCleared + linesCleared;
      const newLevel = Math.floor(currentTotalLines / 10) + 1;
      
      set((state) => ({
        board: newBoard,
        score: state.score + scoreIncrease,
        linesCleared: linesCleared,
        totalLinesCleared: currentTotalLines,
        level: newLevel,
        // Increase speed with level
        gravitySpeed: Math.max(100, 800 - (newLevel - 1) * 50),
      }));
    }
  },
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

// Helper function to calculate score based on lines cleared
const calculateScore = (lines: number): number => {
  const basePoints = 100;
  const multipliers = [1, 2.5, 7.5, 15]; // Multipliers for 1, 2, 3, or 4 lines
  return Math.floor(basePoints * (multipliers[lines - 1] || 0));
};
