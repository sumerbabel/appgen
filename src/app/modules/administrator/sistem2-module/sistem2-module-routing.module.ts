import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sistem2ModuleComponent } from './sistem2-module.component';

const routes: Routes = [{ path: '', component: Sistem2ModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sistem2ModuleRoutingModule { }
