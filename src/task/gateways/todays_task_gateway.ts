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

export class LocalStorageTodaysTaskGateway implements TodaysTaskGateway {
  protected localStorage: Storage

  constructor(localStorage: Storage) {
    this.localStorage = localStorage
  }

  getTodaysTask(): Promise<TodaysTask | undefined> {
    const item = JSON.parse(this.localStorage.getItem('todaysTask') || 'null');

    if (!item) {
      return Promise.resolve(undefined);
    }


    return Promise.resolve({
      id: item.id,
      title: item.title,
      color: item.color,
      encouragement: item.encouragement,
      status: item.status,
      created_at: DateTime.fromISO(item.created_at),
      updated_at: DateTime.fromISO(item.updated_at)
    })
  }

  saveTodaysTask(task: TodaysTask): Promise<void> {
    const formattedTask = {
        id: task.id,
        title: task.title,
        color: task.color,
        encouragement: task.encouragement,
        status: task.status,
        created_at: task.created_at.toISO(),
        updated_at: task.updated_at.toISO()
    }

    this.localStorage.setItem('todaysTask', JSON.stringify(formattedTask));
    return Promise.resolve();
  }
}
