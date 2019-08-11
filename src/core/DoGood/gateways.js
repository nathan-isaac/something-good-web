
export class InMemoryThingsGateway {
  things = [];
  id = 1;

  getRandomThing() {
    return this.things[0];
  }

  addThing(attributes = {}) {
    const thing = Object.assign({
      id: this.id,
      title: 'Title',
    }, attributes);

    this.things.push(thing);

    this.id++;
  }
}
