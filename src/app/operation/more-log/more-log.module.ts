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
import {MoreLogService} from './more-log.service';
import {MoreLogRoutingModule} from './more-log-routing.module';
import {MoreLogRoutingComponent} from './more-log-routing.component';
import {MoreLogComponent} from './more-log.component';


@NgModule({
  imports: [
    CommonModule,
    MoreLogRoutingModule,
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
  declarations: [MoreLogRoutingComponent, MoreLogComponent],
  providers: [
    MoreLogService
  ]
})
export class MoreLogModule {
}
