import { Injectable } from '@angular/core';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { Observable } from 'rxjs';
import { LoginExpiredTokenComponent } from '../login-expired-token.component';

@Injectable({
  providedIn: 'root'
})
export class LoginExpiredTokenService {

  constructor(private modalService: ModalService) { }
  
  openDialog(): Observable<any> {
    const modalRef = this.modalService.open(LoginExpiredTokenComponent, { data:null },true);
    return modalRef.onResult()
  }
}
