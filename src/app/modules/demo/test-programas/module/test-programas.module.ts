import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestProgramasRoutingModule } from './test-programas-routing.module';
import { GestionProgramaComponent } from '../components/gestion-programa/gestion-programa.component';
import { SharedModule } from '@sharedModule/shared-module';
import { FormsModule } from '@angular/forms';
import { Filter2Component } from '../components/filter/filter.component';
import { ProgramaRegisterComponent } from '../components/programa-register/programa-register.component';



@NgModule({
  declarations: [
    GestionProgramaComponent,
    Filter2Component,
    ProgramaRegisterComponent

  ],
  imports: [
    CommonModule,
    TestProgramasRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class TestProgramasModule { }
