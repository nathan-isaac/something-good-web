import {LocalJsonTaskGateway} from "./DoGood/task_gateway";
import {DoGoodApplication} from "./DoGood/application";
import {InMemoryUserTaskGateway} from "./DoGood/user_task_gateway";
import {MathRandomizer, Randomizer} from "./randomizer";

export class DoGoodApplicationFactory {
  protected static instance: DoGoodApplication;

  static getInstance(): DoGoodApplication {
    if (! DoGoodApplicationFactory.instance) {
      const randomizer = new MathRandomizer();
      const taskGateway = new LocalJsonTaskGateway(randomizer);
      const userTaskGateway = new InMemoryUserTaskGateway();
      DoGoodApplicationFactory.instance = new DoGoodApplication(taskGateway, userTaskGateway);
    }

    return DoGoodApplicationFactory.instance;
  }
}

export class RandomizerFactory {
  protected static instance: Randomizer;

  static getInstance(): Randomizer {
    if (! RandomizerFactory.instance) {
      RandomizerFactory.instance = new MathRandomizer();
    }

    return RandomizerFactory.instance;
  }
}
