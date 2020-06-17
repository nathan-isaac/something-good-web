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
      created_at: DateTime.fromISO("2020-02-11T00:12:00", {
        zone: 'America/Los_Angeles'
      }),
      updated_at: DateTime.fromISO("2020-02-11T00:12:00", {
        zone: 'America/Los_Angeles'
      })
    }
  
    await gateway.saveTodaysTask(todaysTask);
    
    const expected = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: 1,
      created_at: "2020-02-11T00:12:00.000-08:00",
      updated_at: "2020-02-11T00:12:00.000-08:00",
    }
    expect(localStorage.getItem('todaysTask'))
      .toEqual(JSON.stringify(expected));
  });
  
})

describe('getTodaysTask()', () => {
  it('should create the key and serialize todaysTask to local storage', async () => {
    const todaysTask = {
      id: 3,
      title: "title",
      color: "#FF0000;",
      encouragement: "Be encouraged!",
      status: 1,
      created_at: "2020-02-11T00:12:00.000-08:00",
      updated_at: "2020-02-11T00:12:00.000-08:00",
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


// saveTodaysTask(todaysTask: TodaysTask)
// getTodaysTask()

