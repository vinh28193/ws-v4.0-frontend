import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PackageItemRoutingComponent} from './package-item-routing.component';
import {PackageItemListComponent} from './package-item-list/package-item-list.component';


const routes: Routes = [
    {
        path: '',
        component: PackageItemRoutingComponent,
        children: [
            {
                path: '',
                component: PackageItemListComponent
            },
            {
                path: 'list',
                component: PackageItemListComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageItemRoutingModule { }
