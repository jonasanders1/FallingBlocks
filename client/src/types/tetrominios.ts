export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Tetromino {
  shape: number[][];
  color: string;
  secondaryColor: string;
}

export const TETROMINO_COLORS = {
  I: {
    primary: "#00f0f0",
    secondary: "#00d0d0"
  },
  O: {
    primary: "#f0f000", 
    secondary: "#d0d000"
  },
  T: {
    primary: "#a000f0",
    secondary: "#8000d0"
  },
  S: {
    primary: "#00f000",
    secondary: "#00d000"
  },
  Z: {
    primary: "#f00000",
    secondary: "#d00000"
  },
  J: {
    primary: "#0000f0",
    secondary: "#0000d0"
  },
  L: {
    primary: "#f0a000",
    secondary: "#d08000"
  }
};

export const TETROMINOES: { [key in TetrominoType]: Tetromino } = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: TETROMINO_COLORS.I.primary,
    secondaryColor: TETROMINO_COLORS.I.secondary
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: TETROMINO_COLORS.O.primary,
    secondaryColor: TETROMINO_COLORS.O.secondary
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.T.primary,
    secondaryColor: TETROMINO_COLORS.T.secondary
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.S.primary,
    secondaryColor: TETROMINO_COLORS.S.secondary
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.Z.primary,
    secondaryColor: TETROMINO_COLORS.Z.secondary
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.J.primary,
    secondaryColor: TETROMINO_COLORS.J.secondary
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.L.primary,
    secondaryColor: TETROMINO_COLORS.L.secondary
  },
};
