import {NgModule} from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
    {
        path: '', redirectTo: '#/', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {
        path: '404', component: PageNotFoundComponent},
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
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
    declarations: [
      PageNotFoundComponent
    ],
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
