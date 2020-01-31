import {MathRandomizer} from "./randomizer";
import {LocalJsonTaskGateway} from "./gateways/task_gateway";
import {ArrayColorGateway} from "./gateways/color_gateway";
import {ArrayEncouragementGateway} from "./gateways/encouragement_gateway";
import {COLORS, ENCOURAGEMENTS} from "./config";
import {ManageTasks} from "./use_cases/manage_tasks";
import {ArrayTodaysTaskGateway} from "./gateways/todays_task_gateway";
import {ArrayTaskHistoryGateway} from "./gateways/task_history_gateway";

export class ManageTasksFactory {
  protected static instance: ManageTasks;

  static getInstance(): ManageTasks {
    if (!ManageTasksFactory.instance) {
      const taskGateway = new LocalJsonTaskGateway(new MathRandomizer());
      const todaysTaskGateway = new ArrayTodaysTaskGateway();
      const taskHistoryGateway = new ArrayTaskHistoryGateway();
      const colorGateway = new ArrayColorGateway(COLORS, new MathRandomizer());
      const encouragementGateway = new ArrayEncouragementGateway(ENCOURAGEMENTS, new MathRandomizer());

      ManageTasksFactory.instance = new ManageTasks({
        taskGateway,
        todaysTaskGateway,
        taskHistoryGateway,
        colorGateway,
        encouragementGateway,
      });
    }

    return ManageTasksFactory.instance;
  }
}
