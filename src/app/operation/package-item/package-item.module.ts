import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PackageItemRoutingModule} from './package-item-routing.module';
import {PackageItemRoutingComponent} from './package-item-routing.component';
import {PackageItemListComponent} from './package-item-list/package-item-list.component';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        PackageItemRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [PackageItemRoutingComponent, PackageItemListComponent]
})
export class PackageItemModule {
}
