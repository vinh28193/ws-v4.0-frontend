import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TrackingRoutingComponent} from './tracking-routing.component';
import {TrackingListComponent} from './tracking-list/tracking-list.component';
import {TrackingSentComponent} from './tracking-sent/tracking-sent.component';

const routes: Routes = [
    {
        path: '',
        component: TrackingRoutingComponent,
        children: [
            {
                path: '',
                component: TrackingListComponent
            },
            {
                path: 'list',
                component: TrackingListComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
