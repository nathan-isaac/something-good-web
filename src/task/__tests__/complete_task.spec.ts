import {DoGoodApplication, ResponseErrorCode} from "../application";
import {InMemoryTaskGateway} from "../task_gateway";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../user_task_gateway";
import {ColorGatewayStub} from "../color_gateway";
import {EncouragementGatewayStub} from "../encouragement_gateway";

let taskGateway: InMemoryTaskGateway;
let userTaskGateway: UserTaskGateway;
let application: DoGoodApplication;
let color_gateway: ColorGatewayStub;
let encouragement_gateway: EncouragementGatewayStub;


beforeEach(() => {
  taskGateway = new InMemoryTaskGateway();
  userTaskGateway = new InMemoryUserTaskGateway();
  color_gateway = new ColorGatewayStub();
  encouragement_gateway = new EncouragementGatewayStub();
  application = new DoGoodApplication(taskGateway, userTaskGateway, color_gateway, encouragement_gateway);
});

it('withNoUserTask_ReturnNotUserTaskResponseCode', async () => {
  const response = await application.completeTask();

  expect(response.errorCode).toBe(ResponseErrorCode.NoUserTaskFound);
});

it('withUserTaskButNoTasks_ReturnNoTaskResponseCode', async () => {
  await userTaskGateway.save({
    taskId: 12,
    statusCode: StatusCode.Uncompleted,
  });

  const response = await application.completeTask();

  expect(response.errorCode).toBe(ResponseErrorCode.NoTaskFound);
});

it('withUerTaskAndTask_CompleteUserTask', async () => {
  await userTaskGateway.save({
    taskId: 12,
    statusCode: StatusCode.Uncompleted,
  });

  await taskGateway.save({
    id: 12,
    title: 'Title',
  });

  const response = await application.completeTask();

  expect(response).toEqual({
    color: 'color',
    encouragement: 'encouragement',
    task: {
      id: 12,
      title: 'Title',
      completed: true,
    }
  });

  const userTasks = await userTaskGateway.all();

  expect(userTasks[0]).toEqual({
    id: 1,
    taskId: 12,
    statusCode: StatusCode.Completed,
  });
});

// what happens if the user task has only completed or skipped tasks?
