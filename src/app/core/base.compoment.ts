export interface ApplicationInterface {
    notify(message);
}

export class BaseComponent implements ApplicationInterface {

    public store;
    public scope;

    public notify(message) {
        console.log(message);
    }
}
