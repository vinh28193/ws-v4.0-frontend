import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './package.component';
import { PackageListComponent } from './package-list/package-list.component';

@NgModule({
  imports: [
    CommonModule,
    PackageRoutingModule
  ],
  declarations: [PackageComponent, PackageListComponent]
})
export class PackageModule { }
