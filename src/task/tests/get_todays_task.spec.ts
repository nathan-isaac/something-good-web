import {DoGoodApplication, ResponseErrorCode} from "../application";
import {TaskGatewayStub} from "./gateways/gateways";
import {InMemoryUserTaskGateway, StatusCode, UserTaskGateway} from "../user_task_gateway";
import {Randomizer, RandomizerStub} from "../randomizer";
import {ColorGatewayStub} from "../gateways/color_gateway";
import {EncouragementGatewayStub} from "../gateways/encouragement_gateway";
import {ManageTasks} from "../use_cases/manage_tasks";

// sync remote tasks locally
// get local tasks

// task history gateway
// today's task gateway
  // get current()
// task - remote - local?
// color gateway
// encouragement gateway

let taskGateway: TaskGatewayStub;
let taskHistoryGateway: TaskHistoryGatewaySpy;
let todaysTaskGateway: TodaysTaskGatewaySpy;
let colorGateway: ColorGatewayStub;
let encouragementGateway: EncouragementGatewaySpy;
let manageTasks: ManageTasks;

const DEFAULT_TASK = {
  id: 100,
  title: 'example task',
};

const DEFAULT_COLOR = 'default-color';
const DEFAULT_ENCOURAGEMENT = 'default-encouragement';

beforeEach(() => {
  taskGateway = new TaskGatewayStub(DEFAULT_TASK);
  colorGateway = new ColorGatewayStub(DEFAULT_COLOR);
  encouragementGateway = new EncouragementGatewayStub(DEFAULT_ENCOURAGEMENT);
  manageTasks = new ManageTasks({
    taskGateway,
    colorGateway,
    encouragementGateway
  });
});

// 1. without today's task
it('should get new task without a today\'s task', async () => {
  const taskResponse = await manageTasks.getTodaysTask(); // currentTask(), myTask()

  expect(taskResponse).toEqual({
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    showEncouragement: false,
    completed: false,
  });

  // expect(taskHistoryGateway.saveParams).toEqual([]);
  // expect(todaysTaskGateway.saveParams).toEqual([
  //   {
  //     id: DEFAULT_TASK.id,
  //     title: DEFAULT_TASK.title,
  //     color: DEFAULT_COLOR,
  //     encouragement: DEFAULT_ENCOURAGEMENT,
  //     created_at: '2020-01-27T00:00:00' // timezone?
  //   }
  // ]);
});
// 2. with today's task and date hasn't expired
// 3. with today's task but date has expired


















// beforeEach(() => {
//   taskGateway = new TaskGatewayStub();
//   userTaskGateway = new InMemoryUserTaskGateway();
//   color_gateway = new ColorGatewayStub();
//   encouragement_gateway = new EncouragementGatewayStub();
//   application = new DoGoodApplication(taskGateway, userTaskGateway, color_gateway, encouragement_gateway);
// });

// I think this should throw an error because the intent is that there will always be a task to complete
// it('returns no task found when there are no tasks', async () => {
//   const response = await application.getTodaysTask();
//
//   expect(response.errorCode).toBe(ResponseErrorCode.NoTaskFound);
//   expect(response.task).toBe(undefined);
// });

// there are three states


// date
// already a uncompleted task history

// new to the app the should get a new task
// when they complete the task for today it should still return their completed task until the new day
// If they don't complete the task for the day it should still return their uncompleted task


// active_task, tasks, task_history

// define generic task
  // try to set task in app
  // check newly-set task
   // check that it has new activeTask properties

// getTask (from gateway)
  // getActiveTask (from activeTask gateway)
  // convertToActiveTask (from activeTaskGateway)
  
  // getTodaysTask (business logic, interfaces with current user app state)
    // might use above functions... if no task:
      // getTask
      // convertToActiveTask
      // setTodaysTask with the above activeTask
      // trigger state update


// tests the app state/storage of task
// it ('get fresh active task from taskGateway', () => {
//   color_gateway.set_color('#000000');
//   taskGateway.setRandomTask({
//     id: 1,
//     title: 'new task'
//   });
//
//   const response = await application.getTodaysTask();
//
//   // expect new task in active task gateway
//   // what about color?
//   // where do we include the encoragement
//
//   // only return what the view layer needs?
//   expect(response.activeTask).toEqual({
//     title: 'new task',
//     color: '#000000',
//     completed: true,
//     encouragement: 'You are awesome!',
//   });
//
//   const activeTasks = activeTaskGateway.all();
//
//   expect(activeTasks.length).toBe(1);
//   // saved active task
//   expect(activeTasks[0]).toEqual({
//     id: 1,
//     title: 'new task',
//     color: '#000000',
//     completedAt: new Date(),
//     retrievedAt: new Date(),
//     encouragement: undefined,
//   });
//
//
// });

// tests 
it ('sets task as activeTask in app', () => {
  // define unique, static task
  // set activeTask in app with setActiveTask()
  // retrieve activeTask from app, and verify that it’s there (has it changed?)
});

// tests task gateway
it ('gets new task from gateway', () => {
  // get new task from gateway
  // inspect for task-like appearance
});

it ('doesn’t change active task if active task is from today', () => {
  // set active task to something unique for the test (not in the gateway list)
    // set task date to today
  // run whatever code would grab a new task ???
  // check to make sure active task is the same
});

it ('changes active task if active task is not from today', () => {
  // set active task to something unique for the test (not in the gateway list)
    // set task date to yesterday
  // run whatever code would grab a new task ???
  // check to make sure active task is not the same
});

it ('tries to get a new task if no active task is set', () => {
  // leave active task unset
  // run whatever code would grab a new task ???
  // check to make sure active task is task-like
});

// fit('sets active task as a new uncompleted task if the current active task is not from today', async () => {
//   color_gateway.set_color('color');
//   taskGateway.setRandomTask({
//     id: 1,
//     title: 'Sample task'
//   });
//
//   const response = await application.getTodaysTask();
//   // const userTasks = await userTaskGateway.all();
//
//   expect(response.task).toEqual({
//     id: 1,
//     title: "Sample task",
//     color: 'color',
//     completed: false,
//   });
//   // expect(userTasks[0]).toEqual({
//   //   id: 1,
//   //   taskId: 1,
//   //   statusCode: StatusCode.Uncompleted,
//   //   color: 'color',
//   // });
// });

// it('withUncompletedSaveTask_ShowUncompletedTaskFromGateway', async () => {
//   await taskGateway.save({
//     id: 12,
//     title: 'Saved task',
//   });
//
//   await userTaskGateway.save({
//     taskId: 12,
//     statusCode: StatusCode.Uncompleted,
//   });
//
//   const response = await application.getTodaysTask();
//
//   expect(response.task).toEqual({
//     id: 12,
//     title: 'Saved task',
//     completed: false,
//   });
// });

// show completed if current day is the same as submitted day

// What if there is more than one uncompleted task?

// What if task is completed?
