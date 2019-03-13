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

  /**
   * Todo Validate pls
   * @see authorizationCodeExpire
   * string authorization code
   * getter
   */
  public get authorizationCode(): string {
    return this.decrypt('authorizationCode');
  }

  /**
   * setter
   * @param {string} authorizationCode
   */
  public set authorizationCode(authorizationCode: string) {
    this.encrypt('authorizationCode', authorizationCode);
  }

  /**
   * Todo Validate pls
   * @see authorizationCode
   * string authorization code expire
   * getter
   * @returns {string}
   */
  public get authorizationCodeExpire(): string {
    return this.decrypt('authorizationCodeExpire');
  }

  /**
   * setter
   * @param {string} authorizationCodeExpire
   */
  public set authorizationCodeExpire(authorizationCodeExpire: string) {
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

  login(username, password) {
    return this.http.post(this.getApiAuthURl('/1/authorize'), {username, password}, this.getSafeHttpOptions());
  }

  getAccessToken() {
    const url = '/1/access-token/' + this.authorizationCode;
    return this.http.get(this.getApiAuthURl(url), this.getSafeHttpOptions());
  }

  refreshToken() {
    const fd = new FormData();
    fd.append('authorization_code', this.authorizationCode);
    return this.http.post(this.getApiAuthURl('/1/accesstoken'), fd, this.getSafeHttpOptions()).catch(this.handleError);

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
