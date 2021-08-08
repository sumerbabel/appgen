import { Component, OnInit } from '@angular/core';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { User } from '../../security/domain/user';
import { UserLogin } from '../../security/domain/user-login';
import { AccountService } from '../../security/service/account.service';
import { UserLoginService } from '../../security/service/user-login.service';

@Component({
  selector: 'login-expired-token',
  templateUrl: './login-expired-token.component.html',
  styleUrls: ['./login-expired-token.component.scss']
})
export class LoginExpiredTokenComponent extends Modal implements OnInit {

  ACTION_BTN_LOGIN = ActionButton.LOGIN;
  userLogin: UserLogin = new UserLogin()
  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private userLoginService : UserLoginService
  ) {
    super();
    this.userLogin.username_or_email= this.accountService.userValue.username;
  }

  modalInput(inputs: any): void {
   
  }

  ngOnInit() {

  }

  loginRefresh() {
    if (this.userLogin.validate()) {
      this.loginRefreshTokenService(this.userLogin);
    }
  }

  loginRefreshTokenService(userLogin: UserLogin) {
    this.userLoginService.postUserModelLogin(userLogin).subscribe((result: { jwtClaims:{token: string, expiredMinutes:number}; user: { username: string; }; }) => {
    let user = new User();
    user.token = result.jwtClaims.token;
    user.username = result.user.username;
    user.isExpiredToken = false;
    this.localStorageService.set('user', user);
    this.modalClose(null);
  });
}

close(){
  this.accountService.logout();
}

}
