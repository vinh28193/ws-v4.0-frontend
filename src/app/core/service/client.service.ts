import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Type} from '@angular/core';

import {NotifyUltis} from '../utility/notify.ultis';
import 'rxjs-compat/add/operator/map';

declare var swal: any;

@Injectable()
export class ClientService {
  constructor(public http: HttpClient) {
    this.API_URL_BACKEND = environment['API_URL_BACKEND'];
  }

  public total;
  public page;
  public httpOptions;
  public API_URL_BACKEND = '';

  post(url, fd: FormData, page = null, limit = 20) {
    if (page != null) {
      const start = (page - 1) * limit;
      fd.append('offset', start.toString());
      fd.append('limit', limit.toString());
    }

    /*let header = new HttpHeaders().set('Content-Type', 'application/json');
    application/x-www-form-urlencoded */

    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.getApiURl(url), fd, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  getApiURl(url, loading = true, fullPath = false, version = 'v1') {
    if (fullPath) {
      return url;
    }
    return this.API_URL_BACKEND + '/' + url;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // swal({
      //   title: error.status,
      //   text: error.error.message,
      //   type: "error",
      //   confirmButtonClass: "btn-danger"
      // });
      console.log('An error occurred:', error.error.message);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // swal({
      //   title: error.status,
      //   text: "Error",
      //   type: "error",
      //   confirmButtonClass: "btn-danger"
      // });

      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(() => {
      'Something bad happened; please try again later.';
    });
  }

  downloadFile(action, fd: FormData): Observable<any> {
    return this.http.post(this.getApiURl(action), fd)
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  uploadFile(action, fd: FormData) {
    const header = new HttpHeaders().set('Accept', 'multipart/form-data').set('Content-Type', null);
    return this.http.post(this.getApiURl(action), fd)
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  getList(action, fd: FormData, page: number = 0, limit: number = 10, loading = true): Observable<any> {

    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');


    const start = (page - 1) * limit;
    fd.append('offset', start.toString());
    fd.append('limit', limit.toString());

    return this.http.get(`${this.getApiURl(action, loading)}/${fd}`, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );

  }

  update(action, fd: FormData, loading = true, fullPath = false): Observable<any> {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(this.getApiURl(action, loading, fullPath), fd, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  Post(action, fd: FormData, loading = true, fullPath = false): Observable<any> {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.getApiURl(action, loading, fullPath), fd, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  delete(action, fd: FormData, loading = true): Observable<any> {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.delete(`${this.getApiURl(action, loading)}/${fd}`, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );

  }

  public catchStatus(res, loading = true) {
    if (loading) {
      if (res.success) {
        // console.log();
        this.success(res.message, 'Success');
        // this.success(customMsg != "" ? customMsg : res.message, "Success");
      } else {
        this.popupError('ERROR ', res.message);
      }
      this.endLoading();
    }
  }

  put(action, fd: FormData, loading = true, fullPath = false): Observable<any> {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put(this.getApiURl(action, loading, fullPath), fd, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  //  methodGet('order-item-tracking-log/list-order-item-tracking-log',['id' => 12,'pape' => 1])
  // methodGet(action,params = []){
  //
  // }
  methodPost(action, fd: FormData, loading = true, fullPath = false): Observable<any> {
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.getApiURl(action, loading, fullPath), fd, {headers: header, withCredentials: true})
      .pipe(
        catchError(err => {
          console.log('An error occurred:', err.error.message);
          return throwError(err);
        })
      );
  }

  // Test

  loadByID(id: number): Observable<any> {

    return this.http.get<any>(`${this.getApiURl}/${id}`);
  }
}
