import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {PackingModule} from './packing/packing.module';

const appRoutes: Routes = [
    {
        path: '', redirectTo: '#/', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {path: '404', redirectTo: '404'},
    {
        path: 'login', component: LoginComponent,
        data: {
            breadcrumb: 'Login'
        },
        redirectTo: 'login'
    },
    {
        path: 'packing',
        loadChildren: './packing/packing.module#PackingModule',
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
