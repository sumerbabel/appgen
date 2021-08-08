import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { UserLogin } from '../../security/domain/user-login';
import { AccountService } from '../../security/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ACTION_BTN_LOGIN = ActionButton.LOGIN;
  userLogin: UserLogin = new UserLogin();
  isRemenberUser:boolean =false;
  focusUserName =false;
  focusClave=false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
  ) {
    const user = this.accountService.userValue;
    if (user) {
      this.router.navigate(['/']);
    }
  }

  login() {
 
    if (this.userLogin.validate()) {
      this.accountService.login(this.userLogin, this.isRemenberUser);
    }
  }

  ngOnInit() {
    this.focusUserName =true;
   let  userRemenber = this.localStorageService.get('userRemenberMe');
   if(userRemenber){
    this.userLogin.username_or_email =userRemenber;
    this.isRemenberUser =true;
    this.focusUserName =false;
    this.focusClave= true
   }

  }

}
