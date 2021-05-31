import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GeneratorNodeRoutingModule } from './generator-node-routing.module';

import { SharedModule } from '@sharedModule/shared-module';
import { EditGeneratorFieldNodeComponent } from './components/edit-generator-field-node/edit-generator-field-node.component';
import { PageGeneratorNodeComponent } from './components/page-generator-node/page-generator-node.component';
import { EditGeneratorNodeComponent } from './components/edit-generator-node/edit-generator-node.component';
@NgModule({
  declarations: [
    EditGeneratorFieldNodeComponent,
    PageGeneratorNodeComponent,
    EditGeneratorNodeComponent,
  ],
  imports: [
    CommonModule,
    GeneratorNodeRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    EditGeneratorFieldNodeComponent,
    PageGeneratorNodeComponent,
    EditGeneratorNodeComponent,
  ]
})
export class GeneratorNodeModule {}
