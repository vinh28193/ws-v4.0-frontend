import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackageRoutingComponent} from './package-routing.component';
import {PackageListComponent} from './package-list/package-list.component';
import {PackageItemComponent} from './package-item/package-item.component';

const routes: Routes = [
    {
        path: '',
        component: PackageRoutingComponent,
        children: [
            {
                path: '',
                component: PackageListComponent
            },
            {
                path: 'list',
                component: PackageListComponent
            },
            {
                path: 'item',
                component: PackageItemComponent
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
