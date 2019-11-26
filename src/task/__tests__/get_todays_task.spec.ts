import {DoGoodApplication, ResponseErrorCode} from "../application";
import {InMemoryTaskGateway} from "../task_gateway";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../user_task_gateway";
import {Randomizer, RandomizerStub} from "../randomizer";
import {ColorGatewayStub} from "../color_gateway";
import {EncouragementGatewayStub} from "../encouragement_gateway";

let taskGateway: InMemoryTaskGateway;
let userTaskGateway: UserTaskGateway;
let application: DoGoodApplication;
let randomizer: Randomizer;
let color_gateway: ColorGatewayStub;
let encouragement_gateway: EncouragementGatewayStub;

beforeEach(() => {
  randomizer = new RandomizerStub();
  taskGateway = new InMemoryTaskGateway(randomizer);
  userTaskGateway = new InMemoryUserTaskGateway();
  color_gateway = new ColorGatewayStub();
  encouragement_gateway = new EncouragementGatewayStub();
  application = new DoGoodApplication(taskGateway, userTaskGateway, color_gateway, encouragement_gateway);
});

it('withNoTasks_returnNoTasksFoundErrorCode', async () => {
  const response = await application.getTodaysTask();

  expect(response.errorCode).toBe(ResponseErrorCode.NoTaskFound);
});

it('withUnCompletedTask_returnUnCompleteTask', async () => {
  color_gateway.set_color('color');
  await taskGateway.save({
    id: 1,
    title: "Sample task"
  });

  const response = await application.getTodaysTask();
  const userTasks = await userTaskGateway.all();

  expect(response.task).toEqual({
    id: 1,
    title: "Sample task",
    completed: false,
  });
  expect(response.color).toBe('color');
  expect(userTasks[0]).toEqual({
    id: 1,
    taskId: 1,
    statusCode: StatusCode.Uncompleted,
  });
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
