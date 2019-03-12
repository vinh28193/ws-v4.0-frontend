import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';

import {Router} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './core/service/auth.service';
import {PopupService} from './core/service/popup.service';
import {EncryptionService} from './core/service/encryption.service';
import {StorageService} from './core/service/storage.service';
import {RequestInterceptor} from './core/interceptor/request.interceptor';

import {PagesModule} from './pages/pages.module';
import {BrowserModule} from '@angular/platform-browser';
import {LoadingModule} from './core/loading/loading.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        PagesModule,
        LoadingModule,
    ],
    providers:
        [
            PopupService,
            AuthService,
            EncryptionService,
            StorageService,
            AuthService,
            {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

        // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
