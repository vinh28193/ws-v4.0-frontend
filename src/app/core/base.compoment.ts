import {GlobalService} from './service/global.service';

export interface NotifyInterface {
    /**
     * loading ?
     */
    loading: boolean;

    /**
     * say notification
     * @param message
     */
    notify(message): void;
}

export class BaseComponent implements NotifyInterface {

    /**
     * @inheritDoc
     * @type {boolean}
     */
    public loading = false;

    /**
     * @inheritDoc
     * @param message
     */
    public notify(message) {
        console.log(message);
    }

    /**
     * constructor object
     * @param {GlobalService} httpClient
     */
    constructor(public httpClient: GlobalService) {

    }

    /**
     * string current scope
     * getter
     * @returns {string}
     */
    public get scope(): string {
        return this.httpClient.scope;
    }

    /**
     * setter
     * @param {string} scope
     */
    public set scope(scope: string) {
        this.httpClient.scope = scope;
    }

    /**
     * setter
     * @param {string | number} store
     */
    public set store(store: string) {
        let storeAlias = 'All';
        switch (Number(store)) {
            case 1:
                storeAlias = 'VN';
                break;
            case 2:
                storeAlias = 'ID';
                break;
        }
        this.httpClient.encrypt('storeAlias', storeAlias);
    }

    /**
     * getter
     * @returns {string}
     */
    public get store(): string {
        return this.httpClient.decrypt('storeAlias');
    }

    /**
     * current user login
     * getter
     * @returns {any}
     */
    public get identity(): any {
        return this.httpClient.identity;
    }

    /**
     * setter
     * @param {any | null} identity
     */
    public set identity(identity: any | null) {
        this.httpClient.identity = identity;
    }

    checkAdminAccess() {
        return this.scope === 'superAdmin';
    }
}
