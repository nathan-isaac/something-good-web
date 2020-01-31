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

it('should get new task without a today\'s task', async () => {
  const taskResponse = await manageTasks.getTodaysTask();

  expect(taskResponse).toEqual({
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    showEncouragement: false,
    completed: false,
  });

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
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

it('should get saved task since date has not expired', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO('2020-01-27'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  const taskResponse = await manageTasks.getTodaysTask();

  expect(taskResponse).toEqual({
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    showEncouragement: false,
    completed: false,
  });

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

it('should get todays completed task', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.completed,
    created_at: DateTime.fromISO('2020-01-27'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  const taskResponse = await manageTasks.getTodaysTask();

  expect(taskResponse).toEqual({
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    showEncouragement: true,
    completed: true,
  });

  expect(todaysTaskGateway.saveTodaysTaskParams).toEqual([]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

it('should get a new task if current uncompleted task has expired', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO('2020-01-26'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  const taskResponse = await manageTasks.getTodaysTask();

  expect(taskResponse).toEqual({
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    showEncouragement: false,
    completed: false,
  });

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
      task_status: TaskStatus.uncompleted,
      created_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
});

it('should get a new task if current completed task has expired', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.completed,
    created_at: DateTime.fromISO('2020-01-26'),
    updated_at: DateTime.fromISO('2020-01-27'),
  };

  const taskResponse = await manageTasks.getTodaysTask();

  expect(taskResponse).toEqual({
    id: DEFAULT_TASK.id,
    title: DEFAULT_TASK.title,
    color: DEFAULT_COLOR,
    encouragement: DEFAULT_ENCOURAGEMENT,
    showEncouragement: false,
    completed: false,
  });

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
      task_status: TaskStatus.completed,
      created_at: DateTime.fromISO('2020-01-27'),
    }
  ]);
});
