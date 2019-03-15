import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {OrderItemComponent} from './order-item/order-item.component';
import {OrderFilterComponent} from './order-filter/order-filter.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Daterangepicker} from 'ng2-daterangepicker';
import {Select2Module} from 'ng2-select2';
import {BsDatepickerModule, BsDropdownModule, ModalModule, PaginationModule, PopoverModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import { EditImageComponent } from './order-item/edit-image/edit-image.component';
import { EditLocalNameComponent } from './order-item/edit-local-name/edit-local-name.component';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {SharedModule} from '../../../shared/shared.module';
import { EditVariantComponent } from './order-item/edit-variant/edit-variant.component';
import { AssignSaleComponent } from './assign-sale/assign-sale.component';
import { PackageComponent } from './order-item/package/package.component';

export const routes: Routes = [
  {
    path: 'order', component: OrderComponent,
    data: {
      breadcrumb: 'Order'
    },
    children: [
      {
        path: 'package', component: PackageComponent,
        data: {
          breadcrumb: 'Order Manager'
        },
      },
    ]
    // children: [
    //   {
    //     path: '', component: OrderItemComponent,
    //     data: {
    //       breadcrumb: 'Order Item'
    //     }
    //   },
    // ]
  }]

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemComponent,
    OrderFilterComponent,
    EditImageComponent,
    EditLocalNameComponent,
    EditVariantComponent,
    AssignSaleComponent,
    PackageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
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
export class OrderModule { }
