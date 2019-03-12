import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: '#/', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {path: '404', component: PageNotFoundComponent},
    {
        path: 'login', component: LoginComponent,
        data: {
            breadcrumb: 'Login'
        },
        // redirectTo: 'login'
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
            {
                enableTracing: true, // <-- debugging purposes only
                preloadingStrategy: SelectivePreloadingStrategyService,
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
