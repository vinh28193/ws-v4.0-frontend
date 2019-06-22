import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PotentialListComponent} from './potential-list/potential-list.component';
import {PotentialRoutingComponent} from './potential-routing.component';

const routes: Routes = [
  {
    path: '',
    component: PotentialRoutingComponent,
    children: [
      {
        path: '',
        component: PotentialListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotentialRoutingModules { }
