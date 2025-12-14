import { LevelConfig } from './types';

export const ROCKET_DURATION = 50; // Seconds

export const GAME_LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "Синий Гигант",
    theme: {
      primary: "text-cyan-400",
      secondary: "shadow-cyan-400/50",
      line: "#22d3ee", // cyan-400
      starActive: "bg-cyan-500",
      starCompleted: "bg-blue-300",
      rocketTrail: "bg-cyan-500"
    },
    stars: [
      { id: 1, word: "МАРС", x: 20, y: 70 },
      { id: 2, word: "ЛУНА", x: 35, y: 40 },
      { id: 3, word: "ПУТЬ", x: 50, y: 60 },
      { id: 4, word: "СВЕТ", x: 65, y: 30 },
      { id: 5, word: "ГЕРОЙ", x: 80, y: 50 },
    ]
  },
  {
    id: 2,
    name: "Пурпурная Туманность",
    theme: {
      primary: "text-purple-400",
      secondary: "shadow-purple-400/50",
      line: "#c084fc", // purple-400
      starActive: "bg-purple-500",
      starCompleted: "bg-fuchsia-300",
      rocketTrail: "bg-purple-500"
    },
    stars: [
      { id: 1, word: "АТОМ", x: 15, y: 30 },
      { id: 2, word: "КОМЕТА", x: 30, y: 60 },
      { id: 3, word: "ЗВЕЗДА", x: 50, y: 20 },
      { id: 4, word: "ОРБИТА", x: 70, y: 65 },
      { id: 5, word: "НЕБО", x: 85, y: 35 },
    ]
  },
  {
    id: 3,
    name: "Огненное Кольцо",
    theme: {
      primary: "text-orange-400",
      secondary: "shadow-orange-400/50",
      line: "#fb923c", // orange-400
      starActive: "bg-orange-500",
      starCompleted: "bg-yellow-300",
      rocketTrail: "bg-orange-500"
    },
    stars: [
      { id: 1, word: "СТАРТ", x: 10, y: 50 },
      { id: 2, word: "ПОЛЁТ", x: 30, y: 20 },
      { id: 3, word: "РОБОТ", x: 50, y: 80 },
      { id: 4, word: "ЛАЗЕР", x: 70, y: 20 },
      { id: 5, word: "ФИНИШ", x: 90, y: 50 },
    ]
  }
];

export const playSound = (type: 'click' | 'success' | 'fail' | 'hover' | 'word') => {
  console.log(`[AUDIO] Playing sound: ${type}`);
};