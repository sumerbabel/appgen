import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { FileApp } from '../../domain/fileApp';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss'],
})
export class CreateFileComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro files';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  constructor(
    private fileService: FileService,
    private alertService: AlertService,
    private dialogService: DialogService
  )
  {
    super();
  }

  file: FileApp;
  modalInput(): void {}
  ngOnInit(): void {
    this.file = FileApp.createFileEmpty();
  }
  createFile() {
    this.fileService.postFile(this.file.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
        this.modalClose(this.file);
      },
      (errorArray) => {
        this.file.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.file.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createFile();
          }
        });
    }
  }

  cancelRegister() {
    if (this.file.isModified) {
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
