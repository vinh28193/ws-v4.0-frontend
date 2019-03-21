import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        return this.checkAuthorization(url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    checkAuthorization(url: string): boolean {
        const authorizationCode = this.authService.authorizationCode;
        if (authorizationCode === false) {
            this.authService.redirectURL = url;
            // Navigate to the login page with extras
            this.router.navigate(['/login'], {queryParams: {r: url}});
            return false;
        }
        return true;
        // Store the attempted URL for redirecting


    }
}
