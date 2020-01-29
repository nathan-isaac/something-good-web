import { TaskGateway, Task } from "../../gateways/task_gateway";
import {TodaysTask, TodaysTaskGateway} from "../../gateways/todays_task_gateway";
import {TaskHistory, TaskHistoryGateway} from "../../gateways/task_history_gateway";

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

export class TodaysTaskGatewaySpy implements TodaysTaskGateway {
  public getTodaysTaskCalled : number = 0;
  public getTodaysTaskReturn : TodaysTask | undefined;

  public saveTodaysTaskParams : TodaysTask[] = [];

  getTodaysTask(): Promise<TodaysTask | undefined> {
    this.getTodaysTaskCalled++;
    return Promise.resolve(this.getTodaysTaskReturn);
  }

  saveTodaysTask(task: TodaysTask): Promise<void> {
    this.saveTodaysTaskParams.push(task);
    return Promise.resolve();
  }
}

export class TaskHistoryGatewaySpy implements TaskHistoryGateway {
  public saveParams: TaskHistory[] = [];

  save(task: TaskHistory): Promise<void> {
    this.saveParams.push(task);
    return Promise.resolve();
  }
}
