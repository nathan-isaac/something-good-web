import {Randomizer} from "../randomizer";
import {DateTime} from "luxon";
import {TodaysTask, TodaysTaskGateway} from "./todaysTask";

export enum TaskStatus {
  uncompleted,
  completed,
  skipped
}

export interface Task {
  id?: number,
  title: string,
  color: string,
  encouragement: string,
  status: TaskStatus,
  created_at: DateTime,
  updated_at: DateTime,
}

export interface TaskGateway {
  save(task: Task): Promise<Task>;
}

export class ArrayTaskGateway implements TaskGateway {
  constructor(protected tasks: Task[] = []) {}

  save(task: Task): Promise<Task> {
    this.tasks.push(Object.assign({}, task));
    return Promise.resolve(task);
  }
}

export class LocalStorageTaskGateway implements TodaysTaskGateway {
  constructor(protected localStorage: Storage) {}

  save(task: Task): Promise<Task> {
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

  update(task: TodaysTask): Promise<void> {
    const formattedTask = {
      id: task.id,
      title: task.title,
      color: task.color,
      encouragement: task.encouragement,
      status: task.status,
      created_at: task.created_at.toISO({
        includeOffset: false,
      }),
      updated_at: task.updated_at.toISO({
        includeOffset: false,
      })
    }

    this.localStorage.setItem('todaysTask', JSON.stringify(formattedTask));
    return Promise.resolve();
  }
}
