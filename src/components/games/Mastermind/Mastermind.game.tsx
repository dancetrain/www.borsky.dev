import React, { useState } from "react";
import MastermindGameBoard from "./Mastermind.board";
import MastermindContext, {
  MastermindClient,
  MastermindContextDefaults,
  MastermindContextProps
} from "./Mastermind.context";
import { button } from './Mastermind.module.css'

import MasterMindLib, { GameStatus, MasterMindBoard } from '../../../../lib/MasterMind.lib';

const MastermindGame: React.FC = () => {
  // handle custom states

  //MastermindContextDefaults.settings.colors.length
  const [colors, setColorsSize] = useState(4);

  const [mastermind, setMastermind] = useState<MastermindContextProps>({
    ...MastermindContextDefaults,
    settings: {
      ...MastermindContextDefaults.settings,
      colors: MastermindContextDefaults.settings.colors.slice(0, colors)
    }
  })

  const createLocalClient: (board: MasterMindBoard) => MastermindClient = (board: MasterMindBoard) => {
    return {
      getBoard: () => board.getBoard(),
      checkGuess: (guess: string[]) => {
        return Promise.resolve().then(() => {
          return board.checkSolution(guess)
        });
      },
      getAttempts: () => board.getAttempts(),
    }
  }

  // register/search/join
  return <MastermindContext.Provider value={mastermind}>
    {!mastermind.client ?
        <p>
          <button onClick={() => {
            const board = MasterMindLib.createBoard({
              guesses: mastermind.settings.guesses,
              size: mastermind.settings.holes,
              colors: mastermind.settings.colors
            })
            setMastermind({
              ...mastermind,
              client: createLocalClient(board)
            })

          }} className={button}>Create Game
          </button>
        </p> : null
    }

    {mastermind.client ? <MastermindGameBoard/> : null}
  </MastermindContext.Provider>;
};


export default MastermindGame;
