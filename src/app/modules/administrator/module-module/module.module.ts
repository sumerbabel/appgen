import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { ModuleRoutingModule } from './module-routing.module';
import { PageModuleComponent } from './components/page-module/page-module.component';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { UpdateModuleComponent } from './components/update-module/update-module.component';

@NgModule({
  declarations: [PageModuleComponent, CreateModuleComponent, UpdateModuleComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ModuleModule { }
