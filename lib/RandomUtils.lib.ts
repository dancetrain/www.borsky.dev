import Rand, { PRNG } from "rand-seed";

export type RandomGenerator = {
  nextInt: (from: number, to: number) => number
  shuffleArray: <T>(array: T[]) => T[]
}


const generateRandomSeed: () => string = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const createRandomGenerator: (seed: string) => RandomGenerator = (seed) => {
  const random = new Rand(seed, PRNG.xoshiro128ss)

  const nextInt = (from: number, to: number) => {
    const range = to - from
    return Math.floor(random.next() * range) + from
  }

  return {
    nextInt: nextInt,
    shuffleArray: <T> (result: T[]) => {
      for (let i = result.length - 1; i > 0; i--) {
        const j = nextInt(0, i + 1)
        const temp = result[i]
        result[i] = result[j]
        result[j] = temp
      }
      return result
    }
  }
}

export {
  generateRandomSeed,
  createRandomGenerator
}

