import { generateRandomSeed, createRandomGenerator } from "./RandomUtils.lib";

describe('It generates random seed', () => {
  test('Generates random seed', () => {
    const seed = generateRandomSeed()
    expect(seed.length).toBeGreaterThan(15)
  });

  test('Random seed generates same numbers', () => {
    const seed = "abc"
    const random = createRandomGenerator(seed)
    const seq = [
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
        random.nextInt(0, 10),
    ]
    expect(seq).toEqual([0, 6, 4, 0, 7, 4, 3, 8, 1])
  });
  test('Random seed generates same numbers', () => {
    const seed = "abc"
    const random = createRandomGenerator(seed)

    const seq: number[] = []
    for (let i = 0; i < 10; i++) {
      seq.push(random.nextInt(0, 10));
    }

    expect(seq).toEqual([0, 6, 4, 0, 7, 4, 3, 8, 1, 9])
    expect(random.shuffleArray(seq)).not.toEqual([0, 6, 4, 0, 7, 4, 3, 8, 1])
  });
})

