import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { UserRol } from '../../domain/user-rol';
import { UserRolService } from '../../services/user-rol.service';
import { TableItemService } from '../../../table-item-module/services/table-item.service';
import { TableMasterEnum } from '../../../table-module/enum/table-master.enum';

@Component({
  selector: 'app-update-user-rol',
  templateUrl: './update-user-rol.component.html',
  styleUrls: ['./update-user-rol.component.scss'],
})

export class UpdateUserRolComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro user_rol';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  constructor(
    private userRolService: UserRolService,
    private tableItemService: TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  itemsTable = [];
  userRol: UserRol;
  modalInput(userRol: UserRol): void {
    this.userRol = userRol;
  }

  ngOnInit(): void {
    this.getTableItemService(TableMasterEnum.ESTADO_DE_REGISTRO);
    this.getUserRol(this.userRol);
  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.itemsTable = result;
    });
  }

  getUserRol(userRol: UserRol) {
    this.userRolService.getUserRol(userRol.id).subscribe(
      (resultGetUserRol) => {
        this.userRol = UserRol.createUserRol(resultGetUserRol);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  updateUserRol() {
    this.userRolService.putUserRol(this.userRol.toDataPersistJson()).subscribe(
      (resultPut) => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.userRol);
      },
      (errorArray) => {
        this.userRol.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.userRol.isValid) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateUserRol();
          }
        });
    }
  }

  cancelRegister() {
    if (this.userRol.isModified) {
      this.dialogService
        .openDialog({
          title: 'Cancelar Registro',
          textDialog:
            '¿Está seguro de CANCELAR el registro, al realizar esta acción se perderán los datos ingresados o modificados?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.modalCancel();
          }
        });
    } else {
      this.modalCancel();
    }
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.SAVE:
        this.validateSaveRegister();
        break;
      case ActionGeneric.CANCEL:
        this.cancelRegister();
        break;
      case ActionGeneric.CLOSE:
        this.cancelRegister();
        break;
    }
  }

}
