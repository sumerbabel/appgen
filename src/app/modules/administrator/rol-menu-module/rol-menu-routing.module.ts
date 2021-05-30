import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageRolMenuComponent } from './components/page-rol-menu/page-rol-menu.component';

const routes: Routes = [{ path: '', component: PageRolMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolMenuRoutingModule { }
