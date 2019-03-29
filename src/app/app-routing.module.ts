import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';
import {AuthGuard} from './core/guard/auth.guard';
import {ExcelDemoComponent} from './excel/excel-demo/excel-demo.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'operation/order', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {
        path: '404', component: PageNotFoundComponent
    },
    {
        path: 'excel', component: ExcelDemoComponent
    },
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
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
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
