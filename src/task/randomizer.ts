
export interface Randomizer {
  getRandomItem(items: any[]): any;
}

export class MathRandomizer implements Randomizer {
  getRandomItem(items: any[]): any {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export class RandomizerStub implements Randomizer {
  public randomIndex: number = 0;

  getRandomItem(items: any[]): any {
    return items[this.randomIndex];
  }
}
