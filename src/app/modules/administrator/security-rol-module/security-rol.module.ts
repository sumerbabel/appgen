import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { SecurityRolRoutingModule } from './security-rol-routing.module';
import { PageSecurityRolComponent } from './components/page-security-rol/page-security-rol.component';
import { CreateSecurityRolComponent } from './components/create-security-rol/create-security-rol.component';
import { UpdateSecurityRolComponent } from './components/update-security-rol/update-security-rol.component';

@NgModule({
  declarations: [PageSecurityRolComponent, CreateSecurityRolComponent, UpdateSecurityRolComponent],
  imports: [
    CommonModule,
    SecurityRolRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class SecurityRolModule { }
