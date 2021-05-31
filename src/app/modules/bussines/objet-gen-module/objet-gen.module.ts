import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { ObjetGenRoutingModule } from './objet-gen-routing.module';
import { PageObjetGenComponent } from './components/page-objet-gen/page-objet-gen.component';
import { CreateObjetGenComponent } from './components/create-objet-gen/create-objet-gen.component';
import { UpdateObjetGenComponent } from './components/update-objet-gen/update-objet-gen.component';
@NgModule({
  declarations: [PageObjetGenComponent, CreateObjetGenComponent, UpdateObjetGenComponent],
  imports: [
    CommonModule,
    ObjetGenRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ObjetGenModule { }
