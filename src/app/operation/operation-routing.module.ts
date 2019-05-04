import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperationRoutingComponent} from './operation-routing.component';
import {TrackingLogComponent} from './tracking-log/tracking-log.component';
import {WarehouseComponent} from './warehouse/warehouse.component';

const routes: Routes = [
    {
        path: '',
        component: OperationRoutingComponent,
        children: [
            {
                path: 'order',
                loadChildren: './order/order.module#OrderModule'
            },
            {
                path: 'package',
                loadChildren: './package/package.module#PackageModule',
            },
            {
                path: 'shipment',
                loadChildren: './shipment/shipment.module#ShipmentModule',
            },
            {
                path: 'tracking',
                loadChildren: './tracking/tracking.module#TrackingModule',
            },
            {
                path: 'tracking-log',
                 component: TrackingLogComponent
            },
            {
                path: 'warehouse',
                component: WarehouseComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationRoutingModule {
}
