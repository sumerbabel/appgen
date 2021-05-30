import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { UserSecurity } from '../../domain/user-security';
import { UserSecurityService } from '../../services/user-security.service';
@Component({
  selector: 'app-create-user-security',
  templateUrl: './create-user-security.component.html',
  styleUrls: ['./create-user-security.component.scss']
})
export class CreateUserSecurityComponent extends Modal implements OnInit {
TITLE_HEADER_FORM = "Nuevo Registro user_security";
  TEXT_FOOTER = "* Campos Obligatorios";
  ACTION_FORM: ModelAction[] = [ ActionButton.SAVE,ActionButton.CANCEL];
constructor(private userSecurityService: UserSecurityService,
    private alertService: AlertService,
    private dialogService:DialogService) { 
super(); }
userSecurity: UserSecurity;
  modalInput(): void {}
ngOnInit(): void {
    this.userSecurity = UserSecurity.createUserSecurityEmpty();
  }
createUserSecurity() {
    this.userSecurityService.postUserSecurity(this.userSecurity.toDataPersistJson())
      .subscribe(
        resultPost => {
          this.alertService.openAlertSucsses(resultPost);
          this.modalClose(this.userSecurity);
        },
        errorArray => {
          this.userSecurity.errors = [errorArray];
        }
      )
  }

  validateSaveRegister() {
    if (this.userSecurity.isValid) {
      this.dialogService.openDialog({ title: 'Guardar Registro', textDialog: '¿Está seguro de GUARDAR el registro?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) {
            this.createUserSecurity();
          }
        }
      )
    }
  }

  cancelRegister() {
    if (this.userSecurity.isModified) {
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
