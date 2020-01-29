import {TaskGatewayStub, TaskHistoryGatewaySpy, TodaysTaskGatewaySpy} from "./gateways/gateways";
import {ColorGatewayStub} from "../gateways/color_gateway";
import {EncouragementGatewayStub} from "../gateways/encouragement_gateway";
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

  manageTasks.setTestDate(DateTime.fromISO('2020-01-27', {
    zone: 'America/Los_Angeles',
  }));
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
      created_at: '2020-01-27T00:00:00.000-08:00',
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
    created_at: '2020-01-27T00:00:00.000-08:00',
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
    created_at: '2020-01-27T00:00:00.000-08:00',
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

it('should get a new task if current task has expired', async () => {
  todaysTaskGateway.getTodaysTaskReturn = {
    id: 1000,
    title: 'todays task title',
    color: 'todays color',
    encouragement: 'todays encouragement',
    status: TaskStatus.uncompleted,
    created_at: '2020-01-26T00:00:00.000-08:00',
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
      created_at: '2020-01-27T00:00:00.000-08:00',
    }
  ]);
  expect(taskHistoryGateway.saveParams).toEqual([]);
});

// save completed task to history
// save uncompleted task to history as skipped
