import {Injectable} from '@angular/core';

import {
    HttpErrorResponse, HttpEvent,
    HttpHandler, HttpHeaderResponse,
    HttpInterceptor, HttpProgressEvent,
    HttpRequest, HttpResponse,
    HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {AuthService} from '../service/auth.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/operator/do';
import 'rxjs-compat/add/operator/mergeMap';

import {environment} from '../../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService) {
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (req.url.indexOf('authorize') === -1 &&
            req.url.indexOf('access-token') === -1 &&
            req.url.indexOf('language') === -1 &&
            req.url.indexOf('upload') === -1) {
            return req.clone({setHeaders: {Authorization: 'Bearer ' + token}, withCredentials: true});
        }  else {
            if (req.url.indexOf('cms') !== -1 || req.url.indexOf('language') !== -1 || req.url.indexOf('news') !== -1) {
                return req.clone({url: req.url.replace(this.authService.API_URL_BACKEND, environment.API_URL), withCredentials: true});
            } else if (req.url.indexOf('upload') !== -1) {
                return req.clone({
                    url: req.url.replace(this.authService.API_URL_BACKEND, environment.IMG_URL_WH),
                    setHeaders: {Accept: 'application/json'},
                    withCredentials: true
                });
            } else {
                return req.clone({withCredentials: false});
            }
        }
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(this.addToken(req, this.authService.accessToken)).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event;
                    // do stuff with response if you want
                }
            }).catch(error => {
            if (error instanceof HttpErrorResponse) {
                switch ((error as HttpErrorResponse).status) {
                    case 400:
                        return this.handle400Error(error);
                    case 401:
                        return this.handle401Error(req, next);
                }
            } else {
                return Observable.throw(error);
            }
        });
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken()
            .mergeMap(refreshResponse => {
                const rs: any = refreshResponse;
                this.authService.encrypt('access_token', rs.access_token);
                this.authService.encrypt('expires_in', Date.now() + Number(rs.expires_in) * 1000);
                this.authService.encrypt('token_type', rs.token_type);
                if (rs.refresh_token) {
                    this.authService.encrypt('refresh_token', rs.refresh_token);
                }
                return next.handle(this.addToken(req, rs.access_token));
            });

    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.

            return this.logoutUser();
        }

        return Observable.throw(error);
    }

    logoutUser() {
        // Route to the login page (implementation up to you)
        location.href = '/login';
        location.reload();
        return Observable.throw('');
    }
}
