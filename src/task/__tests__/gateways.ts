import { TaskGateway, Task } from "../task_gateway";

export class TaskGatewayStub implements TaskGateway {
  protected randomTask: Task|undefined;
  protected tasks: Task[] = [];

  getRandomTask(): Promise<Task|undefined> {
    return Promise.resolve(this.randomTask);
  }

  findById(taskId: number): Promise<Task|undefined> {
    const task = this.tasks.find(task => {
      return task.id === taskId;
    });

    return Promise.resolve(task);
  }

  setRandomTask(task: Task) {
    this.randomTask = task;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}