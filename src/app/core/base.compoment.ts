export interface NotifyInterface {
    /**
     *
     */
    loading: boolean;

    notify(message): void;
}

export class BaseComponent implements NotifyInterface {

    public loading = false;
    public store;
    public scope;

    public notify(message) {
        console.log(message);
    }
}
