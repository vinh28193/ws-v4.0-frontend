import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { ShipmentComponent } from './shipment.component';
import { ItemComponent } from './item/item.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },

];

@NgModule({
    declarations: [ShipmentComponent, ItemComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {useHash: true}),
    ]
})
export class ShipmentModule {
}
