import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HelipopperModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGenericInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
