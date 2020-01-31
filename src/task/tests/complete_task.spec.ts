import {
  ColorGatewayStub,
  EncouragementGatewayStub,
  TaskGatewayStub,
  TaskHistoryGatewaySpy,
  TodaysTaskGatewaySpy
} from "./gateways_test_doubles";
import {ManageTasks} from "../use_cases/manage_tasks";
import {DateTime} from "luxon";
import {TaskStatus} from "../gateways/todays_task_gateway";

let taskGateway: TaskGatewayStub;
let taskHistoryGateway: TaskHistoryGatewaySpy;
let todaysTaskGateway: TodaysTaskGatewaySpy;
let colorGateway: ColorGatewayStub;
let encouragementGateway: EncouragementGatewayStub;
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
  taskHistoryGateway = new TaskHistoryGatewaySpy();
  todaysTaskGateway = new TodaysTaskGatewaySpy();
  manageTasks = new ManageTasks({
    taskGateway,
    colorGateway,
    encouragementGateway,
    taskHistoryGateway,
    todaysTaskGateway,
  });

  manageTasks.setTestDate(DateTime.fromISO('2020-01-27'));
});

// complete with no today's task. should this return a failure message or just return the new task for the day?
it('should not complete task if there is no todays task', async () => {
  await manageTasks.completeTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

// complete with today's task
it('should complete task if there is a todays task', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO('2020-01-27'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  await manageTasks.completeTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([
    {
      id: DEFAULT_TASK.id,
      title: DEFAULT_TASK.title,
      color: DEFAULT_COLOR,
      encouragement: DEFAULT_ENCOURAGEMENT,
      status: TaskStatus.completed,
      created_at: DateTime.fromISO('2020-01-27'),
      updated_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

// complete a task for the previous day
it('should complete task if there is todays task set for the previous day', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO('2020-01-26'),
    updated_at: DateTime.fromISO('2020-01-26'),
  };

  await manageTasks.completeTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([
    {
      id: DEFAULT_TASK.id,
      title: DEFAULT_TASK.title,
      color: DEFAULT_COLOR,
      encouragement: DEFAULT_ENCOURAGEMENT,
      status: TaskStatus.completed,
      created_at: DateTime.fromISO('2020-01-26'),
      updated_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});
