import { registerLocaleData } from '@angular/common';
import britishLocale from '@angular/common/locales/eS-PE';
import { NgModule, LOCALE_ID } from '@angular/core';

const britishLocaleId: string = 'es-PE';

registerLocaleData(britishLocale, britishLocaleId );

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: britishLocaleId },
  ],
})
export class GlobalizationModule {}
