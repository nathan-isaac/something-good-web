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
    // const history = await this.retrieve();

    // history.push(task);

    this.localStorage.setItem('taskHistory', JSON.stringify([{
      id: 3, 
      task_title: task.task_title,
      task_color: task.task_color,
      task_encouragement: task.task_encouragement,
      task_status: task.task_status,
      created_at: task.created_at.toISO()
    }]));
  }

  // async retrieve(): Promise<TaskHistory[]> {
  //   const historyString = window.localStorage.getItem('taskHistory');

  //   if (!historyString) {
  //     return [];
  //   }

  //   return JSON.parse(historyString);
  // }
}
