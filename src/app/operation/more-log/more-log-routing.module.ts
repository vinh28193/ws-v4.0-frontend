import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MoreLogComponent} from './more-log.component';
import {MoreLogRoutingComponent} from './more-log-routing.component';

const routes: Routes = [
  {
    path: '',
    component: MoreLogRoutingComponent,
    children: [
      {
        path: '',
        component: MoreLogComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreLogRoutingModule { }
