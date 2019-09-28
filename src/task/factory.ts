import {DoGoodApplication} from "./application";
import {MathRandomizer, Randomizer} from "./randomizer";
import {LocalJsonTaskGateway} from "./task_gateway";
import {InMemoryUserTaskGateway} from "./user_task_gateway";

const COLORS: string[] = [
  "#442B48",
  "#6320EE",
  "#D81E5B",
  "#F15152",
  "#66635B",
  "#A4036F",
  "#16DB93",
  "#F29E4C"
];

const ENCOURAGEMENTS: string[] = [
  "Great job! The world is a better place because of you.",
  "Solid work. Sometimes it’s the little things that save lives.",
  "Well done. You did a good thing!",
  "The hardest step is often the first one.",
  "Way to make a difference!",
  "Doing something good makes you feel good, too.",
  "One more good deed done!",
  "Lots of small things make one big thing."
];

export class DoGoodApplicationFactory {
  protected static instance: DoGoodApplication;

  static getInstance(): DoGoodApplication {
    if (!DoGoodApplicationFactory.instance) {
      const randomizer = new MathRandomizer();
      const taskGateway = new LocalJsonTaskGateway(randomizer);
      const userTaskGateway = new InMemoryUserTaskGateway();
      DoGoodApplicationFactory.instance = new DoGoodApplication(taskGateway, userTaskGateway, COLORS, ENCOURAGEMENTS);
    }

    return DoGoodApplicationFactory.instance;
  }
}

export class RandomizerFactory {
  protected static instance: Randomizer;

  static getInstance(): Randomizer {
    if (!RandomizerFactory.instance) {
      RandomizerFactory.instance = new MathRandomizer();
    }

    return RandomizerFactory.instance;
  }
}
