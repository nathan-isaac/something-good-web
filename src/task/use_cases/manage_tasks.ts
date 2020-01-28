import {TaskGateway} from "../gateways/task_gateway";
import {ColorGateway} from "../gateways/color_gateway";
import {EncouragementGateway} from "../gateways/encouragement_gateway";

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
}

export class ManageTasks {
  protected taskGateway: TaskGateway;
  protected colorGateway: ColorGateway;
  protected encouragementGateway: EncouragementGateway;

  constructor(config: ManageTaskConfig) {
    this.taskGateway = config.taskGateway;
    this.colorGateway = config.colorGateway;
    this.encouragementGateway = config.encouragementGateway;
  }

  async getTodaysTask(): Promise<TaskResponse> {
    const randomTask = await this.taskGateway.getRandomTask();
    const randomColor = await this.colorGateway.getRandomColor();
    const randomEncouragement = await this.encouragementGateway.getRandomEncouragement();

    return Promise.resolve({
      id: randomTask.id,
      title: randomTask.title,
      color: randomColor,
      encouragement: randomEncouragement,
      showEncouragement: false,
      completed: false
    });
  }
}
