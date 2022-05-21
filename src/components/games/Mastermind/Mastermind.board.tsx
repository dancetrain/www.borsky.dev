import React from "react";
import { actionable, board, peg, pegBall, playzone, row } from './Mastermind.module.css';
import img from './assets/mm2.jpg';
import { Config } from "../../../../lib/MasterMind.lib";

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

const MastermindGameBoard: React.FC<MastermindGameBoardProps> = (
    {
      holes = 4,
      tries = 20,
    }
) => {
  const colors = Config.COLORS;
  const [currentMove, setCurrentMove] = React.useState<(string | undefined)[]>([...Array(holes)].map(() => undefined));

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
      <div className={"deck"}>
        <div className={row}>
          {colors.map((color, i) =>
              <Peg key={color}
                   Ball={() => <PegBall color={color}/>}
                   onClick={() => onDeckClick(color)}
              />
          )}
        </div>
      </div>
      <div className={playzone}>
        <div className={row}>
          {[...Array(holes)].map((_, i) => {
            const color = currentMove[i];
            return <Peg key={i}
                        Ball={color ? () => <PegBall color={color}/> : undefined}
                        onClick={() => setCurrentMove((oldMove) => [...oldMove.slice(0, i), undefined, ...oldMove.slice(i + 1)])}
            />
          })
          }
        </div>
        {[...Array(tries)].map((_, itry) => <div className={row} key={itry}>
              {[...Array(holes)].map((_, ihole) => <Peg key={itry + ihole}/>)}
            </div>
        )}
      </div>
      <div className={playzone}>
        <img src={img} alt={"board"}/>
      </div>
    </div>
  </div>
};
export default MastermindGameBoard;
