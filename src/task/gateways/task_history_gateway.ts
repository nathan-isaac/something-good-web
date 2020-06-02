import {TaskStatus} from "./todays_task_gateway";
import {DateTime} from "luxon";

export type TaskHistory = {
  id?: number,
  task_title: string,
  task_color: string,
  task_encouragement: string,
  task_status: TaskStatus,
  created_at: DateTime,
}

export interface TaskHistoryGateway {
  save(task: TaskHistory): Promise<void>;
}

export class ArrayTaskHistoryGateway implements TaskHistoryGateway {
  save(task: TaskHistory): Promise<void> {
    return Promise.resolve();
  }
}

export class LocalStorageTaskHistoryGateway implements TaskHistoryGateway {
  protected localStorage: Storage

  constructor(localStorage: Storage) {
    this.localStorage = localStorage
  }

  async save(task: TaskHistory): Promise<void> {
    const history = await this.retrieve();

    history.push(task);

    const historyString = history.map((item) => {
      return {
        id: item.id,
        task_title: item.task_title,
        task_color: item.task_color,
        task_encouragement: item.task_encouragement,
        task_status: item.task_status,
        created_at: item.created_at.toISO()
      }
    });

    this.localStorage.setItem('taskHistory', JSON.stringify(historyString));
  }

  async retrieve(): Promise<TaskHistory[]> {
    const historyString = this.localStorage.getItem('taskHistory');

    if (!historyString) {
      return [];
    }

    return JSON.parse(historyString).map((item: any) => {
      return {
        id: item.id,
        task_title: item.task_title,
        task_color: item.task_color,
        task_encouragement: item.task_encouragement,
        task_status: item.task_status,
        created_at: DateTime.fromISO(item.created_at)
      }
    });
  }
}
