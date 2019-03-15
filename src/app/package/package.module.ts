import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {PackageRoutingModule} from './package-routing.module';
import {PackageComponent} from './package.component';
import {PackageListComponent} from './package-list/package-list.component';
import {PackageService} from './package.service';
import {PaginationModule} from 'ngx-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PackageRoutingModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        PackageComponent,
        PackageListComponent
    ],
    providers: [
        PackageService
    ]
})
export class PackageModule {
}
