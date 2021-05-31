import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalizationModule } from './globalization';
import { MaterialCoreModule } from './material';

@NgModule({
  exports: [
    GlobalizationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialCoreModule,
  ],
})
export class CoreModule {}
