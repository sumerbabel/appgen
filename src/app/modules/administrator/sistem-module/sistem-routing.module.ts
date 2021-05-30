import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSistemComponent } from './components/page-sistem/page-sistem.component';

const routes: Routes = [{ path: '', component: PageSistemComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemRoutingModule { }
