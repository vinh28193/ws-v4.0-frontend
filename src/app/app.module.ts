
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

import {RequestInterceptor} from './core/interceptor/request.interceptor';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './core/service/auth.service';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
    ],
    providers:
        [ AuthService,

            {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
