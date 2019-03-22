import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {OrderRoutingComponent} from './order-routing.component';
import {OrderListComponent} from './order-list/order-list.component';
import {BsDatepickerModule, PaginationModule, BsDropdownModule, ModalModule, PopoverModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssignSaleComponent} from './order-list/assign-sale/assign-sale.component';
import {EditImageComponent} from './order-detail/edit-image/edit-image.component';
import {EditVariantComponent} from './order-detail/edit-variant/edit-variant.component';
import {OperationModule} from '../operation.module';
import {OrderService} from './order.service';
import {FormsModule} from '@angular/forms';
import { EditFinanceComponent } from './order-list/edit-finance/edit-finance.component';
import { ChatComponent } from './order-list/chat/chat.component';
import { PackageItemComponent } from './order-list/package-item/package-item.component';
import { ChatGroupComponent } from './order-list/chat-group/chat-group.component';
import { UpdateProductComponent } from './order-list/update-order/update-product.component';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        OperationModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    declarations: [
        OrderRoutingComponent,
        OrderListComponent,
        OrderDetailComponent,
        AssignSaleComponent,
        EditImageComponent,
        EditVariantComponent,
        EditFinanceComponent,
        ChatComponent,
        PackageItemComponent,
        ChatGroupComponent,
        UpdateProductComponent,
    ],
    providers: [
      OrderService
    ]
})
export class OrderModule {
}
