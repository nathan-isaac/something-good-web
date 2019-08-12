import {LocalJsonTaskGateway} from "./DoGood/task_gateway";
import {DoGoodApplication} from "./DoGood/application";
import {InMemoryUserTaskGateway} from "./DoGood/user_task_gateway";

const taskGateway = new LocalJsonTaskGateway();
const userTaskGateway = new InMemoryUserTaskGateway();
const app = new DoGoodApplication(taskGateway, userTaskGateway);

export function makeApplication(): DoGoodApplication {
  return app;
}
