import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ObjetGen } from '../../domain/objet-gen';
import { ObjetGenService } from '../../services/objet-gen.service';
@Component({
  selector: 'app-update-objet-gen',
  templateUrl: './update-objet-gen.component.html',
  styleUrls: ['./update-objet-gen.component.scss']
})
export class UpdateObjetGenComponent extends Modal implements OnInit {
TITLE_HEADER_FORM = "Actualizar Registro objet_gen";
  TEXT_FOOTER = "* Campos Obligatorios";
  ACTION_FORM: ModelAction[] = [ ActionButton.SAVE,ActionButton.CANCEL];
constructor(private objetGenService: ObjetGenService,
    private alertService: AlertService,
    private dialogService:DialogService) { super(); }
objetGen: ObjetGen;
modalInput(objetGen: ObjetGen): void {
    this.objetGen= objetGen;
  }
ngOnInit(): void {
    this.getObjetGen(this.objetGen);
  }
getObjetGen(objetGen: ObjetGen) {
    this.objetGenService.getObjetGen(objetGen.id)
      .subscribe(
        resultGetObjetGen => {
          this.objetGen = ObjetGen.createObjetGen(resultGetObjetGen)
        },
        errorArray => {
          this.alertService.openAlertWarning(errorArray);
        }
      )
  }
updateObjetGen() {
    this.objetGenService.putObjetGen(this.objetGen.toDataPersistJson()).subscribe(
      resultPut => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.objetGen);
      },
      errorArray => {
        this.objetGen.errors=[errorArray];
      }
    )
  }
validateSaveRegister() {
    if (this.objetGen.isValid) {
      this.dialogService.openDialog({ title: 'Actualizar Registro', textDialog: '¿Está seguro de actualizar el registro?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) { this.updateObjetGen(); }
        }
      )
    }
  }
cancelRegister() {
    if (this.objetGen.isModified) {
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
