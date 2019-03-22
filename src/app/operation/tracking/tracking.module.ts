import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackingService} from './tracking.service';

import {TrackingRoutingModule} from './tracking-routing.module';
import {TrackingRoutingComponent} from './tracking-routing.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import { TrackingSentComponent } from './tracking-sent/tracking-sent.component';
import {Select2Module} from 'ng2-select2';

@NgModule({
    imports: [
        CommonModule,
        TrackingRoutingModule,
        ReactiveFormsModule,
        Select2Module,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        TrackingRoutingComponent,
        TrackingListComponent,
        TrackingSentComponent
    ],
    providers: [
        TrackingService
    ]
})
export class TrackingModule {
}
