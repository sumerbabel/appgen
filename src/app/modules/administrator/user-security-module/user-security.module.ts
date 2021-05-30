import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { UserSecurityRoutingModule } from './user-security-routing.module';
import { PageUserSecurityComponent } from './components/page-user-security/page-user-security.component';
import { CreateUserSecurityComponent } from './components/create-user-security/create-user-security.component';
import { UpdateUserSecurityComponent } from './components/update-user-security/update-user-security.component';

@NgModule({
  declarations: [PageUserSecurityComponent, CreateUserSecurityComponent, UpdateUserSecurityComponent],
  imports: [
    CommonModule,
    UserSecurityRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UserSecurityModule { }
