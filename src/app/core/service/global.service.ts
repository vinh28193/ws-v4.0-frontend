import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from './encryption.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  /**
   * string api base url
   */
  public API_URL_BACKEND;

  /**
   * constructor service
   * @param {EncryptionService} cryCode
   */
  constructor(public cryCode: EncryptionService) {
    this.API_URL_BACKEND = environment['API_URL_BACKEND'];
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

  /**
   * getter
   * @returns {string}
   */
  public get accessTokenExpire(): string {
    return this.decrypt('accessToken');
  }

  /**
   * setter
   * @param {string} accessTokenExpire
   */
  public set accessTokenExpire(accessTokenExpire: string) {
    this.encrypt('accessToken', accessTokenExpire);
  }

  /**
   * safe http option, without authorization
   * @returns {{header: HttpHeaders; withCredentials: boolean}}
   */
  public getSafeHttpOptions() {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    return {header: header, withCredentials: true};
  }

  /**
   * authorization http options
   * @returns {{header: HttpHeaders; withCredentials: boolean}}
   */
  public getAuthHttpOptions() {
    const options = this.getSafeHttpOptions();
    options.header.append('Content-Type', 'application/x-www-form-urlencoded');
    options.header.append('X-Access-Token', this.accessToken);
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
}
