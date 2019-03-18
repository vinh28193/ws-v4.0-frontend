import {NgModule} from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

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
        path: 'operation',
        loadChildren: './operation/operation.module#OperationModule',
    },
];

@NgModule({
    declarations: [
      PageNotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false,  // <-- debugging purposes only
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
