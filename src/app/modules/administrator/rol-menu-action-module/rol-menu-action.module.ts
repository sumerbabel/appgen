import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { RolMenuActionRoutingModule } from './rol-menu-action-routing.module';
import { PageRolMenuActionComponent } from './components/page-rol-menu-action/page-rol-menu-action.component';
import { CreateRolMenuActionComponent } from './components/create-rol-menu-action/create-rol-menu-action.component';
import { EditMenuNodeActionComponent } from './components/edit-menu-node-action/edit-menu-node-action.component';
import { EditRolMenuActionComponent } from './components/edit-rol-menu-action/edit-rol-menu-action.component';


@NgModule({
  declarations: [PageRolMenuActionComponent, CreateRolMenuActionComponent, EditRolMenuActionComponent, EditMenuNodeActionComponent],
  imports: [
    CommonModule,
    RolMenuActionRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class RolMenuActionModule { }
