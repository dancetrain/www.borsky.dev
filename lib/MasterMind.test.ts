import * as MasterMind from './MasterMind.lib';
import _ from "lodash";
import { Config, GameStatus } from "./MasterMind.lib";

describe('Testing game generations', () => {
  test('Too big for generate game solution', () => {
    expect(() => MasterMind.createRandomSolution(99)).toThrow(/Solution length cannot be greater than/);
  });

  test('Generate solution 4 different colors', () => {
    const solution = MasterMind.createRandomSolution(4);
    expect(4).toBe(solution.length);
    const uniq = _.uniq(solution)
    expect(4).toBe(uniq.length)
  });

  test('Creates playable board', () => {
    const board = MasterMind.createBoard(40, 1)
    let result: GameStatus = 'ACTIVE'
    for (let i = 0; i < Config.COLORS_SIZE; i++) {
      result = board.checkSolution([Config.COLORS[i]])
      if (result != 'ACTIVE') {
        break
      }
    }
    expect(result).toBe('WON')
  })
});
