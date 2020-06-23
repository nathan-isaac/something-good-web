import {TaskStatus} from "./gateways/todaysTask";
import {DateTime} from "luxon";
import {TaskService} from "./service";
import {ArrayTaskGateway, NewTask, TaskGateway, TaskGeneratorGateway} from "./gateways/task";

class TaskGeneratorStub implements TaskGeneratorGateway {
  constructor(protected newTask: NewTask) {}
  generate(): Promise<NewTask> {
    return Promise.resolve(this.newTask);
  }
}

const newTask: NewTask = {
  title: 'TASK TITLE',
  color: 'TASK COLOR',
  encouragement: 'TASK ENCOURAGEMENT',
};
let service: TaskService
let taskGenerator: TaskGeneratorGateway
let taskGateway: TaskGateway

beforeEach(() => {
  taskGenerator = new TaskGeneratorStub(newTask);
  taskGateway = new ArrayTaskGateway()
  service = new TaskService(taskGateway, taskGenerator);
})

describe('getTaskForDay', () => {
  it('should generate new task when no tasks exist', async () => {
    const response = await service.getTaskForDate(DateTime.fromISO('2020-01-20'));

    expect(taskGateway.all().length).toBe(1)
  });

  it('should get new task without a today\'s task', async () => {

  });

  it('should get saved task since date has not expired', async () => {

  });

  it('should get todays completed task', async () => {

  });

  it('should get a new task if current uncompleted task has expired', async () => {

  });

  it('should get a new task if current completed task has expired', async () => {

  });
});

describe('completeTask', () => {
  // complete with no today's task. should this return a failure message or just return the new task for the day?
  it('should not complete task if there is no todays task', async () => {

  });

  // complete with today's task
  it('should complete task if there is a todays task', async () => {

  });

  // complete a task for the previous day
  it('should complete task if there is todays task set for the previous day', async () => {

  });
})

describe('skipTask', () => {
  it('should not skip task if there is no todays task', async () => {

  });

  it('should skip uncompleted task', async () => {

  });

  it('should not skip completed task', async () => {

  });
})
