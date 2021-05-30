import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { RolMenuRoutingModule } from './rol-menu-routing.module';
import { PageRolMenuComponent } from './components/page-rol-menu/page-rol-menu.component';
import { CreateRolMenuComponent } from './components/create-rol-menu/create-rol-menu.component';
import { UpdateRolMenuComponent } from './components/update-rol-menu/update-rol-menu.component';

@NgModule({
  declarations: [PageRolMenuComponent, CreateRolMenuComponent, UpdateRolMenuComponent],
  imports: [
    CommonModule,
    RolMenuRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class RolMenuModule { }
