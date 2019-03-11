import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PagesModule} from './pages/pages.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './shared/login/login.component';
// import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PackingModule} from './packing/packing.module';
import {AuthService} from './core/service/auth.service';
import {RequestInterceptor} from './core/interceptor/request.interceptor';
import {RouterModule} from '@angular/router';
import {routes} from './pages/operation/order/order.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        PagesModule,
        // AppRoutingModule,
        PackingModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    providers:
        [ AuthService,
            {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
