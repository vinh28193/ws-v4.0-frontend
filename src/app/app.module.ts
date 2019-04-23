import {NgModule} from '@angular/core';

import {AppRoutingComponent} from './app-routing.component';
import {BrowserModule} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './core/service/auth.service';
import {PopupService} from './core/service/popup.service';
import {EncryptionService} from './core/service/encryption.service';
import {StorageService} from './core/service/storage.service';
import {RequestInterceptor} from './core/interceptor/request.interceptor';
import {ExcelModule} from './excel/excel.module';
import {LogoutComponent} from './logout/logout.component';
import {MessagingService} from './shared/messaging.service';
import {AsyncPipe} from '../../node_modules/@angular/common';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppRoutingComponent,
        LogoutComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ExcelModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers:
        [
            PopupService,
            AuthService,
            EncryptionService,
            StorageService,
            AuthService,
            HttpClient,
            {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
            MessagingService, AsyncPipe
        ],
    bootstrap: [AppRoutingComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

        // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
        let url = location.href;
        url = url.replace('http://', '');
        url = url.replace('https://', '');
        const url_arr = url.split('/');
        // console.log(url_arr);
        if (!url_arr[1] || url_arr[1] === '/') {
            location.assign('/operation/order');
        }
    }
}
