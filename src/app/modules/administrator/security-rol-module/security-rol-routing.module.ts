import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSecurityRolComponent } from './components/page-security-rol/page-security-rol.component';

const routes: Routes = [{ path: '', component: PageSecurityRolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRolRoutingModule { }
