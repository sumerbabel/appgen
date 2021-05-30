import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { RolMenu } from '../../domain/rol-menu';
import { RolMenuService } from '../../services/rol-menu.service';
@Component({
  selector: 'app-update-rol-menu',
  templateUrl: './update-rol-menu.component.html',
  styleUrls: ['./update-rol-menu.component.scss'],
})
export class UpdateRolMenuComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro rol_menu';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  constructor(
    private rolMenuService: RolMenuService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  rolMenu: RolMenu;
  modalInput(rolMenu: RolMenu): void {
    this.rolMenu = rolMenu;
  }

  ngOnInit(): void {
    this.getRolMenu(this.rolMenu);
  }

  getRolMenu(rolMenu: RolMenu) {
    this.rolMenuService.getRolMenu(rolMenu.id).subscribe(
      (resultGetRolMenu) => {
        this.rolMenu = RolMenu.createRolMenu(resultGetRolMenu);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  updateRolMenu() {
    this.rolMenuService.putRolMenu(this.rolMenu.toDataPersistJson()).subscribe(
      (resultPut) => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.rolMenu);
      },
      (errorArray) => {
        this.rolMenu.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.rolMenu.isValid) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateRolMenu();
          }
        });
    }
  }

  cancelRegister() {
    if (this.rolMenu.isModified) {
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
