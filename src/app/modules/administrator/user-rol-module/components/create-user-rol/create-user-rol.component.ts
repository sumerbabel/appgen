import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { UserRol } from '../../domain/user-rol';
import { UserRolService } from '../../services/user-rol.service';
import { SecurityRolService } from '../../../security-rol-module/services/security-rol.service';
import { TableItemService } from '../../../table-item-module/services/table-item.service';
import { SistemService } from '../../../sistem-module/Infraestructure/sistem.service';
import { UserSecurity } from '../../../user-security-module/domain/user-security';
import { TableMasterEnum } from '../../../table-module/enum/table-master.enum';

@Component({
  selector: 'app-create-user-rol',
  templateUrl: './create-user-rol.component.html',
  styleUrls: ['./create-user-rol.component.scss'],
})
export class CreateUserRolComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro user_rol';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  listSistem=[];
  listRol =[];
  itemsTable = [];

  constructor(
    private userRolService: UserRolService,
    private securityRolService: SecurityRolService,
    private tableItemService: TableItemService,
    private sistemService:SistemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  userRol: UserRol;
   initialUserSecurity: UserSecurity

  modalInput(userSecurity: UserSecurity): void {
    this.getTableItemService(TableMasterEnum.ESTADO_DE_REGISTRO);
    this.initialUserSecurity =userSecurity;
  }

  ngOnInit(): void {
    this.getListSistems();

    this.userRol = UserRol.createUserRolEmpty();
    this.userRol.idUser =this.initialUserSecurity.id;
  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.itemsTable = result;
    });
  }


  getListSistems(){
    this.sistemService.getByList().subscribe((result) => {
      this.listSistem = result;
    });
  }

  getLislistRols(idSistem : string){
    this.securityRolService.getListSecurityRol(idSistem).subscribe((result) => {
      this.listRol = result;
    });
  }

  ChangeInputSistem(idSistem){
    this.getLislistRols(idSistem);
  }

  createUserRol() {
    this.userRolService.postUserRol(this.userRol.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
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
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createUserRol();
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
