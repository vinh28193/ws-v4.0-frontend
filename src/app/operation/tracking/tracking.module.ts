import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackingService} from './tracking.service';

import {TrackingRoutingModule} from './tracking-routing.module';
import {TrackingRoutingComponent} from './tracking-routing.component';
import {TrackingListComponent} from './tracking-list/tracking-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import {Select2Module} from 'ng2-select2';
import { TrackingExtensionComponent } from './tracking-extension/tracking-extension.component';
import {TrackingExtensionService} from './tracking-extension/tracking-extension.service';
import { TrackingViewsComponent } from './tracking-views/tracking-views.component';
import {PagingCustomComponent} from '../paging-custom/paging-custom.component';

@NgModule({
    imports: [
        CommonModule,
        TrackingRoutingModule,
        ReactiveFormsModule,
        Select2Module,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TypeaheadModule,
        FormsModule
    ],
    declarations: [
        TrackingRoutingComponent,
        TrackingListComponent,
        TrackingExtensionComponent,
        TrackingViewsComponent,
        PagingCustomComponent
    ],
    providers: [
        TrackingService,
        TrackingExtensionService
    ]
})
export class TrackingModule {
}
