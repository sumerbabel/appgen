import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageTableComponent } from './components/page-table/page-table.component';

const routes: Routes = [{ path: '', component: PageTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
