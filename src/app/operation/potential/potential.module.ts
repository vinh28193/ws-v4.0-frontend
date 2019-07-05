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
import {PotentialService} from './potential.service';
import {PotentialRoutingModules} from './potential-routing.modules';
import {PotentialRoutingComponent} from './potential-routing.component';
import {PotentialListComponent} from './potential-list/potential-list.component';
import {OperationModule} from '../operation.module';
import { AsignSalePotentialComponent } from './potential-list/asign-sale-potential/asign-sale-potential.component';
import { ProductPotentialComponent } from './potential-list/product-potential/product-potential.component';
import { ChatCustomerPotentialComponent } from './potential-list/chat-customer-potential/chat-customer-potential.component';
import { ChatGroupPotentialComponent } from './potential-list/chat-group-potential/chat-group-potential.component';
import { CustomerInfoCartComponent } from './customer-info-cart/customer-info-cart.component';
import { VariationComponent } from './potential-list/product-potential/variation/variation.component';
import {ScrollTopCartComponent} from './potential-list/scroll-top-cart/scroll-top-cart.component';


@NgModule({
  imports: [
    CommonModule,
    PotentialRoutingModules,
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
    CollapseModule
  ],
  declarations: [PotentialRoutingComponent,
    PotentialListComponent,
    AsignSalePotentialComponent,
    ProductPotentialComponent,
    ChatCustomerPotentialComponent,
    ChatGroupPotentialComponent,
    CustomerInfoCartComponent,
    VariationComponent,
    ScrollTopCartComponent],
  providers: [
    PotentialService
  ]
})
export class PotentialModule {
}
