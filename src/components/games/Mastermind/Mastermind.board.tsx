import React, { useMemo } from "react";
import {
  actionable,
  board,
  checkMoveButton,
  codeRow,
  fieldCell,
  keyCell,
  peg,
  pegBall,
  row,
  spaceCell
} from './Mastermind.module.css';
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

type PegProps = {
  Ball?: typeof PegBall,
  onClick?: () => void,
  style?: React.CSSProperties
}
const Peg: React.FC<PegProps> = ({Ball, onClick, style}) => (
    <div className={peg} onClick={() => onClick?.apply(this)} style={style}>
      {Ball ? <Ball/> : null}
    </div>
);

const MastermindGameBoard: React.FC = () => {
  const gameContext = React.useContext(MastermindContext)
  const colors = gameContext.settings.colors;
  const [currentMove, setCurrentMove] = React.useState<(string | undefined)[]>([]);
  const [currentBoard, setCurrentBoard] = React.useState<string[][]>(gameContext.client?.getBoard() ?? []);

  const isReady = useMemo(() => {
    return currentMove.length === gameContext.settings.holes
        && currentMove.indexOf(undefined) === -1
  }, [currentMove])

  const onDeckClick = (color: string) => {
    setCurrentMove((oldMove) => {
      for (let i = 0; i < gameContext.settings.holes; i++) {
        if (oldMove[i] === undefined) {
          return [...oldMove.slice(0, i), color, ...oldMove.slice(i + 1)]
        }
      }
      return oldMove;
    })
  }

  const onCheckMove = () => {
    if (currentMove.indexOf(undefined) === -1) {
      const status = gameContext?.client?.checkGuess(currentMove as string[])
      status?.then(status => {
        console.log(status);
        if (status == 'ACTIVE') {
          setCurrentMove([]);
          const newBoard = gameContext.client!!.getBoard();
          console.log("New board: ", newBoard);
          setCurrentBoard(newBoard);
        }
      })
    }
  };

  return <div className={board}>
    <div className={"master-mind-field"}>
      <div className={row}>
        <div className={keyCell}>&nbsp;</div>
        <div className={spaceCell}>&nbsp;</div>
        <div className={fieldCell}>
          <div className={`${row} ${codeRow}`}>
            {colors.map((color, i) =>
                <Peg key={color}
                     style={{width: `${Math.floor(100 / colors.length)}%`}}
                     Ball={() => <PegBall color={color}/>}
                     onClick={() => onDeckClick(color)}
                />
            )}
          </div>
        </div>
      </div>

      {currentBoard?.map((rowData, i) =>
          <div className={row}>
            <div className={keyCell}>&nbsp;</div>
            <div className={spaceCell}>&nbsp;</div>
            <div className={fieldCell}>
              <div className={row} key={i}>
                {rowData.map((color, j) =>
                    <Peg key={color}
                         Ball={() => <PegBall color={color}/>}
                    />
                )}
              </div>

            </div>
          </div>
      )}
      <div className={row}>
        <div className={keyCell}>
          <button onClick={onCheckMove}
                  type={"button"}
                  className={checkMoveButton}
                  disabled={!isReady}
          >
            Check Move
          </button>
        </div>
        <div className={spaceCell}>&nbsp;</div>
        <div className={fieldCell}>
          <div className={row}>
            {[...Array(gameContext.settings.holes)].map((_, i) => {
              const color = currentMove[i];
              return <Peg key={i}
                          Ball={color ? () => <PegBall color={color!!}/> : undefined}
                          onClick={() => setCurrentMove((oldMove) => [...oldMove.slice(0, i), undefined, ...oldMove.slice(i + 1)])}
              />
            })
            }
          </div>
        </div>
      </div>
      {[...Array(gameContext.settings.guesses - (currentBoard?.length || 0))].map((_, itry) =>
          <div className={row} key={itry}>
            <div className={keyCell}>&nbsp;</div>
            <div className={spaceCell}>&nbsp;</div>
            <div className={fieldCell}>
              <div className={row}>
                {[...Array(gameContext.settings.holes)].map((_, ihole) => <Peg key={itry + ihole}/>)}
              </div>
            </div>
          </div>
      )}
    </div>
  </div>
};
export default MastermindGameBoard;
