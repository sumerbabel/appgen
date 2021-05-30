import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { DataModel } from '@sharedModule/models-core/data-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateUserRolComponent } from '../create-user-rol/create-user-rol.component';
import { UpdateUserRolComponent } from '../update-user-rol/update-user-rol.component';
import { UserRol } from '../../domain/user-rol';
import { UserRolService } from '../../services/user-rol.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { UserSecurity } from '../../../user-security-module/domain/user-security';

@Component({
  selector: 'app-page-user-rol',
  templateUrl: './page-user-rol.component.html',
  styleUrls: ['./page-user-rol.component.scss'],
})

export class PageUserRolComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Lista de UserRols';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = true;
  tableModelUserRol: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'sistem_name', title: 'Sistema' },
    { key: 'rol_name', title: 'Rol' },
    { key: 'name_state', title: 'Estado' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private userRolService: UserRolService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {
    super();
  }

  initialUserSecurity: UserSecurity;

  modalInput(userSecurity: UserSecurity): void {
    this.initialUserSecurity = userSecurity;
  }

  ngOnInit(): void {
    this.getUserRolItemsToTable();
  }

  getUserRolItemsToTable() {
    this.userRolService
      .getAllUserRol(this.initialUserSecurity.id)
      .subscribe((resultGet) => {
        let userRols = resultGet;
        this.tableModelUserRol = new TableModel(
          this.columnsTable,
          this.actionsTable,
          userRols
        );
      });
  }

  createUserRolOpenModal(): void {
    const modalRef = this.modalService.open(
      CreateUserRolComponent,
      this.initialUserSecurity
    );
    modalRef.onResult().subscribe((closed) => {
      this.getUserRolItemsToTable();
    });
  }

  updateUserRolOpenModal(userRol: UserRol): void {
    const modalRef = this.modalService.open(UpdateUserRolComponent, userRol);
    modalRef.onResult().subscribe((closed) => {
      this.getUserRolItemsToTable();
    });
  }

  deleteServiceExecute(userRol: UserRol) {
    this.userRolService.deleteUserRol(userRol.id).subscribe(
      (resultDelete) => {
        this.getUserRolItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteUserRolOpenModal(userRol: UserRol): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${userRol['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(userRol);
        }
      });
  }

  tableUserRolActions($event: EventAction<UserRol>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateUserRolOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteUserRolOpenModal($event.dataModel);
        break;
    }
  }

  formAction($event) {
    switch ($event) {
      case ActionGeneric.CLOSE:
        this.modalClose();
        break;
    }
  }
}
