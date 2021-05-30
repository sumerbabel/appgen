import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { TableItemRoutingModule } from './table-item-routing.module';
import { PageTableItemComponent } from './components/page-table-item/page-table-item.component';
import { CreateTableItemComponent } from './components/create-table-item/create-table-item.component';
import { UpdateTableItemComponent } from './components/update-table-item/update-table-item.component';

@NgModule({
  declarations: [
    PageTableItemComponent,
    CreateTableItemComponent,
    UpdateTableItemComponent,
  ],
  imports: [CommonModule, TableItemRoutingModule, SharedModule, FormsModule],
})
export class TableItemModule {}
