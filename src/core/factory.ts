import {LocalJsonTaskGateway} from "./DoGood/task_gateway";
import {DoGoodApplication} from "./DoGood/application";
import {InMemoryUserTaskGateway} from "./DoGood/user_task_gateway";
import {MathRandomizer, Randomizer} from "./randomizer";

const randomizer = new MathRandomizer();
const taskGateway = new LocalJsonTaskGateway(randomizer);
const userTaskGateway = new InMemoryUserTaskGateway();
const app = new DoGoodApplication(taskGateway, userTaskGateway);

export function makeApplication(): DoGoodApplication {
  return app;
}

export function makeRandomizer(): Randomizer {
  return randomizer;
}

// TODO: create factory singleton classes

