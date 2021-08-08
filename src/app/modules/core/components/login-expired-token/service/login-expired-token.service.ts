import { Injectable } from '@angular/core';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { from, Observable } from 'rxjs';
import { AccountService } from '../../../security/service/account.service';
import { LoginExpiredTokenComponent } from '../login-expired-token.component';

@Injectable({
  providedIn: 'root'
})
export class LoginExpiredTokenService {

  constructor(private modalService: ModalService, private accountService: AccountService) { }

  openDialog(): Observable<any> {
    if (this.accountService.getAppOnInit()) {
      const modalRef = this.modalService.open(LoginExpiredTokenComponent, { data: null }, true);
      return modalRef.onResult();
    }
    return from(Promise.resolve(''));
  }
}
