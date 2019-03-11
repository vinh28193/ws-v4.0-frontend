import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {PackingModule} from './packing/packing.module';
import {SharedModule} from './shared/shared.module';

const appRoutes: Routes = [
    {
        path: '', redirectTo: '#/', pathMatch: 'full'
        /* path: '', redirectTo: 'dashboard/home', pathMatch: 'full' */
    },
    {path: '404', redirectTo: '404'},
    {
        path: 'packing',
        loadChildren: './packing/packing.module#PackingModule',
    },
  {
    path: 'login',
    loadChildren: './packing/packing.module#SharedModule',
  },
];

@NgModule({
    declarations: [
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
