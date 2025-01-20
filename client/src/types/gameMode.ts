export type GameMode = 'singleplayer' | 'multiplayer';

interface BaseGameConfig {
  mode: GameMode;
  initialLevel: number;
  gravitySpeed: number;
}

interface SinglePlayerConfig extends BaseGameConfig {
  mode: 'singleplayer';
  timeLimit: number;
  speedIncreasePerLevel: number;
}

interface MultiPlayerConfig extends BaseGameConfig {
  mode: 'multiplayer';
  roomId: string;
  opponentId?: string;
}

export type GameConfig = SinglePlayerConfig | MultiPlayerConfig; 