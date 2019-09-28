import {TaskGateway} from "./task_gateway";
import {StatusCode, UserTaskGateway} from "./user_task_gateway";

export enum ResponseErrorCode {
  NoTaskFound,
  NoUserTaskFound,
}

export interface Response {
  errorCode?: ResponseErrorCode,
  color?: string,
  encouragement?: string,
  task?: {
    id: number,
    title: string,
    completed: boolean,
  }
}

export class DoGoodApplication {
  protected taskGateway: TaskGateway;
  protected colors: string[] = [];
  protected encouragements: string[] = [];
  protected userTaskGateway: UserTaskGateway;

  constructor(taskGateway: TaskGateway, userTaskGateway: UserTaskGateway, colors: string[] = [], encouragements: string[] = []) {
    this.colors = colors;
    this.encouragements = encouragements;
    this.userTaskGateway = userTaskGateway;
    this.taskGateway = taskGateway;
  }

  async getTodaysTask(): Promise<Response> {
    const savedTask = await this.userTaskGateway.findUncompleted();

    if (savedTask) {
      const task = await this.taskGateway.findById(savedTask.taskId);

      if (!task) {
        return Promise.resolve({
          errorCode: ResponseErrorCode.NoTaskFound,
        });
      }

      return Promise.resolve({
        color: this.colors[0],
        encouragement: this.encouragements[0],
        task: {
          id: task.id,
          title: task.title,
          completed: false,
        }
      });
    }

    return this.getNewTask();
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

    return Promise.resolve({
      color: this.colors[0],
      encouragement: this.encouragements[0],
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

    return Promise.resolve({
      color: this.colors[0],
      encouragement: this.encouragements[0],
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
