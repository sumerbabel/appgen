import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageObjetGenComponent } from './components/page-objet-gen/page-objet-gen.component';

const routes: Routes = [{ path: '', component: PageObjetGenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetGenRoutingModule { }
