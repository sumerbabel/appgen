import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalizationModule } from './globalization';
import { MaterialCoreModule } from './material';

@NgModule({
  exports: [
    GlobalizationModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialCoreModule,
  ],
})
export class CoreModule {}
