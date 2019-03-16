import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

import {ShipmentRoutingModule} from './shipment-routing.module';

import {ShipmentComponent} from './shipment.component';
import {ShipmentListComponent} from './shipment-list/shipment-list.component';
import {ShipmentService} from './shipment.service';


@NgModule({
    imports: [
        CommonModule,
        ShipmentRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [ShipmentComponent, ShipmentListComponent],
    providers: [
        ShipmentService
    ]
})
export class ShipmentModule {
}
