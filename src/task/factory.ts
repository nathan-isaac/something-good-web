import {MathRandomizer} from "./randomizer";
import {ArrayTaskGateway, Task} from "./gateways/task_gateway";
import {ArrayColorGateway} from "./gateways/color_gateway";
import {ArrayEncouragementGateway} from "./gateways/encouragement_gateway";
import {COLORS, ENCOURAGEMENTS} from "./config";
import {ManageTasks} from "./use_cases/manage_tasks";
import {LocalStorageTodaysTaskGateway} from "./gateways/todays_task_gateway";
import {LocalStorageTaskHistoryGateway} from "./gateways/task_history_gateway";

export class ManageTasksFactory {
  protected static instance: ManageTasks;

  static getInstance(): ManageTasks {
    if (!ManageTasksFactory.instance) {
      const taskGateway = new ArrayTaskGateway(new MathRandomizer());

      const tasks = require('../data/tasks.json');

      tasks.forEach((task: Task) => {
        taskGateway.addTask({
          id: task.id,
          title: task.title,
        });
      });

      const todaysTaskGateway = new LocalStorageTodaysTaskGateway(window.localStorage);
      const taskHistoryGateway = new LocalStorageTaskHistoryGateway(window.localStorage);
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
