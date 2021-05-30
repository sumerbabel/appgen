import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageGroupCodeComponent } from './components/page-group-code/page-group-code.component';

const routes: Routes = [{ path: '', component: PageGroupCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupCodeRoutingModule { }
