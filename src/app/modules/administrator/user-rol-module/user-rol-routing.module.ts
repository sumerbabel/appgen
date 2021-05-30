import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageUserRolComponent } from './components/page-user-rol/page-user-rol.component';

const routes: Routes = [{ path: '', component: PageUserRolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRolRoutingModule { }
