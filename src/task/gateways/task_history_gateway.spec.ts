import { ArrayTaskHistoryGateway, TaskHistory, LocalStorageTaskHistoryGateway, TaskHistoryGateway } from "./task_history_gateway";
import {DateTime} from "luxon";
import {TaskStatus} from "./todays_task_gateway";
import {LocalStorageSpy} from "../tests/helpers";

// export type TaskHistory = {
//   id?: number,
//   task_title: string,
//   task_color: string,
//   task_encouragement: string,
//   task_status: TaskStatus,
//   created_at: DateTime,
// }

// TODO: update log entry name to: event, record, entry, item

let localStorage: LocalStorageSpy;
let gateway: LocalStorageTaskHistoryGateway;

beforeEach(() => {
  localStorage = new LocalStorageSpy();
  gateway = new LocalStorageTaskHistoryGateway(localStorage);
});

it('should create the key and store taskHistory in local storage', async () => {
  const taskHistory: TaskHistory = {
    id: 35763,
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
    id: 35763,
    task_title: "title",
    task_color: "#FF0000;",
    task_encouragement: "Be encouraged!",
    task_status: 1,
    created_at: "2020-02-11T00:12:00.000-08:00", 
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
