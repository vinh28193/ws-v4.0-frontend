import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TrackingRoutingComponent} from './tracking-routing.component';
import {TrackingListComponent} from './tracking-list/tracking-list.component';
import {TrackingExtensionComponent} from './tracking-extension/tracking-extension.component';
import {UsSendingComponent} from './us-sending/us-sending.component';

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
            },
            {
                path: 'tracking-extension',
                component: TrackingExtensionComponent
            },
            {
                path: 'us-sending',
                component: UsSendingComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
