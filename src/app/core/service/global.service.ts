import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from './encryption.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    public API_URL_BACKEND;

    constructor(public http: HttpClient, public cryCode: EncryptionService) {
      this.API_URL_BACKEND = environment['API_URL_BACKEND'];
    }

    public get accessToken(): string {
        return this.cryCode.decrypt('accessToken');
    }

    public set accessToken(accessToken: string) {
        this.cryCode.encrypt('accessToken', accessToken);
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
