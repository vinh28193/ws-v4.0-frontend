import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationRoutingModule} from './operation-routing.module';
import {OperationRoutingComponent} from './operation-routing.component';
import {OperationService} from './operation.service';
import {LoadingModule} from '../loading/loading.module';
import {CamelizePipe} from './pipes/camelize.pipe';
import {IconFlagPipe} from './pipes/icon-flag.pipe';
import {OrderTypeClassPipe} from './pipes/order-type-class.pipe';
import {OrderTypePipe} from './pipes/order-type.pipe';
import {QuotationPipe} from './pipes/quotation.pipe';
import {QuotationStatusClassPipe} from './pipes/quotation-status-class.pipe';
import {StorePipe} from './pipes/store.pipe';
import {SpanLabelComponent} from './span-label/span-label.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import {CurrentStatusPipe} from './pipes/current-status.pipe';

import {ProductFeePipe} from './pipes/ProductFee.pipe';
import { SerialNumerPipe } from './pipes/serial-numer.pipe';
import { SerialCharPipe } from './pipes/serial-char.pipe';

@NgModule({
    imports: [
        CommonModule,
        OperationRoutingModule,
        LoadingModule
    ],
    declarations: [
        OperationRoutingComponent,
        CamelizePipe,
        IconFlagPipe,
        OrderTypeClassPipe,
        OrderTypePipe,
        QuotationPipe,
        QuotationStatusClassPipe,
        QuotationPipe,
        StorePipe,
        SpanLabelComponent,
        TimeAgoPipe,
        CurrentStatusPipe,
        ProductFeePipe,
        SerialNumerPipe,
        SerialCharPipe
    ],
    providers: [
        OperationService
    ],
    exports: [
        CamelizePipe,
        IconFlagPipe,
        OrderTypeClassPipe,
        OrderTypePipe,
        QuotationPipe,
        QuotationStatusClassPipe,
        QuotationPipe,
        StorePipe,
        SpanLabelComponent,
        TimeAgoPipe,
        CurrentStatusPipe,
        ProductFeePipe,
        SerialNumerPipe,
        SerialCharPipe,
    ]
})
export class OperationModule {
}
