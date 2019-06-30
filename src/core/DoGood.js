

export class DoGood {
    getTodaysThing(callback) {
        callback({
            title: 'from do good'
        });
    }

    completeThing(callback) {
        callback();
    }

    skipThing(callback) {
        callback();
    }
}