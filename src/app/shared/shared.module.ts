import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpanLabelComponent} from './span-label/span-label.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ShipmentComponent} from '../pages/operation/shipment/shipment.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    },
  }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class SharedModule { }
