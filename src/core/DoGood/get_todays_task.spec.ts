import {DoGoodApplication} from "./application";
import {NO_TASK_FOUND} from "./response";
import {
  NullTaskGateway,
  TASK_STUB,
  TaskGateway,
  TasksGatewaySpy
} from "./task_gateway";
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

  expect(response.errorCode).toBe(NO_TASK_FOUND);
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
    taskTitle: TASK_STUB.title,
    statusCode: StatusCode.Uncompleted,
  });
});

// it('whenTaskIsSavedForToday_DoNotGetNewTask', (done) => {
//   todaysTaskGateway.save(SAVED_TASK_STUB);
//
//   application.getTodaysTask((response) => {
//     expect(response.thing).toEqual({
//       id: SAVED_TASK_STUB.id,
//       title: SAVED_TASK_STUB.title,
//       completed: false,
//     });
//     expect(taskGateway.getRandomTaskCalled).toBe(0);
//     done();
//   });
// });
// only get a new random thing after the day is over
