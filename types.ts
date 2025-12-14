export enum SlideState {
  TITLE = 1,
  INSTRUCTION = 2,
  GAME = 3,
  SUCCESS = 4,
  FAIL = 5,
}

export interface StarData {
  id: number;
  word: string;
  x: number; // Percent position X
  y: number; // Percent position Y
}

export interface LevelTheme {
  primary: string; // Main color (e.g., text, active star)
  secondary: string; // Accent color (e.g., glow)
  line: string; // Connecting line color
  starActive: string; // Color class for active star
  starCompleted: string; // Color class for completed star
  rocketTrail: string; // Color of rocket trail
}

export interface LevelConfig {
  id: number;
  name: string;
  stars: StarData[];
  theme: LevelTheme;
}

export interface GameConfig {
  rocketDurationSeconds: number;
  levels: LevelConfig[];
}