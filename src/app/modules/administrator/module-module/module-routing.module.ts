import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageModuleComponent } from './components/page-module/page-module.component';

const routes: Routes = [{ path: '', component: PageModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
