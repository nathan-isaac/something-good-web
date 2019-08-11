export interface TaskGateway {
  getRandomTask(): Promise<Task|null>;
}

export interface Task {
  id: number|null,
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
}

export const TASK_STUB = {
  id: 1,
  title: 'Sample task',
};

export class TasksGatewaySpy implements TaskGateway {
  getRandomTaskCalled = 0;

  getRandomTask() {
    this.getRandomTaskCalled++;
    return Promise.resolve(TASK_STUB);
  }
}

export class NullTaskGateway implements TaskGateway {
  getRandomTask() {
    return Promise.resolve(null);
  }
}
