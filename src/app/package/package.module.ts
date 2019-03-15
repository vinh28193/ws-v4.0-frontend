import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';

import {PackageRoutingModule} from './package-routing.module';
import {PackageComponent} from './package.component';
import {PackageListComponent} from './package-list/package-list.component';
import {PackageService} from './package.service';
import {PackageDirective} from './package.directive';


@NgModule({
    imports: [
        CommonModule,
        PackageRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PackageComponent,
        PackageListComponent,
        PackageDirective
    ],
    providers: [
        PackageService
    ]
})
export class PackageModule {
}
