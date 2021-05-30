import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { TableRoutingModule } from './table-routing.module';
import { PageTableComponent } from './components/page-table/page-table.component';
import { CreateTableComponent } from './components/create-table/create-table.component';
import { UpdateTableComponent } from './components/update-table/update-table.component';

@NgModule({
  declarations: [PageTableComponent, CreateTableComponent, UpdateTableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class TableModule { }
