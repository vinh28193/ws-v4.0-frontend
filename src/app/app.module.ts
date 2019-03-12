import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './core/service/auth.service';
import {RequestInterceptor} from './core/interceptor/request.interceptor';
import {PackageModule} from './package/package.module';
import {PagesModule} from './pages/pages.module';
import {BrowserModule} from '@angular/platform-browser';
import {Router} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        PagesModule,
        PackageModule

    ],
    providers:
        [ AuthService,
            {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

        console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
