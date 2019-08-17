import {DoGoodApplication, ResponseErrorCode} from "../DoGood/application";
import {InMemoryTaskGateway} from "../DoGood/task_gateway";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../DoGood/user_task_gateway";

let taskGateway: InMemoryTaskGateway;
let userTaskGateway: UserTaskGateway;
let application: DoGoodApplication;

beforeEach(() => {
  taskGateway = new InMemoryTaskGateway();
  userTaskGateway = new InMemoryUserTaskGateway();
  application = new DoGoodApplication(taskGateway, userTaskGateway);
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
