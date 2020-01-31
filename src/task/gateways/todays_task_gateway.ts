import {DateTime} from "luxon";

export enum TaskStatus {
  uncompleted,
  completed,
  skipped
}

export type TodaysTask = {
  id: number,
  title: string,
  color: string,
  encouragement: string,
  status: TaskStatus,
  created_at: DateTime,
  updated_at: DateTime,
}

export interface TodaysTaskGateway {
  saveTodaysTask(task: TodaysTask): Promise<void>;
  getTodaysTask(): Promise<TodaysTask|undefined>;
}

export class ArrayTodaysTaskGateway implements TodaysTaskGateway {
  protected todaysTask: TodaysTask | undefined;

  getTodaysTask(): Promise<TodaysTask | undefined> {
    return Promise.resolve(this.todaysTask);
  }

  saveTodaysTask(task: TodaysTask): Promise<void> {
    this.todaysTask = task;
    return Promise.resolve();
  }
}
