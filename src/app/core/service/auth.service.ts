import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs-compat/add/operator/catch';
import {PopupService} from './popup.service';
import {EncryptionService} from './encryption.service';
import {GlobalService} from './global.service';

@Injectable()
export class AuthService extends GlobalService {

    constructor(public http: HttpClient,
                public encryption: EncryptionService,
                public popup: PopupService) {
        super(http, encryption);

    }

    public get authorizationCode(): string {
        return this.decrypt('authorizationCode');
    }

    public set authorizationCode(authorizationCode: string) {
        this.encrypt('authorizationCode', authorizationCode);
    }

    public get authorizationCodeExpire(): string {
        return this.decrypt('authorizationCodeExpire');
    }

    public set authorizationCodeExpire(authorizationCodeExpire: string) {
        this.encrypt('authorizationCodeExpire', authorizationCodeExpire);
    }

    public getApiAuthURl(url) {
        const fullUrl = environment.OAUTH_URL + '/' + url;
        return this.getApiURl(fullUrl, true);
    }

    getStoreCode($store) {
        switch (Number($store)) {
            case 6:
                return 'MY';
            case 7:
                return 'ID';
            case 9:
                return 'PH';
            case 10:
                return 'TH';
            case 1:
                return 'VN';
            default:
                return '';
        }
    }

    login(username, password) {
        return this.http.post(this.getApiAuthURl('login/authorize'), {username, password}, this.getSafeHttOptions());

    }

    getAccessToken() {
        return this.http.post(this.getApiAuthURl('login/accesstoken'), this.authorizationCode, this.getSafeHttOptions());
    }

    refreshToken() {
        const fd = new FormData();
        fd.append('authorization_code', this.authorizationCode);
        return this.http.post(this.getApiAuthURl('login/accesstoken'), fd, this.getSafeHttOptions()).catch(this.handleError);

    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 400) {
                location.href = '/login';
                location.reload();
            }
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(() => {
            'Error';
        });
    }
}
