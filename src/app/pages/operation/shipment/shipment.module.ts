import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShipmentComponent} from './shipment.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {Daterangepicker} from 'ng2-daterangepicker';
import {Select2Module} from 'ng2-select2';
import {BsDatepickerModule, BsDropdownModule, ModalModule, PaginationModule, PopoverModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import { StoreComponent } from './store/store.component';
import { ShipmentItemComponent } from './shipment-item/shipment-item.component';

const routes: Routes = [
  {
    path: 'shipment', component: ShipmentComponent,
    data: {
      breadcrumb: 'Order'
    },
    // children: [
    //   {
    //     path: '', component: OrderItemComponent,
    //     data: {
    //       breadcrumb: 'Order Item'
    //     }
    //   },
    // ]
  }];

@NgModule({
  declarations: [
    ShipmentComponent,
    StoreComponent,
    ShipmentItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    Daterangepicker,
    Select2Module,
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot()
  ]
})
export class ShipmentModule { }
