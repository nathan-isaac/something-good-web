import {TaskGateway} from "./task_gateway";
import {StatusCode, UserTaskGateway} from "./user_task_gateway";

export enum ResponseErrorCode {
  NoTaskFound,
}

export interface Response {
  errorCode?: ResponseErrorCode,
  task?: {
    id: number,
    title: string,
    completed: boolean,
  }
}

export class DoGoodApplication {
  protected taskGateway: TaskGateway;
  protected userTaskGateway: UserTaskGateway;

  constructor(taskGateway: TaskGateway, userTaskGateway: UserTaskGateway) {
    this.userTaskGateway = userTaskGateway;
    this.taskGateway = taskGateway;
  }

  async getTodaysTask(): Promise<Response> {
    const thing = await this.taskGateway.getRandomTask();

    if (!thing) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoTaskFound,
      });
    }

    await this.userTaskGateway.save({
      taskId: thing.id,
      statusCode: StatusCode.Uncompleted,
    });

    return Promise.resolve({
      task: {
        id: thing.id,
        title: thing.title,
        completed: false,
      }
    });
  }
}
