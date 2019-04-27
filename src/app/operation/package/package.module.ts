import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, ModalModule, PaginationModule} from 'ngx-bootstrap';

import {PackageRoutingModule} from './package-routing.module';
import {PackageRoutingComponent} from './package-routing.component';

import {PackageListComponent} from './package-list/package-list.component';
import {PackageItemComponent} from './package-item/package-item.component';

import {PackageService} from './package.service';
import {PackageDirective} from './package.directive';
import {PackageItemService} from './package-item/package-item.service';
import {PackageDraftComponent} from './package-draft/package-draft.component';
import {PackageDraftService} from './package-draft/package-draft.service';
import {PackageInfoComponent} from './package-info/package-info.component';
import {PackageViewComponent} from './package-view/package-view.component';
import {PagingCustomComponent} from '../paging-custom/paging-custom.component';

@NgModule({
    imports: [
        CommonModule,
        PackageRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        FormsModule,
        ModalModule
    ],
    declarations: [
        PackageRoutingComponent,
        PackageListComponent,
        PackageDirective,
        PackageItemComponent,
        PackageDraftComponent,
        PagingCustomComponent,
        PackageInfoComponent,
        PackageViewComponent
    ],
    providers: [
        PackageService,
        PackageDraftService,
        PackageItemService
    ]
})
export class PackageModule {
}
