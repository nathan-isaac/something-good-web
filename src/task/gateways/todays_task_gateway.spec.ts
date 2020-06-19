import { TodaysTask, LocalStorageTodaysTaskGateway, TodaysTaskGateway } from "./todays_task_gateway";
import {DateTime} from "luxon";
import {TaskStatus} from "./todays_task_gateway";
import {LocalStorageSpy} from "../tests/helpers";

let localStorage: LocalStorageSpy;
let gateway: LocalStorageTodaysTaskGateway;

beforeEach(() => {
  localStorage = new LocalStorageSpy();
  gateway = new LocalStorageTodaysTaskGateway(localStorage);
});

describe('saveTodaysTask()', () => {
  it('should create the key and serialize todaysTask to local storage', async () => {
    const todaysTask: TodaysTask = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: TaskStatus.completed,
      created_at: DateTime.fromISO("2020-02-11T00:12:00"),
      updated_at: DateTime.fromISO("2020-02-11T00:12:00")
    }
  
    await gateway.saveTodaysTask(todaysTask);
    
    const expected = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: 1,
      created_at: "2020-02-11T00:12:00.000",
      updated_at: "2020-02-11T00:12:00.000",
    }
    expect(localStorage.getItem('todaysTask'))
      .toEqual(JSON.stringify(expected));
  });
  
})

describe('getTodaysTask()', () => {
  it('should return undefined if nothing is stored in local storage', async () => {
    expect(await gateway.getTodaysTask())
      .toBeUndefined();
  });

  it('should create the key and serialize todaysTask to local storage', async () => {
    const todaysTask = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: 1,
      created_at: "2020-02-11T00:12:00.000",
      updated_at: "2020-02-11T00:12:00.000",
    }
    localStorage.setItem('todaysTask', JSON.stringify(todaysTask))
  
    const expected: TodaysTask = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: TaskStatus.completed,
      created_at: DateTime.fromISO("2020-02-11T00:12:00"),
      updated_at: DateTime.fromISO("2020-02-11T00:12:00")
    }

    expect(await gateway.getTodaysTask())
      .toEqual(expected);
  });
  
})
