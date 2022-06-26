import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProgramaComponent } from '../components/gestion-programa/gestion-programa.component';
import { ProgramaRegisterComponent } from '../components/programa-register/programa-register.component';

const routes: Routes = [{ path: '', component: GestionProgramaComponent },
{ path: 'edit/:id', component: GestionProgramaComponent },
{ path: 'register', component: GestionProgramaComponent },
//{ path: '**', component: GestionProgramaComponent }
];

//{ path: '**', redirectTo: '', pathMatch: 'full' },

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestProgramasRoutingModule { }
