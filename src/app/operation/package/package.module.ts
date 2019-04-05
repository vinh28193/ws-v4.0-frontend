import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';

import {PackageRoutingModule} from './package-routing.module';
import {PackageRoutingComponent} from './package-routing.component';

import {PackageListComponent} from './package-list/package-list.component';
import {PackageItemComponent} from './package-item/package-item.component';

import {PackageService} from './package.service';
import {PackageDirective} from './package.directive';
import {PackageItemService} from './package-item/package-item.service';
import { PackageDraftComponent } from './package-draft/package-draft.component';
import {PackageDraftService} from './package-draft/package-draft.service';

@NgModule({
    imports: [
        CommonModule,
        PackageRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PackageRoutingComponent,
        PackageListComponent,
        PackageDirective,
        PackageItemComponent,
        PackageDraftComponent
    ],
    providers: [
        PackageService,
        PackageDraftService,
        PackageItemService
    ]
})
export class PackageModule {
}
