import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageGeneratorNodeComponent } from './components/page-generator-node/page-generator-node.component';

const routes: Routes = [{ path: '', component: PageGeneratorNodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorNodeRoutingModule {}
