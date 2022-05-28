import React, { useMemo } from "react";
import {
  actionable,
  attemptCell,
  board,
  checkMoveButton,
  codeCell,
  codeRow,
  keyCell,
  peg,
  pegBall,
  row,
  spaceCell
} from './Mastermind.module.css';
import MastermindContext from "./Mastermind.context";
import { AttemptResult } from "../../../../lib/MasterMind.lib";

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
  Ball?: React.FC | undefined,
  onClick?: () => void,
  style?: React.CSSProperties
}
const Peg: React.FC<PegProps> = ({Ball, onClick, style, ...rest}) => (
    <div className={peg} onClick={() => onClick?.apply(this)} style={style}>
      {Ball ? <Ball {...rest} /> : null}
    </div>
);

type AttemptResultCellProps = {
  result: AttemptResult
}

const attemptResultColors: { [key in keyof AttemptResult]: string } = {
  rightRight: 'green',
  rightWrong: 'yellow',
  wrongWrong: 'red',
}

const convertAttemptResultToPegs = (result: AttemptResult): string[] => {
  const pegs: string[] = [];
  for (let i = 0; i < result.rightRight; i++) {
    pegs.push(attemptResultColors['rightRight']);
  }
  for (let i = 0; i < result.rightWrong; i++) {
    pegs.push(attemptResultColors['rightWrong']);
  }
  for (let i = 0; i < result.wrongWrong; i++) {
    pegs.push(attemptResultColors['wrongWrong']);
  }
  return pegs;
}

const styles: React.CSSProperties = {
  display: 'flex',
  width: '100%'
}

const AttemptResultCell: React.FC<AttemptResultCellProps> = ({result}) => {
  const pegs = convertAttemptResultToPegs(result);
  const half = Math.ceil(pegs.length / 2);

  return <div className={`${attemptCell}`}>
    <div style={styles}>
      {pegs.slice(0, half).map((color, i) => <Peg key={i} Ball={PegBall} color={color} />)}
    </div>
    <div style={styles}>
      {pegs.slice(half).map((color, i) => <Peg key={i + half} Ball={PegBall} color={color} />)}
    </div>
  </div>;
}

const MastermindGameBoard: React.FC = () => {
  const gameContext = React.useContext(MastermindContext)
  const colors = gameContext.settings.colors;
  const [currentMove, setCurrentMove] = React.useState<(string | undefined)[]>([]);
  const [currentBoard, setCurrentBoard] = React.useState<string[][]>(gameContext.client?.getBoard() ?? []);
  const [attempts, setAttempts] = React.useState<AttemptResult[]>([]);

  const isReady = useMemo(() => {
    return currentMove.length === gameContext.settings.holes
        && currentMove.indexOf(undefined) === -1
  }, [currentMove])

  const onDeckClick = (color: string) => {
    setCurrentMove((oldMove) => {
      let i = 0;
      if (oldMove.includes(color)) {
        i = oldMove.indexOf(color) + 1;

        if (i === gameContext.settings.holes) {
          i = 0;
        }
      }
      for (; i < gameContext.settings.holes; i++) {
        if (oldMove[i] === undefined) {
          if (oldMove.includes(color)) {
            oldMove[oldMove.indexOf(color)] = undefined;
          }
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
          setCurrentBoard(newBoard);
          setAttempts(gameContext.client!!.getAttempts())
        } else {
          const newBoard = gameContext.client!!.getBoard();
          console.log(newBoard);
          setAttempts(gameContext.client!!.getAttempts())
          // WON or LOST
          if (status == 'WON') {
            alert('You won! ٩(◕‿◕)۶ ')
          } else {
            alert('You lost! ( ͡° ʖ̯ ͡°)')
          }

        }
      })
    }
  };

  return <div className={board}>
    <div className={"master-mind-field"}>
      <div className={row}>
        <div className={keyCell}>&nbsp;</div>
        <div className={spaceCell}>&nbsp;</div>
        <div className={codeCell}>
          <div className={`${row} ${codeRow}`}>
            {colors.map((color, i) =>
                <Peg key={color}
                     style={{width: `${Math.floor(100 / colors.length)}%`}}
                     Ball={PegBall}
                     color={color}
                     onClick={() => onDeckClick(color)}
                />
            )}
          </div>
        </div>
      </div>

      {currentBoard?.map((rowData, i) =>
          <div className={row}>
            <div className={keyCell}>
              <AttemptResultCell result={attempts[i]}/>
            </div>
            <div className={spaceCell}>&nbsp;</div>
            <div className={codeCell}>
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
        <div className={codeCell}>
          <div className={row}>
            {[...Array(gameContext.settings.holes)].map((_, i) => {
              const color = currentMove[i];
              return <Peg key={i + currentBoard.length }
                          Ball={color ? PegBall : undefined}
                          color={color}
                          onClick={() => setCurrentMove((oldMove) => [...oldMove.slice(0, i), undefined, ...oldMove.slice(i + 1)])}
              />
            })
            }
          </div>
        </div>
      </div>
      {[...Array(gameContext.settings.guesses - (currentBoard?.length || 0))].map((_, itry) =>
          <div className={row} key={itry + currentBoard?.length || 0 }>
            <div className={keyCell}>&nbsp;</div>
            <div className={spaceCell}>&nbsp;</div>
            <div className={codeCell}>
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
