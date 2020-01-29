
export enum TaskStatus {
  uncompleted,
  completed,
  skipped
}

export type TodaysTask = {
  id: number,
  title: string,
  color: string,
  encouragement: string,
  status: TaskStatus,
  created_at: string,
}

export interface TodaysTaskGateway {
  saveTodaysTask(task: TodaysTask): Promise<void>;

  getTodaysTask(): Promise<TodaysTask|undefined>;
}
