import {Task, TaskGateway} from "./gateways/task";
import {TodaysTask, TodaysTaskGateway} from "./gateways/todaysTask";
import {TaskHistory, TaskHistoryGateway} from "../gateways/task_history_gateway";
import {Color, ColorGateway} from "../gateways/color_gateway";
import {Encouragement, EncouragementGateway} from "../gateways/encouragement_gateway";

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

export class ColorGatewayStub implements ColorGateway {
  protected color: Color = 'color';

  constructor(color: Color) {
    this.color = color;
  }

  getRandomColor(): Promise<Color> {
    return Promise.resolve(this.color);
  }

  setColor(color: Color) {
    this.color = color;
  }
}

export class EncouragementGatewayStub implements EncouragementGateway {
  protected encouragement: Encouragement;

  constructor(encouragement: Encouragement = 'encouragement') {
    this.encouragement = encouragement;
  }

  getRandomEncouragement(): Promise<Encouragement> {
    return Promise.resolve(this.encouragement);
  }

  setEncouragement(encouragement: Encouragement) {
    this.encouragement = encouragement;
  }
}
