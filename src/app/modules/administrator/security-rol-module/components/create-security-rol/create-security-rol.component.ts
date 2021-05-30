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
  selector: 'app-create-security-rol',
  templateUrl: './create-security-rol.component.html',
  styleUrls: ['./create-security-rol.component.scss'],
})
export class CreateSecurityRolComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Rol';
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
  modalInput(): void {}

  ngOnInit(): void {
    this.sistemService.getSistemList().subscribe((result) => {
      this.itemSistem = result;
    });
    this.getTableItemServiceTypesRoles();
    this.getTableItemServiceStates();
    this.securityRol = SecurityRol.createSecurityRolEmpty();
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

  createSecurityRol() {
    this.securityRolService
      .postSecurityRol(this.securityRol.toDataPersistJson())
      .subscribe(
        (resultPost) => {
          this.alertService.openAlertSucsses(resultPost);
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
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createSecurityRol();
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
