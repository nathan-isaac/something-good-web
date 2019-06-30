

export class DoGood {
    constructor(thingRepository) {
        this._thingRepository = thingRepository;
        this._things = [];
        this._todaysThing = {
            title: null,
            completed: false,
        };
        this._completedThings = [];
        this._onChange = () => {};
    }

    subscribe(callback) {
        this._onChange = callback;
    }

    fetchTodaysThing(callback) {
        this._thingRepository.all()
            .then(things => {
                this._things = things;
                this._setTodaysThing(this._things[0]);
                callback();
            });
    }

    completeThing(callback) {
        this._todaysThing.completed = true;
        this._completedThings.push({
            title: this._todaysThing.title,
            completedAt: new Date(),
        });
        this._updateViewModal();
        callback();
    }

    skipThing(callback) {
        callback();
    }

    _setTodaysThing(thing) {
        this._todaysThing = thing;
        this._updateViewModal();
    }

    _updateViewModal() {
        const completedThings = this._completedThings.map(thing => {
            return {
                title: thing.title,
                completedAt: thing.completedAt.toDateString(),
            }
        });

        this._onChange({
            todaysThing: {
                title: this._todaysThing.title,
                completed: this._todaysThing.completed,
            },
            completedThings: completedThings,
        });
    }
}