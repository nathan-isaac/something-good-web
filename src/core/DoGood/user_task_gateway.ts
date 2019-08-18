export enum StatusCode {
  Uncompleted = 0,
  Completed = 1,
  Skipped = 2,
}

export interface UserTask {
  id?: number,
  taskId: number,
  statusCode: StatusCode,
}

export interface UserTaskGateway {
  all(): Promise<UserTask[]>;
  save(userTask: UserTask): Promise<UserTask>;
  findUncompleted(): Promise<UserTask|null>;
}

export class InMemoryUserTaskGateway implements UserTaskGateway {
  protected userTasks: UserTask[] = [];
  protected index: number = 1;

  all(): Promise<UserTask[]> {
    return Promise.resolve(this.userTasks);
  }

  findUncompleted(): Promise<UserTask|null> {
    const Uncompleted = this.userTasks.find((userTask) => {
      return userTask.statusCode === StatusCode.Uncompleted;
    });

    if (!Uncompleted) {
      return Promise.resolve(null);;
    }

    return Promise.resolve(Uncompleted);
  }

  async save(userTask: UserTask): Promise<UserTask> {
    if (!userTask.id) {
      userTask.id = this.index;
      this.index++;
    }

    const task = await this.findById(userTask.id);

    if (task) {
      Object.assign(task, userTask);
      return Promise.resolve(task);
    } else {
      const newTask = Object.assign({}, userTask);
      this.userTasks.push(newTask);
      return Promise.resolve(newTask);
    }

  }

  protected async findById(id: number): Promise<UserTask | undefined> {
    const task = this.userTasks.find(task => {
      return task.id === id;
    });

    return Promise.resolve(task);
  }
}
