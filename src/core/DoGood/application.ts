import {NO_TASK_FOUND} from "./response";
import {TaskGateway} from "./task_gateway";
import {StatusCode, UserTaskGateway} from "./user_task_gateway";

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
  protected userTaskGateway: UserTaskGateway;

  constructor(taskGateway: TaskGateway, userTaskGateway: UserTaskGateway) {
    this.userTaskGateway = userTaskGateway;
    this.taskGateway = taskGateway;
  }

  async getTodaysTask(): Promise<Response> {
    const thing = await this.taskGateway.getRandomTask();

    if (!thing) {
      return Promise.resolve({
        errorCode: NO_TASK_FOUND,
      });
    }

    await this.userTaskGateway.save({
      taskId: thing.id,
      taskTitle: thing.title,
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
