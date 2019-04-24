import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  BsDatepickerModule,
  BsDropdownModule,
  CollapseModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ShipmentRoutingModule} from './shipment-routing.module';
import {ShipmentRoutingComponent} from './shipment-routing.component';

import {ShipmentListComponent} from './shipment-list/shipment-list.component';
import {ShipmentService} from './shipment.service';


@NgModule({
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule
  ],
    declarations: [ShipmentRoutingComponent, ShipmentListComponent],
    providers: [
        ShipmentService
    ]
})
export class ShipmentModule {
}
