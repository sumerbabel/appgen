import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Module } from '../../domain/module';
import { ModuleService } from '../../services/module.service';
import { SistemService } from '../../../sistem-module/services/sistem.service';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss'],
})
export class CreateModuleComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro modules';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  itemSistem = [];
  constructor(
    private moduleService: ModuleService,
    private sistemService: SistemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }
  module: Module;
  modalInput(): void {}
  ngOnInit(): void {
    this.module = Module.createModuleEmpty();
    this.sistemService.getSistemList().subscribe((result) => {
      this.itemSistem = result;
    });
  }
  createModule() {
    this.moduleService.postModule(this.module.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
        this.modalClose(this.module);
      },
      (errorArray) => {
        this.module.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.module.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createModule();
          }
        });
    }
  }

  cancelRegister() {
    if (this.module.isModified) {
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
