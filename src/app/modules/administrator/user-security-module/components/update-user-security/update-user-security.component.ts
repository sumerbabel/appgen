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
  selector: 'app-update-user-security',
  templateUrl: './update-user-security.component.html',
  styleUrls: ['./update-user-security.component.scss']
})
export class UpdateUserSecurityComponent extends Modal implements OnInit {
TITLE_HEADER_FORM = "Actualizar Registro user_security";
  TEXT_FOOTER = "* Campos Obligatorios";
  ACTION_FORM: ModelAction[] = [ ActionButton.SAVE,ActionButton.CANCEL];
constructor(private userSecurityService: UserSecurityService,
    private alertService: AlertService,
    private dialogService:DialogService) { super(); }
userSecurity: UserSecurity;
modalInput(userSecurity: UserSecurity): void {
    this.userSecurity= userSecurity;
  }
ngOnInit(): void {
    this.getUserSecurity(this.userSecurity);
  }
getUserSecurity(userSecurity: UserSecurity) {
    this.userSecurityService.getUserSecurity(userSecurity.id)
      .subscribe(
        resultGetUserSecurity => {
          this.userSecurity = UserSecurity.createUserSecurity(resultGetUserSecurity)
        },
        errorArray => {
          this.alertService.openAlertWarning(errorArray);
        }
      )
  }
updateUserSecurity() {
    this.userSecurityService.putUserSecurity(this.userSecurity.toDataPersistJson()).subscribe(
      resultPut => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.userSecurity);
      },
      errorArray => {
        this.userSecurity.errors=[errorArray];
      }
    )
  }
validateSaveRegister() {
    if (this.userSecurity.isValid) {
      this.dialogService.openDialog({ title: 'Actualizar Registro', textDialog: '¿Está seguro de actualizar el registro?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) { this.updateUserSecurity(); }
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
