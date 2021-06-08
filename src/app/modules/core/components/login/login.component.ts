import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from '@sharedModule/enums-object/action-button';
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

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {
    const user = this.accountService.userValue;
    if (user) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.userLogin.validate()) {
      this.accountService.login(this.userLogin);
    }
  }

  ngOnInit() {

  }

}
