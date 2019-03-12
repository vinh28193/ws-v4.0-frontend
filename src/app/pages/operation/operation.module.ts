import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderModule} from './order/order.module';
import {ShipmentModule} from './shipment/shipment.module';
import {ShipmentService} from './shipment/shipment.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderModule,
    ShipmentModule,
  ],
  providers: [
    ShipmentService
  ]
})
export class OperationModule {
}
