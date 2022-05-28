import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';
import { ReservaEstadoGeneralRoutingModule } from './reserva-estado-general-routing.module';
import { CreateReservaEstadoGeneralComponent } from './components/create-reserva-estado-general/create-reserva-estado-general.component';
import { PageReservaEstadoGeneralComponent } from './components/page-reserva-estado-general/page-reserva_estado_general.component';
//import { CreateReservaEstadoGeneralComponent } from './components/create-reserva-estado-general/create-reserva-estado-general.component';
//import { PageReservaEstadoGeneralComponent } from './components/page-reserva-estado-general/page-reserva-estado-general.component';
//import { CreateReservaEstadoGeneralComponent } from './components/create-reserva-estado-general/create-reserva-estado-general.component';
//import { UpdateReservaEstadoGeneralComponent } from './components/update-reserva-estado-general/update-reserva-estado-general.component';
@NgModule({
declarations: [
    CreateReservaEstadoGeneralComponent, 
    PageReservaEstadoGeneralComponent, 
    //UpdateReservaEstadoGeneralComponent
  ],
  imports: [
    CommonModule,
    ReservaEstadoGeneralRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ReservaEstadoGeneralModule { }