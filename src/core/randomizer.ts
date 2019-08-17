
export interface Randomizer {
  getRandomItem(items: string[]) : string|undefined;
}

export class MathRandomizer implements Randomizer {
  getRandomItem(items: string[]): string|undefined {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export class RandomizerStub implements Randomizer {
  public randomIndex: number = 0;

  getRandomItem(items: string[]): string|undefined {
    return items[this.randomIndex];
  }
}

// Not production ready!
// Requires tests
// class UniqueRandomizer implements Randomizer {
//   protected randomizer: Randomizer;
//   protected selectedItems: string[] = [];
//
//   constructor(randomizer: Randomizer) {
//     this.randomizer = randomizer;
//   }
//
//   getRandomItem(items: string[]): string|undefined {
//     const item = this.randomizer.getRandomItem(items);
//
//     if (this.selectedItems.includes(item)) {
//       return this.getRandomItem(items);
//     }
//
//     this.selectedItems.push(item);
//
//     return item;
//   }
// }
