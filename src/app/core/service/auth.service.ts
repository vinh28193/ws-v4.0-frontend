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
        super(encryption);

    }

    private _redirectURL: string;
    public get redirectURL(): string {
        if (!this.isValidValue(this._redirectURL)) {
            switch (this.employee) {
                case 1:
                    this._redirectURL = '/operation/order';
                    break;
                // case  'salehcm':
                //     this._redirectURL = '/operation/potential';
                //     break;
                default :
                    this._redirectURL = '/operation/potential';
            }
        }
        return this._redirectURL;
    }

    public set redirectURL(redirectURL: string) {
        this._redirectURL = redirectURL;
    }

    /**
     * getter
     * authorization code false if can not get or expired
     * @return {any}
     */
    public get authorizationCode(): any {
        const authorizationCode = this.decrypt('authorizationCode');
        if (!this.isValidValue(authorizationCode) || this.authorizationCodeExpire === false) {
            return false;
        }
        return authorizationCode;
    }

    /**
     * setter
     * @param {any} authorizationCode
     */
    public set authorizationCode(authorizationCode: any) {
        this.encrypt('authorizationCode', authorizationCode);
    }

    /**
     * getter
     * return false if expired
     * @return {string | boolean}
     */
    public get authorizationCodeExpire(): string | boolean {
        const authorizationCodeExpire = this.decrypt('authorizationCodeExpire');
        return this.isExpired(authorizationCodeExpire) ? false : authorizationCodeExpire;
    }

    /**
     * setter
     * @param {string | boolean} authorizationCodeExpire
     */
    public set authorizationCodeExpire(authorizationCodeExpire: string | boolean) {
        this.encrypt('authorizationCodeExpire', authorizationCodeExpire);
    }

    /**
     * get api auth url
     * @param url
     * @returns {any | string}
     */
    public getApiAuthURl(url) {
        const fullUrl = environment.OAUTH_URL + url;
        return this.getApiURl(fullUrl, true);
    }

    getAuthorize(username, password) {
        return this.http.post(this.getApiAuthURl('/1/authorize'), {username, password});
    }

    getAccessToken() {
        const fd = new FormData();
        fd.append('authorization_code', this.authorizationCode);
        return this.http.post(this.getApiAuthURl('/1/access-token'), fd, {withCredentials: true});
    }

    handleAccessToken(response: any, redirect: boolean | true) {
        const rs: any = response.data;
        const accessToken = rs.accessToken;
        const userPublicIdentity = rs.userPublicIdentity;
        // console.log('res AccessToken : ' + JSON.stringify(res));
        this.accessToken = accessToken.token;
        this.accessTokenExpire = accessToken.expires_at;
        // console.log('access token : ' + this.accessToken);
        this.identity = userPublicIdentity;
        this.scope = userPublicIdentity.role;
        // this.store = rs.user.store_id;
        // console.log('res Roles : ' + JSON.stringify(userPublicIdentity));
        // console.log('res scope : ' + JSON.stringify(this.scope));
        if (redirect === true) {
            this.handleRedirectURL();
        }
    }

    handleRedirectURL() {
        if (this.isValidValue(this.redirectURL)) {
            setTimeout(() => {
                // location.reload();
                window.location.href = this.redirectURL;
            }, 200);
        }
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 400) {
                location.href = 'operation/login';
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

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authorizationCode');
  }
}
