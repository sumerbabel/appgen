import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { GroupCodeRoutingModule } from './group-code-routing.module';
import { PageGroupCodeComponent } from './components/page-group-code/page-group-code.component';
import { CreateGroupCodeComponent } from './components/create-group-code/create-group-code.component';
import { ViewCodeComponent } from './components/view-code/view-code.component';
import { FileModule } from '../file-module/file.module';

@NgModule({
  declarations: [PageGroupCodeComponent, CreateGroupCodeComponent, ViewCodeComponent],
  imports: [
    CommonModule,
    GroupCodeRoutingModule,
    SharedModule,
    FormsModule,
    FileModule
  ]
})
export class GroupCodeModule { }
