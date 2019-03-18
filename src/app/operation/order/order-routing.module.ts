import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderRoutingComponent} from './order-routing.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: OrderRoutingComponent,
        children: [
            {
                path: '',
                component: OrderListComponent
            },
            {
                path: 'list',
                component: OrderListComponent
            },
            {
                path: ':id',
                component: OrderDetailComponent
            },
            {
                path: ':id/detail',
                component: OrderDetailComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
