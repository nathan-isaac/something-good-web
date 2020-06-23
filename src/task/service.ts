import {TaskGateway, TaskGeneratorGateway} from "./gateways/task";
import {DateTime} from "luxon";

export type TaskResponse = {
  id: string,
  title: string,
  color: string,
  encouragement: string,
  showEncouragement: boolean,
  completed: boolean,
};

export class TaskService {
  constructor(protected taskGateway: TaskGateway, protected taskGenerator: TaskGeneratorGateway) {}

  async getTaskForToday(): Promise<TaskResponse> {
    let task = await this.taskGateway.findLatest();

    if (!task || "if day is less than task created_at") {
      const newTask = await this.taskGenerator.generate();
      task = await this.taskGateway.create(newTask.title, newTask.color, newTask.encouragement);
    }

    return Promise.resolve({
      id: task.id,
      title: task.title,
      color: task.color,
      encouragement: task.encouragement,
      showEncouragement: !!task.completed_at,
      completed: !!task.completed_at,
    });
  }

  async completeTask(): Promise<void> {
    const task = await this.taskGateway.findLatest();

    await this.taskGateway.complete(task.id)
    const todaysTask = await this.todaysTaskGateway.getTodaysTask();

    if (todaysTask) {
      todaysTask.status = TaskStatus.completed;
      todaysTask.updated_at = this.getCurrentDateTime();
      await this.todaysTaskGateway.saveTodaysTask(todaysTask);
    }

    return Promise.resolve();
  }

  async skipTask(): Promise<void> {
    const todaysTask = await this.todaysTaskGateway.getTodaysTask();

    if (!todaysTask || todaysTask.status === TaskStatus.completed) {
      return Promise.resolve();
    }

    await this.taskHistoryGateway.save({
      task_title: todaysTask.title,
      task_color: todaysTask.color,
      task_encouragement: todaysTask.encouragement,
      task_status: TaskStatus.skipped,
      created_at: this.getCurrentDateTime(),
    });

    const newTask = await this.getNewTask();
    await this.todaysTaskGateway.saveTodaysTask(newTask);

    return Promise.resolve();
  }
}
