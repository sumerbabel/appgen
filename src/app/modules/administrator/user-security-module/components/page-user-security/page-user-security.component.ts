import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateUserSecurityComponent } from '../create-user-security/create-user-security.component';
import { UpdateUserSecurityComponent } from '../update-user-security/update-user-security.component';
import { UserSecurity } from '../../domain/user-security';
import { UserSecurityService } from '../../services/user-security.service';
import { PageUserRolComponent } from '../../../user-rol-module/components/page-user-rol/page-user-rol.component';

@Component({
  selector: 'app-page-user-security',
  templateUrl: './page-user-security.component.html',
  styleUrls: ['./page-user-security.component.scss'],
})
export class PageUserSecurityComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de UserSecuritys';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  tableModelUserSecurity: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'username', title: 'Username' },
    { key: 'email', title: 'Email' },
    { key: 'email_verified_at', title: 'EmailVerifiedAt' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];
  miniButton = ActionButton.MINI_OPEN;

  actionsTable: ModelAction[] = [
    this.miniButton,
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private userSecurityService: UserSecurityService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUserSecurityItemsToTable();
  }

  getUserSecurityItemsToTable() {
    this.userSecurityService.getUserSecurity().subscribe((resultGet) => {
      let userSecuritys = resultGet;

      this.tableModelUserSecurity = new TableModel(
        this.columnsTable,
        this.actionsTable,
        userSecuritys
      );
    });
  }

  createUserSecurityOpenModal(): void {
    const modalRef = this.modalService.open(CreateUserSecurityComponent);
    modalRef.onResult().subscribe((closed) => {
      this.getUserSecurityItemsToTable();
    });
  }
  updateUserSecurityOpenModal(userSecurity: UserSecurity): void {
    const modalRef = this.modalService.open(
      UpdateUserSecurityComponent,
      userSecurity
    );
    modalRef.onResult().subscribe((closed) => {
      this.getUserSecurityItemsToTable();
    });
  }

  deleteServiceExecute(userSecurity: UserSecurity) {
    this.userSecurityService.deleteUserSecurity(userSecurity.id).subscribe(
      (resultDelete) => {
        this.getUserSecurityItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteUserSecurityOpenModal(userSecurity: UserSecurity): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${userSecurity['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(userSecurity);
        }
      });
  }

  tableUserSecurityActions($event: EventAction<UserSecurity>) {
    switch ($event.action) {
      case ActionGeneric.OPEN:
        this.pageUserRolComponentOpenModal($event.dataModel);
        break;
      case ActionGeneric.EDIT:
        this.updateUserSecurityOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteUserSecurityOpenModal($event.dataModel);
        break;
    }
  }

  pageUserRolComponentOpenModal(userSecurity: UserSecurity) {
    const modalRef = this.modalService.open(PageUserRolComponent, userSecurity);
    modalRef.onResult().subscribe((closed) => {
      this.getUserSecurityItemsToTable();
    });
  }
}
