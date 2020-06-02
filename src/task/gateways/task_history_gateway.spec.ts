import { ArrayTaskHistoryGateway, TaskHistory, LocalStorageTaskHistoryGateway } from "./task_history_gateway";
import {DateTime} from "luxon";
import {TaskStatus} from "./todays_task_gateway";

// export type TaskHistory = {
//   id?: number,
//   task_title: string,
//   task_color: string,
//   task_encouragement: string,
//   task_status: TaskStatus,
//   created_at: DateTime,
// }

class LocalStorageSpy implements Storage {

  protected items:any = {};

  [name: string]: any;
  length: number = 0;

  clear(): void {
    this.items = {};
  }

  getItem(key: string): string | null {
    if (!this.items[key]) {
      return null;
    }

    return this.items[key];
  }

  key(index: number): string | null {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): void {
    throw new Error("Method not implemented.");
  }
  setItem(key: string, value: string): void {
    this.items[key] = value;
  }
}

// TODO: update log entry name to: event, record, entry, item

let localStorage: LocalStorageSpy;
let gateway: LocalStorageTaskHistoryGateway;

beforeEach(() => {
  localStorage = new LocalStorageSpy();
  gateway = new LocalStorageTaskHistoryGateway(localStorage);
});

it('should create the key and store taskHistory in local storage', async () => {
  const taskHistory: TaskHistory = {
    id: 3,
    task_title: "title",
    task_color: "#FF0000;",
    task_encouragement: "Be encouraged!",
    task_status: TaskStatus.completed,
    created_at: DateTime.fromISO("2020-02-11T00:12:00", {
      zone: 'America/Los_Angeles'
    }), 
  }

  await gateway.save(taskHistory);
  
  const expected = {
    id: 3,
    task_title: "title",
    task_color: "#FF0000;",
    task_encouragement: "Be encouraged!",
    task_status: 1,
    created_at: "2020-02-11T00:12:00.000-08:00", 
  };
  expect(localStorage.getItem('taskHistory'))
    .toEqual(JSON.stringify([expected]));
});

it('should create the key and store taskHistory in local storage other', async () => {
  const taskHistory: TaskHistory = {
    id: 10,
    task_title: "another title",
    task_color: "#FFFFFF;",
    task_encouragement: "Be unencouraged!",
    task_status: TaskStatus.uncompleted,
    created_at: DateTime.fromISO("2019-11-12T01:30:10", {
      zone: 'America/Los_Angeles'
    }), 
  }

  await gateway.save(taskHistory);
  
  const expected = {
    id: 10,
    task_title: "another title",
    task_color: "#FFFFFF;",
    task_encouragement: "Be unencouraged!",
    task_status: 0,
    created_at: "2019-11-12T01:30:10.000-08:00", 
  };
  expect(localStorage.getItem('taskHistory'))
    .toEqual(JSON.stringify([expected]));
});

it('should add an item to the end of the already-in-use current taskHistory object in local storage', async () => {
  localStorage.setItem('taskHistory', JSON.stringify([{}]));
  
  const taskHistory: TaskHistory = {
    id: 3,
    task_title: "title",
    task_color: "#FF0000;",
    task_encouragement: "Be encouraged!",
    task_status: TaskStatus.completed,
    created_at: DateTime.fromISO("2020-02-11T00:12:00", {
      zone: 'America/Los_Angeles'
    }), 
  }

  await gateway.save(taskHistory);
  
  let result = localStorage.getItem('taskHistory');
  
  if (!result) {
    result = '';
  }

  expect(JSON.parse(result).length).toBe(2);
});
