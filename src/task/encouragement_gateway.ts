import {Randomizer} from "./randomizer";

export type Encouragement = string;

export interface EncouragementGateway {
  get_random_encouragement(): Promise<Encouragement>;
}

export class EncouragementGatewayStub implements EncouragementGateway {
  protected encouragement: Encouragement = 'encouragement';

  get_random_encouragement(): Promise<Encouragement> {
    return Promise.resolve(this.encouragement);
  }

  set_encouragement(encouragement: Encouragement) {
    this.encouragement = encouragement;
  }
}

export class ArrayEncouragementGateway {
  protected encouragements: Encouragement[];
  private randomizer: Randomizer;

  constructor(encouragements: Encouragement[], randomizer: Randomizer) {
    this.encouragements = encouragements;
    this.randomizer = randomizer;
  }

  get_random_encouragement(): Promise<Encouragement> {
    return Promise.resolve(this.randomizer.getRandomItem(this.encouragements));
  }
}
