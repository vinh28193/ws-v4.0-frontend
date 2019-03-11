import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {path: '**', redirectTo: '404'},
    {
        path: 'login', component: LoginComponent,
        data: {
            breadcrumb: 'Login'
        },
    },
    {
        path: 'package',
        loadChildren: './package/package.module#PackageModule',
    },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
