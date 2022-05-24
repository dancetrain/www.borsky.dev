import React from "react";
import { actionable, board, codeRow, fieldCell, keyCell, peg, pegBall, row, spaceCell } from './Mastermind.module.css';
import MastermindContext from "./Mastermind.context";

type MastermindGameBoardProps = {
  holes?: number
  tries?: number
}

const PegBall: React.FC<{ color?: string }> = ({color}) => {
  return (
      <div className={pegBall + " " + actionable} style={{backgroundColor: color}}></div>
  )
}

const Peg: React.FC<{ Ball?: typeof PegBall, onClick?: () => void }> = ({Ball, onClick}) => (
    <div className={peg} onClick={() => onClick?.apply(this)}>
      {Ball ? <Ball/> : null}
    </div>
);

const MastermindGameBoard: React.FC = () => {
  const gameContext = React.useContext(MastermindContext)
  const colors = gameContext.settings.colors;
  const [currentMove, setCurrentMove] = React.useState<(string | undefined)[]>([...Array(gameContext.settings.holes)].map(() => undefined));

  const onDeckClick = (color: string) => {
    setCurrentMove((oldMove) => {
      for (let i = 0; i < oldMove.length; i++) {
        if (oldMove[i] === undefined) {
          return [...oldMove.slice(0, i), color, ...oldMove.slice(i + 1)]
        }
      }
      return [...oldMove];
    })
  }

  return <div className={board}>
    <div className={"master-mind-field"}>
      <div className={row}>
        <div className={keyCell}>&nbsp;</div>
        <div className={spaceCell}>&nbsp;</div>
        <div className={fieldCell}>
          <div className={`${row} ${codeRow}`}>
            {colors.map((color, i) =>
                <Peg key={color}
                     Ball={() => <PegBall color={color}/>}
                     onClick={() => onDeckClick(color)}
                />
            )}
          </div>
        </div>
      </div>
      <div className={row}>
        <div className={keyCell}>
          <button onClick={() => alert("TODO")} type={"button"}>
            Check Move
          </button>
        </div>
        <div className={spaceCell}>&nbsp;</div>
        <div className={fieldCell}>
          <div className={row}>
            {[...Array(gameContext.settings.holes)].map((_, i) => {
              const color = currentMove[i];
              return <Peg key={i}
                          Ball={color ? () => <PegBall color={color}/> : undefined}
                          onClick={() => setCurrentMove((oldMove) => [...oldMove.slice(0, i), undefined, ...oldMove.slice(i + 1)])}
              />
            })
            }
          </div>
        </div>
      </div>
      {[...Array(gameContext.settings.guesses)].map((_, itry) =>
          <div className={row}>
            <div className={keyCell}>&nbsp;</div>
            <div className={spaceCell}>&nbsp;</div>
            <div className={fieldCell}>
              <div className={row}>
                {[...Array(gameContext.settings.guesses)].map((_, ihole) => <Peg key={itry + ihole}/>)}
              </div>
            </div>
          </div>
      )}
    </div>
  </div>
};
export default MastermindGameBoard;
