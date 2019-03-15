import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorePipe } from './pipes/store.pipe';
import { IconFlagPipe } from './pipes/icon-flag.pipe';
import { OrderTypePipe } from './pipes/order-type.pipe';
import { OrderTypeClassPipe } from './pipes/order-type-class.pipe';
import {TimeAgoPipe} from 'time-ago-pipe';
import {SpanLabelComponent} from './span-label/span-label.component';
import { QuotationPipe } from './pipes/quotation.pipe';
import { QuotationStatusPipe } from './pipes/quotation-status.pipe';
import { QuotationStatusClassPipe } from './pipes/quotation-status-class.pipe';




@NgModule({
  declarations: [StorePipe, IconFlagPipe, OrderTypePipe, OrderTypeClassPipe, TimeAgoPipe, SpanLabelComponent, QuotationPipe, QuotationStatusPipe, QuotationStatusClassPipe],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    StorePipe,
    IconFlagPipe,
    OrderTypePipe,
    OrderTypeClassPipe,
    TimeAgoPipe,
    SpanLabelComponent,
    QuotationPipe,
    QuotationStatusPipe,
    QuotationStatusClassPipe
  ]
})
export class SharedModule { }
