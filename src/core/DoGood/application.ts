import {NO_TASK_FOUND} from "./response";
import {TaskGateway} from "./task_gateway";

export interface Response {
  errorCode?: number,
  task?: {
    id: number,
    title: string,
    completed: boolean,
  }
}

export class DoGoodApplication {
  protected taskGateway: TaskGateway;

  constructor(taskGateway: TaskGateway) {
    this.taskGateway = taskGateway;
  }

  async getTodaysTask(): Promise<Response> {
    const thing = await this.taskGateway.getRandomTask();

    if (!thing) {
      return Promise.resolve({
        errorCode: NO_TASK_FOUND,
      });
    }

    return Promise.resolve({
      task: {
        id: thing.id,
        title: thing.title,
        completed: false,
      }
    });
  }
}
