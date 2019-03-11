import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PackingRoutingModule} from './packing-routing.module';
import {PackingComponent} from './packing.component';
import {PackingListComponent} from './packing-list/packing-list.component';
import { PackingDetailComponent } from './packing-detail/packing-detail.component';


@NgModule({
    declarations: [
        PackingComponent,
        PackingListComponent,
        PackingDetailComponent],
    imports: [
        CommonModule,
        PackingRoutingModule
    ]
})
export class PackingModule {
}
