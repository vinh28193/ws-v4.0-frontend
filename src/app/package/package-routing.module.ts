import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackageComponent} from './package.component';
import {PackageListComponent} from './package-list/package-list.component';

const routes: Routes = [
    {
        path: '',
        component: PackageComponent,
        children: [
            {
                path: 'list',
                component: PackageListComponent
            },
            {
                path: '',
                component: PackageListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageRoutingModule {
}
