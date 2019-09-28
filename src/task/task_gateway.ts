import {Randomizer} from "./randomizer";

export interface TaskGateway {
  getRandomTask(): Promise<Task|undefined>;
  findById(taskId: number): Promise<Task|null>;
}

export interface Task {
  id: number,
  title: string,
}

export class InMemoryTaskGateway implements TaskGateway {
  protected tasks: Task[] = [];
  protected id: number = 1;
  protected randomize: Randomizer;

  constructor(randomize: Randomizer) {
    this.randomize = randomize;
  }

  getRandomTask(): Promise<Task|undefined> {
    const task = this.randomize.getRandomItem(this.tasks);
    return Promise.resolve(task);
  }

  save(task: Task) {
    if (!task.id) {
      task.id = this.id;
      this.id++;
    }

    this.tasks.push(Object.assign({}, task));
  }

  findById(taskId: number): Promise<Task | null> {
    const task = this.tasks.find(task => {
      return task.id === taskId;
    });

    if (!task) {
      return Promise.resolve(null);
    }

    return Promise.resolve(task);
  }
}

export class LocalJsonTaskGateway extends InMemoryTaskGateway {
  constructor(randomizer: Randomizer) {
    super(randomizer);

    const tasks = require('../data/tasks.json');

    tasks.forEach((task: Task) => {
      this.save(task);
    })
  }
}
