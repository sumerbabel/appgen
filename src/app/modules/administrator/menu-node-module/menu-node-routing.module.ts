import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageMenuNodeComponent } from './components/page-menu-node/page-menu-node.component';

const routes: Routes = [{ path: '', component: PageMenuNodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuNodeRoutingModule { }
