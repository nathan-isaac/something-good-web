import {Randomizer} from "../randomizer";

export interface TaskGateway {
  getRandomTask(): Promise<Task>;
}

export interface Task {
  id: number,
  title: string,
}

export class ArrayTaskGateway implements TaskGateway {
  protected tasks: Task[] = [];
  protected randomize: Randomizer;

  constructor(randomize: Randomizer) {
    this.randomize = randomize;
  }

  getRandomTask(): Promise<Task> {
    const task = this.randomize.getRandomItem(this.tasks);

    return Promise.resolve(task);
  }

  addTask(task: Task) {
    this.tasks.push(Object.assign({}, task));
  }
}
