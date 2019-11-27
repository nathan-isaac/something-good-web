import {TaskGateway} from "./task_gateway";
import {StatusCode, UserTaskGateway} from "./user_task_gateway";
import {ColorGateway} from "./color_gateway";
import {EncouragementGateway} from "./encouragement_gateway";

export enum ResponseErrorCode {
  NoTaskFound,
  NoUserTaskFound,
}

export type ErrorResponse = {
  errorCode: ResponseErrorCode,
}

export type Response = {
  encouragement?: string,
  task: {
    id: number,
    title: string,
    completed: boolean,
    color: string,
  }
}

export class DoGoodApplication {
  protected taskGateway: TaskGateway;
  protected encouragement_gateway: EncouragementGateway;
  protected color_gateway: ColorGateway;
  protected userTaskGateway: UserTaskGateway;

  constructor(taskGateway: TaskGateway, userTaskGateway: UserTaskGateway, color_gateway: ColorGateway, encouragement_gateway: EncouragementGateway) {
    this.encouragement_gateway = encouragement_gateway;
    this.color_gateway = color_gateway;
    this.userTaskGateway = userTaskGateway;
    this.taskGateway = taskGateway;
  }

  async getTodaysTask(): Promise<ErrorResponse|Response> {
    return Promise.resolve({
      errorCode: ResponseErrorCode.NoTaskFound
    });
    // const savedTask = await this.userTaskGateway.findUncompleted();

    // if (savedTask) {
    //   const task = await this.taskGateway.findById(savedTask.taskId);

    //   if (!task) {
    //     return Promise.resolve({
    //       errorCode: ResponseErrorCode.NoTaskFound,
    //     });
    //   }

    //   const color = await this.color_gateway.get_random_color();
    //   const encouragement = await this.encouragement_gateway.get_random_encouragement();

    //   return Promise.resolve({
    //     color: color,
    //     encouragement: encouragement,
    //     task: {
    //       id: task.id,
    //       title: task.title,
    //       completed: false,
    //     }
    //   });
    // }

    // return this.getNewTask();
  }

  async getNewTask() {
    const randomTask = await this.taskGateway.getRandomTask();

    if (!randomTask) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoTaskFound,
      });
    }

    await this.userTaskGateway.save({
      taskId: randomTask.id,
      statusCode: StatusCode.Uncompleted,
    });

    const color = await this.color_gateway.get_random_color();
    const encouragement = await this.encouragement_gateway.get_random_encouragement();

    return Promise.resolve({
      color: color,
      encouragement: encouragement,
      task: {
        id: randomTask.id,
        title: randomTask.title,
        completed: false,
      }
    });
  }

  async completeTask(): Promise<Response> {
    const uncompleted = await this.userTaskGateway.findUncompleted();

    if (!uncompleted) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoUserTaskFound,
      });
    }

    const task = await this.taskGateway.findById(uncompleted.taskId);

    if (!task) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoTaskFound,
      });
    }

    uncompleted.statusCode = StatusCode.Completed;
    await this.userTaskGateway.save(uncompleted);

    const color = await this.color_gateway.get_random_color();
    const encouragement = await this.encouragement_gateway.get_random_encouragement();

    return Promise.resolve({
      color: color,
      encouragement: encouragement,
      task: {
        id: task.id,
        title: task.title,
        completed: true,
      }
    });
  }

  async skipTask() {
    const uncompleted = await this.userTaskGateway.findUncompleted();

    if (!uncompleted) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoUserTaskFound,
      });
    }

    const task = await this.taskGateway.findById(uncompleted.taskId);

    if (!task) {
      return Promise.resolve({
        errorCode: ResponseErrorCode.NoTaskFound,
      });
    }

    uncompleted.statusCode = StatusCode.Skipped;
    await this.userTaskGateway.save(uncompleted);

    return this.getNewTask();
  }
}
