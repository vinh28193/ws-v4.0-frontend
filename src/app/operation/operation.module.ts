import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationRoutingModule} from './operation-routing.module';
import {OperationRoutingComponent} from './operation-routing.component';
import {OperationService} from './operation.service';
import {LoadingModule} from '../loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        OperationRoutingModule,
        LoadingModule
    ],
    declarations: [OperationRoutingComponent],
    providers: [
        OperationService
    ]
})
export class OperationModule {
}
