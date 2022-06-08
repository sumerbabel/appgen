import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LocalStorageService } from '../../shared-module/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { LoaderService } from '@sharedModule/components/organims/loader/loader.service';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { User } from '../security/domain/user';
import { LoginExpiredTokenService } from '../components/login-expired-token/service/login-expired-token.service';



@Injectable({
  providedIn: 'root'
})
export class HttpGenericInterceptor implements HttpInterceptor {

  private countRequest = 0;

  constructor(private localStorageService: LocalStorageService, private loaderService: LoaderService, private alertService: AlertService, private loginExpiredTokenService: LoginExpiredTokenService) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: User = this.localStorageService.get('user');
    let cloned = request;
    if (user) {
      const token = user.token;
      cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + token)
      });
    }

    if(this.countRequest==0){
      this.loaderService.show();
    }
    this.countRequest++;

    return next.handle(cloned)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          try {
            const error = errorResponse.error
            if (typeof error === 'string') {
              this.alertService.openAlertWarning(error);
              return throwError(error);
            } else {

              if (error['status'] === '401-expired') {
                this.loginExpiredTokenService.openDialog();

              }else

              if (error['status'] === '401') {
                this.alertService.openAlertWarning(error['message']);
              }else

              if (!error['status']) {
                this.alertService.openAlertWarning('error de conexión / servidor, intente nuevamente');
              }
              return throwError(error['message']);
            }

          }
          catch (e) {
            const error = 'error de conexión / servidor, intente nuevamente *'
            this.alertService.openAlertWarning(error);
            return throwError(error);
          }
        }),
        finalize(() => {
          this.countRequest--;
          if(this.countRequest==0){
            this.loaderService.hide()
          }
        }
        )
      )

  }
}
