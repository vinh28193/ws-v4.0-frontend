import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading.component';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule,
        NgxLoadingModule.forRoot({})
    ],
    exports: [
        LoadingComponent
    ],
    declarations: [LoadingComponent]
})
export class LoadingModule {
}
