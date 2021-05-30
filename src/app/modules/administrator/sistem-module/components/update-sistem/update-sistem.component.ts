import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Sistem } from '../../domain/sistem';
import { SistemService } from '../../services/sistem.service';
@Component({
  selector: 'app-update-sistem',
  templateUrl: './update-sistem.component.html',
  styleUrls: ['./update-sistem.component.scss'],
})
export class UpdateSistemComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro sistems';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  constructor(
    private sistemService: SistemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }
  sistem: Sistem;
  modalInput(sistem: Sistem): void {
    this.sistem = sistem;
  }
  ngOnInit(): void {
    this.getSistem(this.sistem);
  }
  getSistem(sistem: Sistem) {
    this.sistemService.getSistem(sistem.id).subscribe(
      (resultGetSistem) => {
        this.sistem = Sistem.createSistem(resultGetSistem);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }
  updateSistem() {
    this.sistemService.putSistem(this.sistem.toDataPersistJson()).subscribe(
      (resultPut) => {
        this.alertService.openAlertInfo(resultPut);
        this.modalClose(this.sistem);
      },
      (errorArray) => {
        this.sistem.errors = [errorArray];
      }
    );
  }
  validateSaveRegister() {
    if (this.sistem.isValid) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateSistem();
          }
        });
    }
  }
  cancelRegister() {
    if (this.sistem.isModified) {
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
