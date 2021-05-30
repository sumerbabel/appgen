import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { FileRoutingModule } from './file-routing.module';
import { PageFileComponent } from './components/page-file/page-file.component';
import { CreateFileComponent } from './components/create-file/create-file.component';
import { UpdateFileComponent } from './components/update-file/update-file.component';
import { ListFilesComponent } from './components/list-files/list-files.component';

@NgModule({
  declarations: [PageFileComponent, CreateFileComponent, UpdateFileComponent, ListFilesComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports:[ListFilesComponent]
})
export class FileModule { }
