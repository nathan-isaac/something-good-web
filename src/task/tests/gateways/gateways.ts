import { TaskGateway, Task } from "../../gateways/task_gateway";

export class TaskGatewayStub implements TaskGateway {
  protected randomTask: Task;

  constructor(randomTask: Task) {
    this.randomTask = randomTask;
  }

  getRandomTask(): Promise<Task> {
    return Promise.resolve(this.randomTask);
  }

  setRandomTask(task: Task) {
    this.randomTask = task;
  }
}
