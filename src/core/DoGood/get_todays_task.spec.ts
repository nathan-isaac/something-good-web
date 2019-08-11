import {DoGoodApplication} from "./application";
import {NO_TASK_FOUND} from "./response";
import {
  InMemoryTodaysTaskGateway,
  NullTaskGateway,
  SAVED_TASK_STUB,
  TASK_STUB,
  TaskGateway,
  TasksGatewaySpy
} from "./task_gateway";
import {UserTaskGateway} from "./user_task_gateway";

let taskGateway: TaskGateway;
let application: DoGoodApplication;
let userTaskGateway: UserTaskGateway;

beforeEach(() => {
  taskGateway = new TasksGatewaySpy();
  application = new DoGoodApplication(taskGateway);
});

it('withNoThings_returnNoThingsFoundErrorCode', async () => {
  taskGateway = new NullTaskGateway();
  application = new DoGoodApplication(taskGateway);

  const response = await application.getTodaysTask();

  expect(response.errorCode).toBe(NO_TASK_FOUND);
});

it('withUnCompletedThing_returnUnCompleteThing', async () => {
  const response = await application.getTodaysTask();

  expect(response.task).toEqual({
    id: TASK_STUB.id,
    title: TASK_STUB.title,
    completed: false,
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
