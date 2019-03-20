import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackingService} from './tracking.service';

import {TrackingRoutingModule} from './tracking-routing.module';
import {TrackingRoutingComponent} from './tracking-routing.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TrackingRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        TrackingRoutingComponent,
        TrackingListComponent
    ],
    providers: [
        TrackingService
    ]
})
export class TrackingModule {
}
