import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {OrderRoutingComponent} from './order-routing.component';
import {OrderListComponent} from './order-list/order-list.component';
import {
    BsDatepickerModule,
    PaginationModule,
    BsDropdownModule,
    ModalModule,
    PopoverModule,
    TabsModule,
    TooltipModule,
    CollapseModule
} from 'ngx-bootstrap';
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
import { WalletTransactionsComponent } from './order-list/wallet-transactions/wallet-transactions.component';
import { PurchaseCardComponent } from './order-detail/purchase-card/purchase-card.component';
import {CustomerInformationComponent} from '../customer-information/customer-information.component';
import { EditPackageItemComponent } from './order-list/package-item/edit-package-item/edit-package-item.component';
import { UpdateCouponComponent } from './order-list/update-coupon/update-coupon.component';
import { UpdatePromotionComponent } from './order-list/update-promotion/update-promotion.component';
import { PurchaseInfoComponent } from './order-list/purchase-info/purchase-info.component';
import { DeliveryComponent } from './order-list/delivery/delivery.component';
import { EditLocalComponent } from './order-detail/edit-local/edit-local.component';
import {NotifierModule, NotifierOptions, NotifierService} from 'angular-notifier';
import { ShoppingCartComponent } from './order-list/shopping-cart/shopping-cart.component';
import { ProductShoppingCartComponent } from './order-list/shopping-cart/product-shopping-cart/product-shopping-cart.component';
import { AssignSaleCartComponent } from './order-list/shopping-cart/assign-sale-cart/assign-sale-cart.component';
import { ScrollTopComponent } from './order-list/scroll-top/scroll-top.component';
import { ChatCartComponent } from './order-list/shopping-cart/chat-cart/chat-cart.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
        BsDropdownModule.forRoot(),
        NotifierModule.withConfig(customNotifierOptions),
        CollapseModule,
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
        WalletTransactionsComponent,
        PurchaseCardComponent,
        CustomerInformationComponent,
        EditPackageItemComponent,
        UpdateCouponComponent,
        UpdatePromotionComponent,
        PurchaseInfoComponent,
        DeliveryComponent,
        EditLocalComponent,
        ShoppingCartComponent,
        ProductShoppingCartComponent,
        AssignSaleCartComponent,
        ScrollTopComponent,
        ChatCartComponent,
    ],
    providers: [
      OrderService,
      NotifierService
    ]
})
export class OrderModule {
}
