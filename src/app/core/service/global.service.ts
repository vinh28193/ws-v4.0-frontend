import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from './encryption.service';
import {environment} from '../../../environments/environment.prod';
import {isArray, isString} from 'util';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    /**
     * string api base url
     */
    public API_URL_BACKEND;

    public OAUTH_URL;

    public enableLoading = true;

    /**
     * constructor service
     * @param {EncryptionService} cryCode
     */
    constructor(public cryCode: EncryptionService) {
        this.API_URL_BACKEND = environment['API_URL_BACKEND'];
        this.OAUTH_URL = environment['OAUTH_URL'];
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
    public decrypt(key: string): string {
        return this.cryCode.decrypt(key);
    }

    /**
     * getter
     * Access Token false if can not get or expired
     * @return {any}
     */
    public get accessToken(): any {
        const accessToken = this.decrypt('accessToken');
        if (!this.isValidValue(accessToken) || this.accessTokenExpire === false) {
            return false;
        }
        return accessToken;
    }

    /**
     * setter
     * @param {any} accessToken
     */
    public set accessToken(accessToken: any) {
        this.encrypt('accessToken', accessToken);
    }

    /**
     * getter
     * Access Token Expire false if can not get or expired
     * @return {string | boolean}
     */
    public get accessTokenExpire(): any {
        const accessTokenExpire = this.decrypt('accessTokenExpire');
        return this.isExpired(accessTokenExpire) ? false : accessTokenExpire;
    }

    /**
     * setter
     * @param {any} accessTokenExpire
     */
    public set accessTokenExpire(accessTokenExpire: any) {

        this.encrypt('accessTokenExpire', accessTokenExpire);
    }

    /**
     * getter
     * @returns {string}
     */
    public get scope(): string {
        return this.decrypt('scope');
    }

    /**
     * setter
     * @param {string} scope
     */
    public set scope(scope: string) {
        this.encrypt('scope', scope);
    }

    /**
     * current user login
     * getter
     * @returns {any}
     */
    public get identity(): any {
        return JSON.parse(this.decrypt('userLogin'));
    }

    /**
     * setter
     * @param {any | null} identity
     */
    public set identity(identity: any | null) {
        identity = JSON.stringify(identity);
        this.encrypt('userLogin', identity);
    }

    /**
     * safe http option, without authorization
     * @returns {{header: HttpHeaders; withCredentials: boolean}}
     */
    public getSafeHttpOptions() {
        const header = new HttpHeaders();
        header.append('Accept', 'application/json');
        return {headers: header, withCredentials: true};
    }

    /**
     * authorization http options
     * @returns {{header: HttpHeaders; withCredentials: boolean}}
     */
    public getAuthHttpOptions() {
        const options = this.getSafeHttpOptions();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('X-Access-Token', this.accessToken);
        return options;
    }

    /**
     *  string baseUrl + current request
     * @param url
     * @param {boolean} fullPath
     * @returns {any}
     */
    getApiURl(url, fullPath = false) {
        if (fullPath) {
            return url;
        }
        return this.API_URL_BACKEND + '/' + url;
    }


    /**
     * handle http error
     * @param {HttpErrorResponse} error
     */
    handleError(error: HttpErrorResponse) {
        console.log(error);
    }

    public get employee() {
      const user = JSON.parse(this.decrypt('userLogin'));
      return user.employee;
    }

    /**
     * check value if valid
     * @param value
     * @return {boolean}
     */
    isValidValue(value): boolean {
        return !(typeof value === 'undefined' ||
            value === null ||
            (isString(value) && value === '') ||
            (isArray(value) && value.length === 0)
        );
    }

    /**
     * check time if this expired
     * @param {any | undefined} time
     * @return {boolean}
     */
    isExpired(time: any | undefined): boolean {
        if (!this.isValidValue(time)) {
            return true;
        }
        return (Number(time) * 1000) < Date.now();
    }

    // 'master_marketing' || 'accountant' || 'master_accountant' || 'marketing_intent' || 'marketing_ads' || 'marketing'
    public checkSuperAdmin() {
        if (localStorage.getItem('scope') === ('superAdmin')) {
            return true;
        }
    }
    startLoading() {
        if (this.enableLoading) {
            $('#loading').css('display', 'block');
        }
    }
    endLoading() {
        $('#loading').css('display', 'none');
    }
}
