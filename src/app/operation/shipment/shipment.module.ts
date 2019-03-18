import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

import {ShipmentRoutingModule} from './shipment-routing.module';
import {ShipmentRoutingComponent} from './shipment-routing.component';

import {ShipmentListComponent} from './shipment-list/shipment-list.component';
import {ShipmentService} from './shipment.service';
import { ShipmentDataComponent } from './shipment-data.component';


@NgModule({
    imports: [
        CommonModule,
        ShipmentRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [ShipmentRoutingComponent, ShipmentListComponent],
    providers: [
        ShipmentService
    ]
})
export class ShipmentModule {
}
