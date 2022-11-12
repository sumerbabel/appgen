import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HelipopperModule } from '@ngneat/helipopper';
import { SharedModule } from '@sharedModule/shared-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterTableListComponent } from './modules/core/components/master-table/master-table-list/master-table-list.component';
import { MenuComponent } from './modules/core/components/menu/menu.component';
import { HttpGenericInterceptor } from './modules/core/http-service/http-generic.interceptor';
import { HomeComponent } from './modules/core/components/home/home.component';
import { LoginComponent } from './modules/core/components/login/login.component';
import { RegisterComponent } from './modules/core/components/register/register.component';
import { CommonModule } from '@angular/common';
import { LoginExpiredTokenComponent } from './modules/core/components/login-expired-token/login-expired-token.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appInitializer } from './modules/core/appInicialice/app.initializer';
import { AccountService } from './modules/core/security/service/account.service';
import { SistemGateway } from './modules/administrator/sistem-module/domain/sistem-gateway';
import { SistemService } from './modules/administrator/sistem-module/Infraestructure/sistem.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PROGRAMA_REPOSITORY_TYPE } from './modules/demo/test-programas/c-infraestructure/programa-respository-type';

import { ProgramaHttpRepository } from './modules/demo/test-programas/c-infraestructure/programa-http-repository';


@NgModule({
  declarations: [
    AppComponent,
    MasterTableListComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoginExpiredTokenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HelipopperModule.forRoot(),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGenericInterceptor,
      multi: true,
    },
    {provide: SistemGateway, useClass: SistemService},
    {
      provide: PROGRAMA_REPOSITORY_TYPE,useClass:ProgramaHttpRepository,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
