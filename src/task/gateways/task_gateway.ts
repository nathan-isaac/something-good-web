import {Randomizer} from "../randomizer";

export interface TaskGateway {
  getRandomTask(): Promise<Task>;
}

export interface Task {
  id: number,
  title: string,
}

export class InMemoryTaskGateway implements TaskGateway {
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

// TODO: just use in memory task gateway
export class LocalJsonTaskGateway extends InMemoryTaskGateway {
  constructor(randomizer: Randomizer) {
    super(randomizer);

    const tasks = require('../../data/tasks.json');

    tasks.forEach((task: Task) => {
      this.addTask({
        id: task.id,
        title: task.title,
      });
    })
  }
}
