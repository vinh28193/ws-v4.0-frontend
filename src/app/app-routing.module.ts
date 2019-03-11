import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {PackingModule} from './packing/packing.module';

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
