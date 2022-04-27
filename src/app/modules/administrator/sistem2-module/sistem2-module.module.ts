import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sistem2ModuleRoutingModule } from './sistem2-module-routing.module';
import { Sistem2ModuleComponent } from './sistem2-module.component';


@NgModule({
  declarations: [
    Sistem2ModuleComponent
  ],
  imports: [
    CommonModule,
    Sistem2ModuleRoutingModule
  ]
})
export class Sistem2ModuleModule { }
