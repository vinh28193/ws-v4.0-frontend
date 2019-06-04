import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule, ModalModule, PaginationModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {I18nComponent} from './i18n.component';
import {SourceMessageComponent} from './source-message/source-message.component';
import {I18nService} from './i18n.service';
import {I18nRoutingComponent} from './i18n-routing.component';
import {OperationModule} from '../operation.module';
import {I18nRoutingModule} from './i18n-routing.module';

@NgModule({
    imports: [
        CommonModule,
        I18nRoutingModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        FormsModule,
        OperationModule
    ],
    declarations: [SourceMessageComponent, I18nComponent, I18nRoutingComponent],
    providers: [I18nService]
})
export class I18nModule {
}
