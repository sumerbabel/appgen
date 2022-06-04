import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProgramaComponent } from '../components/gestion-programa/gestion-programa.component';
const routes: Routes = [{ path: '', component: GestionProgramaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestProgramasRoutingModule { }
