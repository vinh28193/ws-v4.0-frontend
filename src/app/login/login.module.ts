import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {AuthService} from '../core/service/auth.service';
import {RequestInterceptor} from '../core/interceptor/request.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent],
    providers: [
            AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    ],
})
export class LoginModule {
}
