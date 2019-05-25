import {GlobalService} from './service/global.service';
import {NotifierService} from 'angular-notifier';

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
    public enableLoading = true;
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
    startLoading() {
        if (this.enableLoading) {
            $('#loading').css('display', 'block');
        }
    }
    endLoading() {
        $('#loading').css('display', 'none');
    }

    getParameter(param, defaultValue = null) {
        const getValues = location.search.substr(1).split('&');
        $.each(getValues, function (k, v) {
            const key = v.substring(v.indexOf('='), 0);
            const value = v.substring(v.indexOf('=') + 1, v.length);
            if (key === param) {
                defaultValue = value;
            }
        });
        return defaultValue;
    }

    copyText(val: string, notifierS: NotifierService) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        notifierS.notify('success', 'Copy text ' + val);
    }
}
