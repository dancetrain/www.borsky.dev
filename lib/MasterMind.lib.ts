import _ from 'lodash'

export namespace Config {
  export const COLORS = [
    '#FFFFFF',
    '#FF0000',
    '#F0FD91',
    '#1CA3FB',
    '#C66DC6',
    '#26E980',
    '#FDA25E',
    '#34FFFD'
  ];
  export const COLORS_SIZE = COLORS.length;
  export const HOLES_SIZE = 4;
  export const TRIES_SIZE = 20;
}

export type Row = string[];
export type Board = Row[];
export type Solution = Row;

export type GameStatus = 'WON' | 'LOSE' | 'ACTIVE'

export class MasterMindBoard {
  private readonly _board: Board;
  private readonly _solution: Solution;
  private _currentRow: number;
  private _status: GameStatus = 'ACTIVE';
  private _tries: number;

  constructor(solution: Solution, tries: number) {
    this._board = [];
    this._currentRow = 0;
    this._solution = solution;
    this._tries = tries;
  }

  public checkSolution(attempt: Row): GameStatus {
    if (this._status != 'ACTIVE') {
      return this._status;
    }

    this._board[this._currentRow] = attempt
    this._checkMove(attempt)
    return this._status;
  }
  public getBoard(): Board {
    return [...this._board];
  }

  private _checkMove(attempt: Row) {
    if (_.isEqual(this._solution, attempt)) {
      this._status = 'WON'
    } else {
      this._currentRow += 1
    }
    if (this._tries == this._currentRow) {
      this._status = 'LOSE'
    }
  }
}


const createRandomSolution: (length?: number, colors?: string[]) => Solution = (
    length: number = Config.HOLES_SIZE,
    colors = Config.COLORS
) => {
  if (length > colors.length) {
    throw new Error(`Solution length cannot be greater than ${colors.length} size`);
  }

  // copy colors array
  const solution: Solution = [];
  for (let i = 0; i < colors.length; i++) {
    solution[i] = colors[i];
  }

  return _.sampleSize(solution, length)
}

const createBoard: (config: {
  guesses?: number,
  size?: number,
  colors?: string[]
}) => MasterMindBoard = (
    {
      guesses = Config.TRIES_SIZE,
      size = Config.HOLES_SIZE,
      colors = Config.COLORS
    }
) => {
  const solution = createRandomSolution(size, colors)
  return new MasterMindBoard(solution, guesses)
}

export default {
  createRandomSolution,
  createBoard
}
