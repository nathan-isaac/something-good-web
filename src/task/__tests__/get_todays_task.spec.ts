import {DoGoodApplication, ResponseErrorCode} from "../application";
import {TaskGatewayStub} from "./gateways";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../user_task_gateway";
import {Randomizer, RandomizerStub} from "../randomizer";
import {ColorGatewayStub} from "../color_gateway";
import {EncouragementGatewayStub} from "../encouragement_gateway";

let taskGateway: TaskGatewayStub;
let userTaskGateway: UserTaskGateway;
let application: DoGoodApplication;
let randomizer: Randomizer;
let color_gateway: ColorGatewayStub;
let encouragement_gateway: EncouragementGatewayStub;

beforeEach(() => {
  randomizer = new RandomizerStub();
  taskGateway = new TaskGatewayStub();
  userTaskGateway = new InMemoryUserTaskGateway();
  color_gateway = new ColorGatewayStub();
  encouragement_gateway = new EncouragementGatewayStub();
  application = new DoGoodApplication(taskGateway, userTaskGateway, color_gateway, encouragement_gateway);
});

it('returns no task found when there are no tasks', async () => {
  const response = await application.getTodaysTask();

  expect(response.errorCode).toBe(ResponseErrorCode.NoTaskFound);
  expect(response.task).toBe(undefined);
});

// date
// already a uncompleted task history

// new to the app the should get a new task
// when they complete the task for today it should still return their completed task until the new day
// If they don't complete the task for the day it should still return their uncompleted task


// active_task, tasks, task_history

it ('sets active task from gateway if no active task is set', () => {});

it ('doesn’t change active task if active task is from today', () => {});

fit('sets active task as a new uncompleted task if the current active task is not from today', async () => {
  color_gateway.set_color('color');
  taskGateway.setRandomTask({
    id: 1,
    title: 'Sample task'
  });

  const response = await application.getTodaysTask();
  // const userTasks = await userTaskGateway.all();

  expect(response.task).toEqual({
    id: 1,
    title: "Sample task",
    color: 'color',
    completed: false,
  });
  // expect(userTasks[0]).toEqual({
  //   id: 1,
  //   taskId: 1,
  //   statusCode: StatusCode.Uncompleted,
  //   color: 'color',
  // });
});

it('withUncompletedSaveTask_ShowUncompletedTaskFromGateway', async () => {
  await taskGateway.save({
    id: 12,
    title: 'Saved task',
  });

  await userTaskGateway.save({
    taskId: 12,
    statusCode: StatusCode.Uncompleted,
  });

  const response = await application.getTodaysTask();

  expect(response.task).toEqual({
    id: 12,
    title: 'Saved task',
    completed: false,
  });
});

// show completed if current day is the same as submitted day

// What if there is more than one uncompleted task?

// What if task is completed?
