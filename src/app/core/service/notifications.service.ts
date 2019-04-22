import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {EncryptionService} from './encryption.service';
import {PopupService} from './popup.service';
import {HttpClient, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class NotificationsService extends GlobalService {
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
    get(url: string, params?: any | undefined): Observable<any> {
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

    put(url, body): Observable<any> {
        return this.http.put(`${this.getApiURl(url)}`, body, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            );
    }

    patch(url, body): Observable<any> {
        return this.http.patch(`${this.getApiURl(url)}`, body, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(url): Observable<any> {
        return this.http.delete(`${this.getApiURl(url)}`, this.getAuthHttpOptions())
            .pipe(
                catchError(this.handleError)
            );

    }

    request(method, url, body) {
        const req = new HttpRequest(method, this.getApiURl(url), body, this.getAuthHttpOptions());
        return this.http.request(req).pipe(
            catchError(this.handleError)
        );
    }


}
