import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { UserRolRoutingModule } from './user-rol-routing.module';
import { PageUserRolComponent } from './components/page-user-rol/page-user-rol.component';
import { CreateUserRolComponent } from './components/create-user-rol/create-user-rol.component';
import { UpdateUserRolComponent } from './components/update-user-rol/update-user-rol.component';

@NgModule({
  declarations: [PageUserRolComponent, CreateUserRolComponent, UpdateUserRolComponent],
  imports: [
    CommonModule,
    UserRolRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UserRolModule { }
