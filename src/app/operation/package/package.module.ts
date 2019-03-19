import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';

import {PackageRoutingModule} from './package-routing.module';
import {PackageRoutingComponent} from './package-routing.component';

import {PackageListComponent} from './package-list/package-list.component';

import {PackageService} from './package.service';
import {PackageDirective} from './package.directive';
import { PackageItemComponent } from './package-item/package-item.component';

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
        PackageItemComponent
    ],
    providers: [
        PackageService
    ]
})
export class PackageModule {
}
