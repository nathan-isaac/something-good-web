
export class ApiThingRepository {
    constructor() {
        this.endpoint = "https://things.somethinggood.app/goodThings.json";
    }

    async all() {
        return fetch(this.endpoint, {
            Accept: "application/json"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
    }
}