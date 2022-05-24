import React from 'react';

type MastermindSettingsProps = {
  colors: string[];
  holes: number;
  guesses: number;
}
type MastermindContextProps = {
  board?: string[][];
  settings: MastermindSettingsProps
}


const MastermindContext = React.createContext<MastermindContextProps>({
  settings: {
    colors: ['red', 'green', 'blue', 'yellow', 'orange', 'purple'],
    holes: 4,
    guesses: 5
  }
})

export default MastermindContext;

