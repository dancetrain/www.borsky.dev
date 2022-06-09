import React from 'react';
import { AttemptResult, GameStatus } from "../../../../lib/MasterMind.lib";

export type MastermindSettingsProps = {
  colors: string[];
  holes: number;
  guesses: number;
}


export type MastermindContextProps = {
  settings: MastermindSettingsProps;
  client?: MastermindClient;
}

export type MastermindClient = {
  // startGame: (settings: MastermindSettingsProps) => void;
  getBoard: () => string[][];
  getStatus: () => GameStatus;
  checkGuess: (guess: string[]) => Promise<GameStatus>;
  getAttempts: () => AttemptResult[];
}

export const MastermindContextDefaults: MastermindContextProps = {
  settings: {
    colors: ['red', 'green', 'blue', 'yellow', 'orange', 'purple'],
    holes: 4,
    guesses: 5
  }
}

const MastermindContext = React.createContext<MastermindContextProps>(MastermindContextDefaults)

export default MastermindContext;

