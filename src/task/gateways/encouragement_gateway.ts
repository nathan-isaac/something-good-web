import {Randomizer} from "../randomizer";

export type Encouragement = string;

export interface EncouragementGateway {
  getRandomEncouragement(): Promise<Encouragement>;
}

export class EncouragementGatewayStub implements EncouragementGateway {
  protected encouragement: Encouragement;

  constructor(encouragement: Encouragement = 'encouragement') {
    this.encouragement = encouragement;
  }

  getRandomEncouragement(): Promise<Encouragement> {
    return Promise.resolve(this.encouragement);
  }

  setEncouragement(encouragement: Encouragement) {
    this.encouragement = encouragement;
  }
}

export class ArrayEncouragementGateway implements EncouragementGateway {
  protected encouragements: Encouragement[];
  private randomizer: Randomizer;

  constructor(encouragements: Encouragement[], randomizer: Randomizer) {
    this.encouragements = encouragements;
    this.randomizer = randomizer;
  }

  getRandomEncouragement(): Promise<Encouragement> {
    return Promise.resolve(this.randomizer.getRandomItem(this.encouragements));
  }
}
