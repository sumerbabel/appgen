import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageFileComponent } from './components/page-file/page-file.component';

const routes: Routes = [{ path: '', component: PageFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
