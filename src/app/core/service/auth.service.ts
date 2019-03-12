import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Headers} from '@angular/http';
import 'rxjs-compat/add/operator/catch';
import {PopupService} from './popup.service';
import {EncryptionService} from './encryption.service';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private popup: PopupService, private  encryption: EncryptionService) {

    }

    getStoreCode($store) {
        switch (Number($store)) {
            case 6:
                return "MY";
            case 7:
                return "ID";
            case 9:
                return "PH";
            case 10:
                return "TH";
            case 1:
                return 'VN';
            default:
                return "";
        }
    }

    login(username, password) {
        return this.http.post(environment.OAUTH_URL + '/user/login/authorize', {username, password}, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            withCredentials: true
        });

    }

    getAccessToken(authorizationCode) {
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            withCredentials: true
        };
        return this.http.post(environment.OAUTH_URL + '/user/login/accesstoken', {authorizationCode}, options);
    }

    getAuthToken() {
        return this.encryption.decrypt('access_token');
    }

    refreshToken() {
        const fd = new FormData();
        fd.append('authorization_code', this.encryption.decrypt('authorization_code'));
        const headers = new Headers(
            {
                Accept: 'application/json',
            },
        );
        return this.http.post(environment.OAUTH_URL + '/user/login/accesstoken', fd, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            withCredentials: true
        }).catch(this.handleError);

    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 400) {
                location.href = '/#/auth/login';
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


    // isExpiredToken() {
    //     return (Date.now()) >= this.decrypt('expires_in');
    // }

}
