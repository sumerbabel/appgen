import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageUserSecurityComponent } from './components/page-user-security/page-user-security.component';

const routes: Routes = [{ path: '', component: PageUserSecurityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSecurityRoutingModule { }
