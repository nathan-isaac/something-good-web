import {NO_THINGS_FOUND} from "./response";

export class DoGoodApplication {

  constructor(thingsGateway) {
    this._thingsGateway = thingsGateway;
  }

  getTodaysThing(respondWith) {
    const thing = this._thingsGateway.getRandomThing();

    if (!thing) {
      return respondWith({
        errorCode: NO_THINGS_FOUND,
      });
    }

    return respondWith({
      thing: {
        id: thing.id,
        title: thing.title,
        completed: false,
      }
    });
  }
}
