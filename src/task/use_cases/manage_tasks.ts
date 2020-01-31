import {TaskGateway} from "../gateways/task_gateway";
import {ColorGateway} from "../gateways/color_gateway";
import {EncouragementGateway} from "../gateways/encouragement_gateway";
import {DateTime} from "luxon";
import {TaskStatus, TodaysTask, TodaysTaskGateway} from "../gateways/todays_task_gateway";
import {TaskHistoryGateway} from "../gateways/task_history_gateway";

export type TaskResponse = {
  id: number,
  title: string,
  color: string,
  encouragement: string,
  showEncouragement: boolean,
  completed: boolean,
};

export type ManageTaskConfig = {
  taskGateway: TaskGateway,
  colorGateway: ColorGateway,
  encouragementGateway: EncouragementGateway,
  todaysTaskGateway: TodaysTaskGateway,
  taskHistoryGateway: TaskHistoryGateway,
}

export class ManageTasks {
  protected taskGateway: TaskGateway;
  protected colorGateway: ColorGateway;
  protected encouragementGateway: EncouragementGateway;
  protected taskHistoryGateway: TaskHistoryGateway;
  protected todaysTaskGateway: TodaysTaskGateway;
  protected testDateTime: DateTime | undefined;

  constructor(config: ManageTaskConfig) {
    this.taskGateway = config.taskGateway;
    this.colorGateway = config.colorGateway;
    this.encouragementGateway = config.encouragementGateway;
    this.taskHistoryGateway = config.taskHistoryGateway;
    this.todaysTaskGateway = config.todaysTaskGateway;
  }

  async getTodaysTask(): Promise<TaskResponse> {
    const todaysTask = await this.getSavedOrNewTask();

    return Promise.resolve({
      id: todaysTask.id,
      title: todaysTask.title,
      color: todaysTask.color,
      encouragement: todaysTask.encouragement,
      showEncouragement: todaysTask.status == TaskStatus.completed,
      completed: todaysTask.status == TaskStatus.completed,
    });
  }

  protected async getSavedOrNewTask(): Promise<TodaysTask> {
    const todaysTask = await this.todaysTaskGateway.getTodaysTask();

    if (todaysTask && todaysTask.created_at.hasSame(this.getCurrentDateTime(),'day')) {
      return Promise.resolve(todaysTask);
    }

    if (todaysTask && ! todaysTask.created_at.hasSame(this.getCurrentDateTime(),'day')) {
      await this.taskHistoryGateway.save({
        task_title: todaysTask.title,
        task_color: todaysTask.color,
        task_encouragement: todaysTask.encouragement,
        task_status: todaysTask.status,
        created_at: this.getCurrentDateTime(),
      });
    }

    const newTodaysTask = await this.getNewTask();

    await this.todaysTaskGateway.saveTodaysTask(newTodaysTask);

    return Promise.resolve(newTodaysTask);
  }

  async completeTodaysTask(): Promise<void> {
    const todaysTask = await this.todaysTaskGateway.getTodaysTask();

    if (todaysTask) {
      todaysTask.status = TaskStatus.completed;
      todaysTask.updated_at = this.getCurrentDateTime();
      await this.todaysTaskGateway.saveTodaysTask(todaysTask);
    }

    return Promise.resolve();
  }

  async skipTodaysTask(): Promise<void> {
    const todaysTask = await this.todaysTaskGateway.getTodaysTask();

    if (!todaysTask || todaysTask.status == TaskStatus.completed) {
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

  protected async getNewTask(): Promise<TodaysTask> {
    const randomTask = await this.taskGateway.getRandomTask();
    const randomColor = await this.colorGateway.getRandomColor();
    const randomEncouragement = await this.encouragementGateway.getRandomEncouragement();

    return Promise.resolve({
      id: randomTask.id,
      title: randomTask.title,
      color: randomColor,
      encouragement: randomEncouragement,
      status: TaskStatus.uncompleted,
      created_at: this.getCurrentDateTime(),
      updated_at: this.getCurrentDateTime(),
    });
  }

  getCurrentDateTime(): DateTime {
    if (this.testDateTime) {
      return this.testDateTime;
    }

    return DateTime.local();
  }

  setTestDate(dateTime: DateTime) {
    this.testDateTime = dateTime;
  }
}
