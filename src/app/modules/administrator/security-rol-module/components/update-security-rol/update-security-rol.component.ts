import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { SecurityRol } from '../../domain/security-rol';
import { SecurityRolService } from '../../services/security-rol.service';
import { SistemService } from '../../../sistem-module/services/sistem.service';
import { TableItemService } from '../../../table-item-module/services/table-item.service';
import { TableMasterEnum } from '../../../table-module/enum/table-master.enum';

@Component({
  selector: 'app-update-security-rol',
  templateUrl: './update-security-rol.component.html',
  styleUrls: ['./update-security-rol.component.scss'],
})

export class UpdateSecurityRolComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Editar Rol';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  itemSistem = [];

  listTypeRole = [];
  listStates = [];

  constructor(
    private securityRolService: SecurityRolService,
    private sistemService: SistemService,
    private tableItemService: TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  securityRol: SecurityRol;
  modalInput(securityRol: SecurityRol): void {
    this.securityRol = securityRol;
  }

  ngOnInit(): void {

    this.getTableItemServiceTypesRoles();
    this.getTableItemServiceStates();

    this.sistemService.getSistemList().subscribe((result) => {
      this.itemSistem = result;
    });
    this.getSecurityRol(this.securityRol);
  }

  getTableItemServiceTypesRoles() {
    this.tableItemService
      .getItemsTableMaster(TableMasterEnum.TIPOS_DE_ROLES)
      .subscribe((result) => {
        this.listTypeRole = result;
      });
  }

  getTableItemServiceStates() {
    this.tableItemService
      .getItemsTableMaster(TableMasterEnum.ESTADO_DE_REGISTRO)
      .subscribe((result) => {
        this.listStates = result;
      });
  }

  getSecurityRol(securityRol: SecurityRol) {
    this.securityRolService.getSecurityRol(securityRol.id).subscribe(
      (resultGetSecurityRol) => {
        this.securityRol = SecurityRol.createSecurityRol(resultGetSecurityRol);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  updateSecurityRol() {
    this.securityRolService
      .putSecurityRol(this.securityRol.toDataPersistJson())
      .subscribe(
        (resultPut) => {
          this.alertService.openAlertInfo(resultPut);
          this.modalClose(this.securityRol);
        },
        (errorArray) => {
          this.securityRol.errors = [errorArray];
        }
      );
  }

  validateSaveRegister() {
    if (this.securityRol.isValid) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateSecurityRol();
          }
        });
    }
  }

  cancelRegister() {
    if (this.securityRol.isModified) {
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
