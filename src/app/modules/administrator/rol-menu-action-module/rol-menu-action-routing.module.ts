import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageRolMenuActionComponent } from './components/page-rol-menu-action/page-rol-menu-action.component';

const routes: Routes = [{ path: '', component: PageRolMenuActionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolMenuActionRoutingModule { }
