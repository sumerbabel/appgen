import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { UuidService } from '@sharedModule/services/uuid/uuid.service';
import { UserAccount } from '../../security/domain/user-account';
import { AccountService } from '../../security/service/account.service';
import { UserRegisterService } from '../../security/service/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ACTION_BTN_REGISTER = [ActionButton.REGISTER];
  userRegister = new UserAccount();

  constructor(
    private uuidService: UuidService,
    private userRegisterService: UserRegisterService,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    const user = this.accountService.userValue;
    if (user) {
      this.router.navigate(['/']);
    }
    console.log('inica REGISTER')
  }

  ngOnInit() {}

  register() {
    this.userRegister.id = this.uuidService.uuidGenerate();
    if (this.userRegister.validate()) {
      this.userRegisterService
        .postUserModelRegister(this.userRegister)
        .subscribe((result) => {
          this.alertService.openAlertSucsses(
            'Registro exitoso!, se envió un link de confirmación a tu correo'
          );
          this.router.navigate(['/public/login']);
        });
    }
  }
}
