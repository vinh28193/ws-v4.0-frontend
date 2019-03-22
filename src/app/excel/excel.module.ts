import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExcelDemoComponent} from './excel-demo/excel-demo.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ExcelDemoComponent
    ],
    declarations: [ExcelDemoComponent, ExcelUploadComponent]
})
export class ExcelModule {
}
