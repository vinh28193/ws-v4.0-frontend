import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
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
// import {TimeAgoPipe} from 'time-ago-pipe';
import {CurrentStatusPipe} from './pipes/current-status.pipe';
import {QuotationStatusPipe} from './pipes/quotation-status.pipe';
import {ProductFeePipe} from './pipes/ProductFee.pipe';
import { SerialNumerPipe } from './pipes/serial-numer.pipe';
import { SerialCharPipe } from './pipes/serial-char.pipe';
import { CurrencyStorePipe } from './pipes/currency-store.pipe';
import {TimeMessagePipe} from './pipes/time-message.pipe';
import { MarkSupportingPipe } from './pipes/mark-supporting.pipe';
import { TypeTrackingPipe } from './pipes/type-tracking.pipe';
import {PagingCustomComponent} from './paging-custom/paging-custom.component';
import { TrackingLogComponent } from './tracking-log/tracking-log.component';
import {BsDatepickerModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import { WarehouseComponent } from './warehouse/warehouse.component';


@NgModule({
    imports: [
        CommonModule,
        OperationRoutingModule,
        LoadingModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
    ],
    declarations: [
        OperationRoutingComponent,
        CamelizePipe,
        IconFlagPipe,
        OrderTypeClassPipe,
        OrderTypePipe,
        QuotationPipe,
        QuotationStatusClassPipe,
        StorePipe,
        SpanLabelComponent,
        TimeMessagePipe,
        CurrentStatusPipe,
        ProductFeePipe,
        SerialNumerPipe,
        SerialCharPipe,
        QuotationStatusPipe,
        CurrencyStorePipe,
        MarkSupportingPipe,
        TypeTrackingPipe,
        TrackingLogComponent,
        PagingCustomComponent,
        WarehouseComponent
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
        StorePipe,
        SpanLabelComponent,
        TimeMessagePipe,
        CurrentStatusPipe,
        ProductFeePipe,
        SerialNumerPipe,
        SerialCharPipe,
        QuotationStatusPipe,
        CurrencyStorePipe,
        MarkSupportingPipe,
        PagingCustomComponent,
    ]
})
export class OperationModule {
}
