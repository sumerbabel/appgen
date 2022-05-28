import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageReservaEstadoGeneralComponent } from './components/page-reserva-estado-general/page-reserva_estado_general.component';
//import { PageReservaEstadoGeneralComponent } from './components/page-reserva-estado-general/page-reserva-estado-general.component';
const routes: Routes = [{ path: '', component: PageReservaEstadoGeneralComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaEstadoGeneralRoutingModule { }