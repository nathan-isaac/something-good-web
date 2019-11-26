
// maybe make object with hex, rgb attributes?
import {MathRandomizer, Randomizer} from "./randomizer";

export type Color = string;

export interface ColorGateway {
  get_random_color(): Promise<Color>;
}

export class ColorGatewayStub implements ColorGateway {
  protected color: Color = 'color';

  get_random_color(): Promise<Color> {
    return Promise.resolve(this.color);
  }

  set_color(color: Color) {
    this.color = color;
  }
}

export class ArrayColorGateway implements ColorGateway {
  protected colors: Color[];
  private randomizer: Randomizer;

  constructor(colors: Color[], randomizer: Randomizer) {
    this.colors = colors;
    this.randomizer = randomizer;
  }

  get_random_color(): Promise<Color> {
    return Promise.resolve(this.randomizer.getRandomItem(this.colors));
  }
}
