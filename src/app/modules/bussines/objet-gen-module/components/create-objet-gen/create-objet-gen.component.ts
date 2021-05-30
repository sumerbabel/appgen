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
  selector: 'app-create-objet-gen',
  templateUrl: './create-objet-gen.component.html',
  styleUrls: ['./create-objet-gen.component.scss']
})
export class CreateObjetGenComponent extends Modal implements OnInit {
TITLE_HEADER_FORM = "Nuevo Registro objet_gen";
  TEXT_FOOTER = "* Campos Obligatorios";
  ACTION_FORM: ModelAction[] = [ ActionButton.SAVE,ActionButton.CANCEL];
constructor(private objetGenService: ObjetGenService,
    private alertService: AlertService,
    private dialogService:DialogService) { 
super(); }
objetGen: ObjetGen;
  modalInput(): void {}
ngOnInit(): void {
    this.objetGen = ObjetGen.createObjetGenEmpty();
  }
createObjetGen() {
    this.objetGenService.postObjetGen(this.objetGen.toDataPersistJson())
      .subscribe(
        resultPost => {
          this.alertService.openAlertSucsses(resultPost);
          this.modalClose(this.objetGen);
        },
        errorArray => {
          this.objetGen.errors = [errorArray];
        }
      )
  }

  validateSaveRegister() {
    if (this.objetGen.isValid) {
      this.dialogService.openDialog({ title: 'Guardar Registro', textDialog: '¿Está seguro de GUARDAR el registro?' }).subscribe(
        resultDialog => {
          if (resultDialog === ActionGeneric.YES) {
            this.createObjetGen();
          }
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
