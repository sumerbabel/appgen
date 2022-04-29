import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { TableModel } from '@sharedModule/models-core/table-model';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { UserLogin } from '../../security/domain/user-login';
import { AccountService } from '../../security/service/account.service';
import { TestService } from '../../security/service/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ACTION_BTN_LOGIN = ActionButton.LOGIN;
  userLogin: UserLogin = new UserLogin();
  isRemenberUser: boolean = false;
  focusUserName = false;
  focusClave = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private testService: TestService
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
    this.focusUserName = true;
    let userRemenber = this.localStorageService.get('userRemenberMe');
    if (userRemenber) {
      this.userLogin.username_or_email = userRemenber;
      this.isRemenberUser = true;
      this.focusUserName = false;
      this.focusClave = true
    }

    this.test();

  }
  modo =''
  data={'data':[]}
  test() {
    this.testService
      .getTest('')
      .subscribe(
        (resultPost) => {this.data['data'] = resultPost
        this.modo ='ON-LINE'
          this.tableModelSistem.setDataTableAndPaginationToResponse(this.data)
        },
        (errorArray) => {
          this.testService.getTestLocal('').subscribe(
            (resultPost) => {this.data['data']  = resultPost
            this.modo ='OFF-LINE'
              this.tableModelSistem.setDataTableAndPaginationToResponse(this.data)
            },
            (errorArray) => { })
        }
      );
  }

  columnsTable: ColumnModel[] = [
    { key: 'id', title: 'Id' },
    { key: 'name', title: 'Nombre' },
    { key: 'username', title: 'Usuario' },
    { key: 'email', title: 'Correo' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );

  ACTION_BTN_UPDATE = ActionButton.UPDATE;
  updateTest(){
    this.test()
  }

}
