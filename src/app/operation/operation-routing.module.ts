import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperationRoutingComponent} from './operation-routing.component';

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
                path: 'shipment2',
                loadChildren: './shipment/shipment.module#ShipmentModule',
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
