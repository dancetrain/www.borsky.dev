import React, { useEffect, useState } from "react";
import { useParams } from "@reach/router"
import MastermindGameBoard from "./Mastermind.board";
import MastermindContext, {
  MastermindClient,
  MastermindContextDefaults,
  MastermindContextProps
} from "./Mastermind.context";
import { button } from './Mastermind.module.css'

import MasterMindLib, { MasterMindBoard } from '../../../../lib/MasterMind.lib';
import { generateRandomSeed } from "../../../../lib/RandomUtils.lib";
import { navigate } from "gatsby";

const MastermindGame: React.FC = () => {
  // handle custom states
  const {gameId} = useParams<{ gameId?: string }>();

  //MastermindContextDefaults.settings.colors.length
  const [colors, setColorsSize] = useState(MastermindContextDefaults.settings.colors.length);

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
      getStatus: () => board.getStatus()
    }
  }
  useEffect(() => {
    if (gameId) {
      const board = MasterMindLib.createBoard({
        guesses: mastermind.settings.guesses,
        size: mastermind.settings.holes,
        colors: mastermind.settings.colors
      }, gameId)
      setMastermind({
        ...mastermind,
        client: createLocalClient(board)
      })
    }
  }, [])

  // register/search/join
  return <MastermindContext.Provider value={mastermind}>
    {!mastermind.client ?
        <p>
          <button onClick={() => {
            const seed = generateRandomSeed()
            return navigate("/games/mastermind/" + seed)
            // const board = MasterMindLib.createBoard({
            //   guesses: mastermind.settings.guesses,
            //   size: mastermind.settings.holes,
            //   colors: mastermind.settings.colors
            // }, gameId)
            // setMastermind({
            //   ...mastermind,
            //   client: createLocalClient(board)
            // })

          }} className={button}>Create Game
          </button>
        </p> : null
    }

    {mastermind.client ? <MastermindGameBoard/> : null}
  </MastermindContext.Provider>;
};


export default MastermindGame;
