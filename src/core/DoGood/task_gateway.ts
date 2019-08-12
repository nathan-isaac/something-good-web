export interface TaskGateway {
  getRandomTask(): Promise<Task|null>;
  findById(taskId: number): Promise<Task|null>;
}

export interface Task {
  id: number,
  title: string,
}

export class InMemoryTaskGateway implements TaskGateway {
  protected tasks: Task[] = [];
  protected id: number = 1;

  getRandomTask(): Promise<Task|null> {
    const task = this.tasks[Math.floor(Math.random() * this.tasks.length)];
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
  constructor() {
    super();

    const tasks = require('../../data/tasks.json');

    tasks.forEach((task: Task) => {
      this.save(task);
    })
  }
}
