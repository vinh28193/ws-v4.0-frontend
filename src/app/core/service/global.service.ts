import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from './encryption.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    public API_URL_BACKEND;

    constructor(public http: HttpClient, public cryCode: EncryptionService) {

    }

    /**
     * @param {string} key
     * @param {any | null} value
     */
    public encrypt(key: string, value: any | null) {
        this.cryCode.encrypt(key, value);
    }

    /**
     * @param {string} key
     * @returns {any}
     */
    public decrypt(key: string) {
        return this.cryCode.decrypt(key);
    }

    /**
     * getter
     * string Access Token
     * @returns {string}
     */
    public get accessToken(): string {
        return this.decrypt('accessToken');
    }

    /**
     * setter
     * @param {string} accessToken
     */
    public set accessToken(accessToken: string) {
        this.encrypt('accessToken', accessToken);
    }

    public get accessTokenExpire(): string {
        return this.decrypt('accessToken');
    }

    public set accessTokenExpire(accessTokenExpire: string) {
        this.encrypt('accessToken', accessTokenExpire);
    }

    public getSafeHttOptions() {
        const header = new HttpHeaders();
        header.append('Accept', 'application/json');
        return {header: header, withCredentials: true};
    }

    public getAuthHttpOptions() {
        const options = this.getSafeHttOptions();
        options.header.append('Content-Type', 'application/x-www-form-urlencoded');
        options.header.append('X-Access-Token', this.accessToken);
        return options;
    }

    getApiURl(url, fullPath = false) {
        if (fullPath) {
            return url;
        }
        return this.API_URL_BACKEND + '/' + url;
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
    }
}
