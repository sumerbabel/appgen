import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { SistemRoutingModule } from './sistem-routing.module';
import { PageSistemComponent } from './components/page-sistem/page-sistem.component';
import { CreateSistemComponent } from './components/create-sistem/create-sistem.component';
import { UpdateSistemComponent } from './components/update-sistem/update-sistem.component';
import { FilterComponent } from './components/page-sistem/filter/filter.component';

@NgModule({
  declarations: [PageSistemComponent, CreateSistemComponent, UpdateSistemComponent, FilterComponent],
  imports: [
    CommonModule,
    SistemRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class SistemModule { }
