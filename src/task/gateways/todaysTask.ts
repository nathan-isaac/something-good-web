import {DateTime} from "luxon";

export type TodaysTask = {
  title: string,
  color: string,
  encouragement: string,
}

export interface TodaysTaskGateway {
  getTask(): Promise<TodaysTask>;
}

export class ArrayTodaysTaskGateway implements TodaysTaskGateway {
  constructor(protected tasks: string[], protected colors: string[], protected encouragements: string[]) {}

  getTask(): Promise<TodaysTask> {
    return Promise.resolve({
      title: this.getRandomItem(this.tasks),
      color: this.getRandomItem(this.colors),
      encouragement: this.getRandomItem(this.encouragements),
    });
  }

  protected getRandomItem(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
  }
}
