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
