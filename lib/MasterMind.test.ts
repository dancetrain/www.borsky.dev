import MasterMind from './MasterMind.lib';
import _ from "lodash";
import { Config, GameStatus } from "./MasterMind.lib";

describe('Testing game generations', () => {
  test('Too big for generate game solution', () => {
    expect(() => MasterMind.createRandomSolution({length: 99})).toThrow(/Solution length cannot be greater than/);
  });

  test('Generate solution 4 different colors', () => {
    const solution = MasterMind.createRandomSolution({length: 4});
    expect(4).toBe(solution.length);
    const uniq = _.uniq(solution)
    expect(4).toBe(uniq.length)
  });

  test('Creates playable board', () => {
    const board = MasterMind.createBoard({guesses: Config.COLORS.length, size: 1})
    let result: GameStatus = 'ACTIVE'
    for (let i = 0; i < Config.COLORS_SIZE; i++) {
      result = board.checkSolution([Config.COLORS[i]])
      if (result != 'ACTIVE') {
        break
      }
    }
    expect(result).toBe('WON')
  })

  test('Generates board with problematic seeds', () => {
    expect(() => {
      return MasterMind.createBoard({guesses: Config.COLORS.length, size: 1}, undefined)
    }).not.toThrow()
    expect(() => {
      return MasterMind.createBoard({guesses: Config.COLORS.length, size: 1}, "")
    }).not.toThrow()
  })
  //
  // test('Generates random board id', () => {
  //   const boardIds = []
  //   for (let i = 0; i < 100; i++) {
  //     const boardId = MasterMind.generateRandomBoardId()
  //     expect(boardIds.indexOf(boardId)).toBe(-1)
  //     boardIds.push(boardId)
  //   }
  // })

  // test('Loads board from id', () => {
  //   const boardId = MasterMind.generateRandomBoardId()
  //   const board = MasterMind.loadBoard(boardId)
  //   expect(board.id).toBe(boardId)
  // })
});
