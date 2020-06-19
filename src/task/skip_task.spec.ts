import {
  ColorGatewayStub,
  EncouragementGatewayStub,
  TaskGatewayStub,
  TaskHistoryGatewaySpy,
  TodaysTaskGatewaySpy
} from "./gateways_test_doubles";
import {ManageTasks} from "./service";
import {DateTime} from "luxon";
import {TaskStatus} from "./gateways/todaysTask";

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

it('should not skip task if there is no todays task', async () => {
  await manageTasks.skipTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

// skip uncompleted task
it('should skip uncompleted task', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO('2020-01-26'),
    updated_at: DateTime.fromISO('2020-01-26'),
  };

  await manageTasks.skipTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([
    {
      id: DEFAULT_TASK.id,
      title: DEFAULT_TASK.title,
      color: DEFAULT_COLOR,
      encouragement: DEFAULT_ENCOURAGEMENT,
      status: TaskStatus.uncompleted,
      created_at: DateTime.fromISO('2020-01-27'),
      updated_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
  expect(taskHistoryGateway.saveParams).toEqual([
    {
      task_title: 'todays task title',
      task_color: 'todays color',
      task_encouragement: 'todays encouragement',
      task_status: TaskStatus.skipped,
      created_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
});

// don't skip completed task
it('should not skip completed task', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    status: TaskStatus.completed,
    created_at: DateTime.fromISO('2020-01-27'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  await manageTasks.skipTodaysTask();

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});
