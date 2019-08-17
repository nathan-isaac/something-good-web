
export interface Randomizer {
  getRandomItem(items: string[]) : string;
}

export class MathRandomizer implements Randomizer {
  getRandomItem(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export class RandomizerStub implements Randomizer {
  public randomIndex: number = 0;

  getRandomItem(items: string[]): string {
    return items[this.randomIndex];
  }
}
