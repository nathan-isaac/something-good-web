import {DoGoodApplication, ResponseErrorCode} from "./application";
import {NullTaskGateway, TASK_STUB, TaskGateway, TasksGatewaySpy} from "./task_gateway";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "./user_task_gateway";

let taskGateway: TaskGateway;
let application: DoGoodApplication;
let userTaskGateway: UserTaskGateway;

beforeEach(() => {
  taskGateway = new TasksGatewaySpy();
  userTaskGateway = new InMemoryUserTaskGateway();
  application = new DoGoodApplication(taskGateway, userTaskGateway);
});

it('withNoTasks_returnNoTasksFoundErrorCode', async () => {
  taskGateway = new NullTaskGateway();
  application = new DoGoodApplication(taskGateway, userTaskGateway);

  const response = await application.getTodaysTask();

  expect(response.errorCode).toBe(ResponseErrorCode.NoTaskFound);
});

it('withUnCompletedTask_returnUnCompleteTask', async () => {
  const response = await application.getTodaysTask();

  expect(response.task).toEqual({
    id: TASK_STUB.id,
    title: TASK_STUB.title,
    completed: false,
  });

  const userTasks = await userTaskGateway.all();

  expect(userTasks[0]).toEqual({
    id: 1,
    taskId: TASK_STUB.id,
    statusCode: StatusCode.Uncompleted,
  });
});

// it('withUncompletedSaveTask_ShowUncompletedTaskFromGateway', async () => {
//   userTaskGateway.save({
//     taskId: 12,
//     taskTitle: 'Title',
//     statusCode: StatusCode.Uncompleted,
//   });
//
//   const response = await application.getTodaysTask();
//
//   expect(response.thing).toEqual({
//     id: SAVED_TASK_STUB.id,
//     title: SAVED_TASK_STUB.title,
//     completed: false,
//   });
//   expect(taskGateway.getRandomTaskCalled).toBe(0);
// });

// show completed if current day is the same as submitted day
