import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Sistem } from '../../domain/sistem';
import * as JSZip from 'jszip';
import { LoaderService } from '@sharedModule/components/organims/loader/loader.service';
import { SistemUseCases } from '../../use-case/sistem-use-case';
@Component({
  selector: 'app-create-sistem',
  templateUrl: './create-sistem.component.html',
  styleUrls: ['./create-sistem.component.scss'],
})
export class CreateSistemComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro sistems';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  constructor(
    private _sistemUseCases:SistemUseCases,
    private alertService: AlertService,
    private dialogService: DialogService,
    private loaderService:LoaderService
  ) {
    super();
  }
  sistem: Sistem;
  modalInput(): void {}
  ngOnInit(): void {
    this.sistem = Sistem.createSistemEmpty();
  }
  createSistem() {
    this._sistemUseCases.saveNew(this.sistem.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
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
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createSistem();
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

  files = [];

  fileImputChange($event) {
    this.loaderService.show();
    if ($event.target.files.length > 0) {
      this.files = $event.target.files;
      const formData = new FormData();
      let zipFile: JSZip = new JSZip();
      for (let index = 0; index < this.files.length; index++) {
        zipFile.folder('zipFiles').file(this.files[index].name,this.files[index]);
      }

      zipFile.generateAsync({type: "blob",
      compression: "STORE"})
      .then((content)=> {


        const url = window.URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download ='archivozip.zip';
        a.click();
        window.URL.revokeObjectURL(url);
    }).finally(()=>{
      this.loaderService.hide();
    });

    } else {
      this.loaderService.hide();
    }
  }

}
