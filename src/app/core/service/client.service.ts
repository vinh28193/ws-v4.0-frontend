import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

import 'rxjs-compat/add/operator/map';
import {GlobalService} from './global.service';
import {EncryptionService} from './encryption.service';
import {PopupService} from './popup.service';

declare var swal: any;
declare var $: any;
declare var jQuery: any;

@Injectable()
export class ClientService extends GlobalService {
    public model: any;
    constructor(public http: HttpClient, public encryption: EncryptionService, public popup: PopupService) {
        super(encryption);
    }

    handleError(error: HttpErrorResponse) {
        this.endLoading();
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
    get(url: string, params?: any | undefined): Observable<any> {
        this.startLoading();
        if (typeof params !== 'undefined' && typeof params === 'object') {
            const data: any = {};
            $.each(params, function (k, v) {
                if (v) {
                    data[k] = v;
                }
            });
            params = jQuery.param(data);
            if (params) {
                url += '?' + params;
            }
        }
        console.log(this.getApiURl(url));
        return this.http.get(this.getApiURl(url), this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );

    }

  getNoLoad(url: string, params?: any | undefined): Observable<any> {
    if (typeof params !== 'undefined' && typeof params === 'object') {
      const data: any = {};
      $.each(params, function (k, v) {
        if (v) {
          data[k] = v;
        }
      });
      params = jQuery.param(data);
      url += '?' + params;
    }
    return this.http.get(this.getApiURl(url), this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      ).do(
        (event: HttpEvent<any>) => {
          this.endLoading();
          if (event instanceof HttpResponse) {
            return event;
            // do stuff with response if you want
          }
        }
      );

  }

    post(url, body) {
        this.startLoading();
        return this.http.post(this.getApiURl(url), body, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );
    }

  postNoLoad(url, body) {
    return this.http.post(this.getApiURl(url), body, this.getAuthHttpOptions())
      .pipe(
        catchError(this.handleError)
      ).do(
        (event: HttpEvent<any>) => {
          this.endLoading();
          if (event instanceof HttpResponse) {
            return event;
            // do stuff with response if you want
          }
        }
      );
  }

    put(url, body): Observable<any> {
        this.startLoading();
        return this.http.put(`${this.getApiURl(url)}`, body, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );
    }

    patch(url, body): Observable<any> {
        this.startLoading();
        return this.http.patch(`${this.getApiURl(url)}`, body, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );
    }

    delete(url): Observable<any> {
        this.startLoading();
        return this.http.delete(`${this.getApiURl(url)}`, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );

    }
    deleteParam(url, body): Observable<any> {
        this.startLoading();
        if (typeof body !== 'undefined' && typeof body === 'object') {
        body = jQuery.param(body);
        url += '?' + body;
      }
        return this.http.delete(`${this.getApiURl(url)}`, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            ).do(
                (event: HttpEvent<any>) => {
                    this.endLoading();
                    if (event instanceof HttpResponse) {
                        return event;
                        // do stuff with response if you want
                    }
                }
            );

    }

    request(method, url, body) {
        this.startLoading();
        const req = new HttpRequest(method, this.getApiURl(url), body, this.getAuthHttpOptions());
        return this.http.request(req).pipe(
            catchError(this.handleError)
        ).do(
            (event: HttpEvent<any>) => {
                this.endLoading();
                if (event instanceof HttpResponse) {
                    return event;
                    // do stuff with response if you want
                }
            }
        );
    }
}
