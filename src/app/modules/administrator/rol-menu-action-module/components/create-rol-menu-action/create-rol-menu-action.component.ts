import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { RolMenuAction } from '../../domain/rol-menu-action';
import { RolMenuActionService } from '../../services/rol-menu-action.service';
@Component({
  selector: 'app-create-rol-menu-action',
  templateUrl: './create-rol-menu-action.component.html',
  styleUrls: ['./create-rol-menu-action.component.scss']
})
export class CreateRolMenuActionComponent extends Modal implements OnInit {
TITLE_HEADER_FORM = "Nuevo Registro rol_menu_actions";
  TEXT_FOOTER = "* Campos Obligatorios";
  ACTION_FORM: ModelAction[] = [ ActionButton.SAVE,ActionButton.CANCEL];
constructor(private rolMenuActionService: RolMenuActionService,
    private alertService: AlertService,
    private dialogService:DialogService) { 
super(); }
rolMenuAction: RolMenuAction;
  modalInput(): void {}
ngOnInit(): void {
    this.rolMenuAction = RolMenuAction.createRolMenuActionEmpty();
  }
createRolMenuAction() {
    this.rolMenuActionService.postRolMenuAction(this.rolMenuAction.toDataPersistJson())
      .subscribe(
        resultPost => {
          this.alertService.openAlertSucsses(resultPost);
          this.modalClose(this.rolMenuAction);
        },
        errorArray => {
          this.rolMenuAction.errors = [errorArray];
        }
      )
  }

  validateSaveRegister() {
    if (this.rolMenuAction.isValid) {
      this.dialogService.openDialog({ title: 'Guardar Registro', textDialog: '¿Está seguro de GUARDAR el registro?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) {
            this.createRolMenuAction();
          }
        }
      )
    }
  }

  cancelRegister() {
    if (this.rolMenuAction.isModified) {
      this.dialogService.openDialog({ title: 'Cancelar Registro', textDialog: '¿Está seguro de CANCELAR el registro, al realizar esta acción se perderán los datos ingresados o modificados?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) {this.modalCancel();}
        }
      )
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
