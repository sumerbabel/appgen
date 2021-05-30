import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { MenuNodeRoutingModule } from './menu-node-routing.module';

import { PageMenuNodeComponent } from './components/page-menu-node/page-menu-node.component';
import { UpdateMenuNodeComponent } from './components/update-menu-node/update-menu-node.component';


//import { HelipopperModule } from '@ngneat/helipopper';

@NgModule({
  declarations: [PageMenuNodeComponent, UpdateMenuNodeComponent],
  imports: [
    CommonModule,
    MenuNodeRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class MenuNodeModule { }
