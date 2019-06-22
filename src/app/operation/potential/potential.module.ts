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


@NgModule({
  imports: [
    CommonModule,
    PotentialRoutingModules,
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
  declarations: [PotentialRoutingComponent, PotentialListComponent],
  providers: [
    PotentialService
  ]
})
export class PotentialModule {
}
