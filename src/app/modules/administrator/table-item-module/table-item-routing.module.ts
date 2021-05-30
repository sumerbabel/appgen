import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageTableItemComponent } from './components/page-table-item/page-table-item.component';

const routes: Routes = [{ path: '', component: PageTableItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableItemRoutingModule {}
