import {DoGoodApplication, ResponseErrorCode} from "../application";
import {InMemoryTaskGateway} from "../task_gateway";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../user_task_gateway";
import {RandomizerStub} from "../randomizer";
import {ColorGatewayStub} from "../color_gateway";
import {EncouragementGatewayStub} from "../encouragement_gateway";

let taskGateway: InMemoryTaskGateway;
let userTaskGateway: UserTaskGateway;
let application: DoGoodApplication;
let randomizer: RandomizerStub;
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

it('withNoUserTask_ReturnNotUserTaskResponseCode', async () => {
  const response = await application.skipTask();

  expect(response).toEqual({
    errorCode: ResponseErrorCode.NoUserTaskFound
  });
});

it('withUserTaskButNoTasks_ReturnNoTaskResponseCode', async () => {
  await userTaskGateway.save({
    taskId: 12,
    statusCode: StatusCode.Uncompleted,
  });

  const response = await application.skipTask();

  expect(response).toEqual({
    errorCode: ResponseErrorCode.NoTaskFound
  });
});

it('withUserTaskAndTask_SkipUserTask', async () => {
  randomizer.randomIndex = 1;
  
  await userTaskGateway.save({
    taskId: 12,
    statusCode: StatusCode.Uncompleted,
  });

  await taskGateway.save({
    id: 12,
    title: 'Title',
  });
  await taskGateway.save({
    id: 13,
    title: 'Other Title',
  });

  const response = await application.skipTask();

  expect(response).toEqual({
    color: 'color',
    encouragement: 'encouragement',
    task: {
      id: 13,
      title: 'Other Title',
      completed: false,
    }
  });

  const userTasks = await userTaskGateway.all();

  expect(userTasks[0]).toEqual({
    id: 1,
    taskId: 12,
    statusCode: StatusCode.Skipped,
  });
  expect(userTasks[1]).toEqual({
    id: 2,
    taskId: 13,
    statusCode: StatusCode.Uncompleted,
  });
  expect(userTasks.length).toBe(2);
});

// what happens if the user task has only completed or skipped tasks?
