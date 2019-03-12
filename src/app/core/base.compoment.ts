export interface NotifyInterface {
    notify(message);
}

export class BaseComponent implements NotifyInterface {

  public limit = 20;
  public page = 1;

    public store;
    public scope;
    public notify(message) {
        console.log(message);
    }
}
