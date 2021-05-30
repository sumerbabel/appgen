import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared-module';

import { GeneratorNodeRoutingModule } from './generator-node-routing.module';
import { EditGeneratorNodeComponent } from './components/edit-generator-node/edit-generator-node.component';
import { PageGeneratorNodeComponent } from './components/page-generator-node/page-generator-node.component';
import { EditGeneratorFieldNodeComponent } from './components/edit-generator-field-node/edit-generator-field-node.component';
@NgModule({
  declarations: [
    PageGeneratorNodeComponent,
    EditGeneratorNodeComponent,
    EditGeneratorFieldNodeComponent,
  ],
  imports: [
    CommonModule,
    GeneratorNodeRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class GeneratorNodeModule {}
