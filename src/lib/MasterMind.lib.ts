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

class MasterMindBoard {
  private readonly _board: Board;
  private readonly _solution: Solution;
  private _currentRow: number;
  private _status: GameStatus = 'ACTIVE';

  constructor(board: Board, solution: Solution) {
    this._board = board;
    this._currentRow = 0;
    this._solution = solution;
  }

  public checkSolution(attempt: Row): GameStatus {
    if (this._status != 'ACTIVE') {
      return this._status;
    }

    this._board[this._currentRow] = attempt
    this._checkMove(attempt)
    return this._status;
  }

  private _checkMove(attempt: Row) {
    if (_.isEqual(this._solution, attempt)) {
      this._status = 'WON'
    } else {
      this._currentRow += 1
    }
    if (this._board.length == this._currentRow) {
      this._status = 'LOSE'
    }
  }
}


const createRandomSolution: (length?: number) => Solution = (length: number = Config.HOLES_SIZE) => {
  if (length > Config.COLORS_SIZE) {
    throw new Error(`Solution length cannot be greater than ${Config.COLORS_SIZE} size`);
  }

  const solution: Solution = [];
  for (let i = 0; i < Config.COLORS_SIZE; i++) {
    solution[i] = Config.COLORS[i];
  }

  return _.sampleSize(solution, length)
}

const createBoard: (moves?: number, size?: number) => MasterMindBoard = (moves: number = Config.TRIES_SIZE, size: number = Config.HOLES_SIZE) => {
  const solution = createRandomSolution(size)
  const board: Board = new Array(moves)
  return new MasterMindBoard(board, solution)
}

export {
  createRandomSolution,
  createBoard
}
