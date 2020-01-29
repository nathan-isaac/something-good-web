
export type TaskHistory = {

}

export interface TaskHistoryGateway {
  save(task: TaskHistory): Promise<void>;
}
