export interface NotifyInterface {
    notify(message);
}

export class BaseComponent implements NotifyInterface {

    public store;
    public scope;
    public notify(message) {
        console.log(message);
    }
}
