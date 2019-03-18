import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShipmentRoutingComponent} from './shipment-routing.component';
import {ShipmentListComponent} from './shipment-list/shipment-list.component';

const routes: Routes = [
    {
        path: '',
        component: ShipmentRoutingComponent,
        children: [
            {
                path: '',
                component: ShipmentListComponent
            },
            {
                path: 'list',
                component: ShipmentListComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
