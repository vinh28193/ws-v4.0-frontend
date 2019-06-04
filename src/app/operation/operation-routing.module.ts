import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperationRoutingComponent} from './operation-routing.component';
import {TrackingLogComponent} from './tracking-log/tracking-log.component';
import {WarehouseComponent} from './warehouse/warehouse.component';
import {DeliveryNoteComponent} from './delivery-note/delivery-note.component';
import {WalletComponent} from './wallet/wallet.component';
import {SourceMessageComponent} from './i18n/source-message/source-message.component';
import {I18nComponent} from './i18n/i18n.component';

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
              path: 'more-log',
              loadChildren: './more-log/more-log.module#MoreLogModule'
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
            {
                path: 'delivery-note',
                component: DeliveryNoteComponent
            },
            {
                path: 'wallet',
                component: WalletComponent
            },
            {
                path: 'i18n',
                loadChildren: './i18n/i18n.module#I18nModule',
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
