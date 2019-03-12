import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderModule} from './order/order.module';
import {ShipmentModule} from './shipment/shipment.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderModule,
    ShipmentModule,
  ]
})
export class OperationModule {
}
