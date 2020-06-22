import {DateTime} from "luxon";
import {TodaysTask, TodaysTaskGateway} from "./todaysTask";

export enum TaskStatus {
  uncompleted,
  completed,
  skipped
}

type TaskId = string
type TaskTitle = string
type Color = string
type Encouragement = string

export const COLORS: Color[] = [
  "#442B48",
  "#6320EE",
  "#D81E5B",
  "#F15152",
  "#66635B",
  "#A4036F",
  "#16DB93",
  "#F29E4C"
];

export const ENCOURAGEMENTS: Encouragement[] = [
  "Great job! The world is a better place because of you.",
  "Solid work. Sometimes it’s the little things that save lives.",
  "Well done. You did a good thing!",
  "The hardest step is often the first one.",
  "Way to make a difference!",
  "Doing something good makes you feel good, too.",
  "One more good deed done!",
  "Lots of small things make one big thing."
];

export type NewTask = {
  title: TaskTitle,
  color: Color,
  encouragement: Encouragement,
}

export interface Task {
  id: TaskId,
  title: TaskTitle,
  color: Color,
  encouragement: Encouragement,
  status: TaskStatus,
  completed_at?: DateTime,
  created_at: DateTime,
  updated_at: DateTime,
}

export interface TaskGeneratorGateway {
  generate(): Promise<NewTask>;
}

export class MemoryTaskGeneratorGateway implements TaskGeneratorGateway {
  constructor(
    protected taskTitles: TaskTitle[],
    protected colors: Color[],
    protected encouragements: Encouragement[]
  ) {}

  generate(): Promise<NewTask> {
    return Promise.resolve({
      title: this.getRandomItem(this.taskTitles),
      color: this.getRandomItem(this.colors),
      encouragement: this.getRandomItem(this.encouragements),
    });
  }

  protected getRandomItem(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export interface TaskGateway {
  findLatest(): Promise<Task|undefined>;
  create(title: TaskTitle, color: Color, encouragement: Encouragement): Promise<Task>
  complete(id: TaskId): Promise<Task>;
  getLastId(): string;
  all(): Task[];
}

export class ArrayTaskGateway implements TaskGateway {
  constructor(protected tasks: Task[] = []) {}

  findLatest(): Promise<Task | undefined> {
    return Promise.resolve(undefined);
  }

  all(): Task[] {
    return [];
  }

  complete(id: TaskId): Promise<Task> {
    return Promise.resolve(undefined);
  }

  create(title: TaskTitle, color: Color, encouragement: Encouragement): Promise<Task> {
    return Promise.resolve(undefined);
  }

  getLastId(): string {
    return "";
  }
}

export class LocalStorageTaskGateway implements TodaysTaskGateway {
  constructor(protected localStorage: Storage) {}

  save(task: Task): Promise<Task> {
    const items = JSON.parse(this.localStorage.getItem('tasks') || '{}');

    // find by id

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
