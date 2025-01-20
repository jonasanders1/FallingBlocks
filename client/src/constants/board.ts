export const VISIBLE_BOARD_HEIGHT = 20;
export const HIDDEN_ROWS = 2;
export const TOTAL_BOARD_HEIGHT = VISIBLE_BOARD_HEIGHT + HIDDEN_ROWS;
export const BOARD_WIDTH = 10;

export const SPAWN_POSITION = {
  x: Math.floor(BOARD_WIDTH / 2) - 1,
  y: 2,
} as const;
