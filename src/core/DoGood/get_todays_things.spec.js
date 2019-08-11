import {DoGoodApplication} from "./application";
import {NO_THINGS_FOUND} from "./response";
import {InMemoryThingsGateway} from "./gateways";

const EXAMPLE_TITLE = 'example title';

describe('get today\'s thing', () => {
  let thingsGateway;
  let application;

  beforeEach(() => {
    thingsGateway = new InMemoryThingsGateway();
    application = new DoGoodApplication(thingsGateway);
  });

  it('withNoThings_returnNoThingsFoundErrorCode', (done) => {
    application.getTodaysThing((response) => {
      expect(response.errorCode).toBe(NO_THINGS_FOUND);
      done();
    });
  });

  it('withUnCompletedThing_returnUnCompleteThing', (done) => {
    thingsGateway.addThing({
      title: EXAMPLE_TITLE,
    });

    application.getTodaysThing((response) => {
      expect(response.thing).toEqual({
        id: 1,
        title: EXAMPLE_TITLE,
        completed: false,
      });
      done();
    });
  });
});


// only get a new random thing after the day is over
