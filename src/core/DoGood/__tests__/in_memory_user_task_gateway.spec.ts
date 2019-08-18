import {InMemoryUserTaskGateway, StatusCode} from "../user_task_gateway";

let gateway: InMemoryUserTaskGateway;

beforeEach(() => {
  gateway = new InMemoryUserTaskGateway();
});

it('withNoUserTasks_returnEmptyArray', async () => {
  const tasks = await gateway.all();

  expect(tasks).toEqual([]);
});

it('withOnTask_returnTask', async () => {
  await gateway.save({
    taskId: 1,
    statusCode: StatusCode.Uncompleted,
  });

  const tasks = await gateway.all();

  expect(tasks).toEqual([
    {
      id: 1,
      taskId: 1,
      statusCode: StatusCode.Uncompleted
    }
  ]);
});

it('saveExistingTask_updateExistingTask', async () => {
  await gateway.save({
    taskId: 1,
    statusCode: StatusCode.Uncompleted,
  });
  await gateway.save({
    id: 1,
    taskId: 1,
    statusCode: StatusCode.Skipped,
  });

  const tasks = await gateway.all();

  expect(tasks).toEqual([
    {
      id: 1,
      taskId: 1,
      statusCode: StatusCode.Skipped
    }
  ]);
});
