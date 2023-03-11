import React, { useEffect, useState } from "react";
import { useParams } from "@reach/router"
import MastermindGameBoard from "./Mastermind.board";
import MastermindContext, {
  MastermindClient,
  MastermindContextDefaults,
  MastermindContextProps, MastermindSettingsProps
} from "./Mastermind.context";
import { button } from './Mastermind.module.css'

import MasterMindLib, { AttemptResult, GameStatus, MasterMindBoard } from '../../../../lib/MasterMind.lib';
import { generateRandomSeed } from "../../../../lib/RandomUtils.lib";
import { navigate } from "gatsby";


type GameType = "LOCAL" | "REMOTE";

const createLocalClient: (gameId: string, context: MastermindContextProps) => MastermindClient = (gameId: string, context) => {
  const board = MasterMindLib.createBoard({
    guesses: context.settings.guesses,
    size: context.settings.holes,
    colors: context.settings.colors
  }, gameId)

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

const MastermindGame: React.FC = () => {
  // handle custom states
  const {gameId} = useParams<{ gameId?: string }>();

  //MastermindContextDefaults.settings.colors.length
  const [colors, setColors] = useState(MastermindContextDefaults.settings.colors);
  const [gameType, setGameType] = useState<GameType>("LOCAL");

  const [mastermind, setMastermind] = useState<MastermindContextProps>({
    ...MastermindContextDefaults,
    settings: {
      ...MastermindContextDefaults.settings,
      colors: [...colors]
    }
  })

  useEffect(() => {
    if (gameId) {
      const client = createLocalClient(gameId, mastermind)

      setMastermind({
        ...mastermind,
        client: client
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
