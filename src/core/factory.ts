import { DoGood } from "./DoGood.js";
import { ApiThingRepository } from "./ThingRepository.js";
import {LocalJsonTaskGateway} from "./DoGood/task_gateway";
import {DoGoodApplication} from "./DoGood/application";

const thingRepository = new ApiThingRepository();

export const doGood = new DoGood(thingRepository);

const taskGateway = new LocalJsonTaskGateway();
const app = new DoGoodApplication(taskGateway);

export function makeApplication(): DoGoodApplication {
  return app;
}
