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

let localStorage: LocalStorageSpy;
let gateway: LocalStorageTaskHistoryGateway;

beforeEach(() => {
  localStorage = new LocalStorageSpy();
  gateway = new LocalStorageTaskHistoryGateway(localStorage);
});

it.only('should create the key and store taskHistory in local storage', async () => {
  const taskHistory: TaskHistory = {
    id: 3,
    task_title: "title",
    task_color: "#FF0000;",
    task_encouragement: "Be encouraged!",
    task_status: TaskStatus.completed,
    created_at: DateTime.fromISO("2020-02-11T00:12:00"), // TODO: fix timezone
  }  

  await gateway.save(taskHistory);
  
  expect(localStorage.getItem('taskHistory'))
    .toEqual('[{"id":3,"task_title":"title","task_color":"#FF0000;","task_encouragement":"Be encouraged!","task_status":1,"created_at":"2020-02-11T00:12:00.000-08:00"}]');
});

it('should add an item to the end of the empty current taskHistory object in local storage', () => {
  expect(true).toBe(false);
});

it('should add an item to the end of the already-in-use current taskHistory object in local storage', () => {
  expect(true).toBe(false);
});

// it('should retrieve current taskHistory object from local storage', () => {
//   expect(true).toBe(false);
// });

// not local storage key
// it should save task history with no local storage key

// local storage with empty array
// it should save task history with no local storage key


// local storage with an existing history item
