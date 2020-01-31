// maybe make object with hex, rgb attributes?
import {Randomizer} from "../randomizer";

export type Color = string;

export interface ColorGateway {
  getRandomColor(): Promise<Color>;
}

export class ArrayColorGateway implements ColorGateway {
  protected colors: Color[];
  private randomizer: Randomizer;

  constructor(colors: Color[], randomizer: Randomizer) {
    this.colors = colors;
    this.randomizer = randomizer;
  }

  getRandomColor(): Promise<Color> {
    return Promise.resolve(this.randomizer.getRandomItem(this.colors));
  }
}
