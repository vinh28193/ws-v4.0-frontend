export interface NotifyInterface {
    /**
     *
     */
    loading: boolean;

    notify(message): void;
}

export class BaseComponent implements NotifyInterface {
  public limit = 20;
  public page = 1;
    public loading = false;
    public store;
    public scope;

    public notify(message) {
        console.log(message);
    }
}
