import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

import 'rxjs-compat/add/operator/map';
import {GlobalService} from './global.service';
import {environment} from '../../../environments/environment.prod';
import {BaseComponent} from '../base.compoment';
import {EncryptionService} from './encryption.service';
import {PopupService} from './popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var swal: any;

@Injectable()
export class ClientService extends GlobalService {
  public model: any;

  constructor(public http: HttpClient, public encryption: EncryptionService, public popup: PopupService) {
    super(encryption);
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);

    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(() => {
      'Something bad happened; please try again later.';
    });
  }

  /**
   * @param url
   * @param params
   */
  get(url: string, params: any | undefined): Observable<any> {
    if (typeof params !== 'undefined' && typeof params === 'object') {
      params = jQuery.param(params);
      url += '?' + params;
    }
    return this.http.get(this.getApiURl(url), this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      );

  }

  post(url, body) {
    return this.http.post(this.getApiURl(url), body, this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  update(url, body): Observable<any> {
    return this.http.put(`${this.getApiURl(url)}/ ${body}`, this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url, body): Observable<any> {
    return this.http.delete(`${this.getApiURl(url)}/${body}`, this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      );

  }
}
