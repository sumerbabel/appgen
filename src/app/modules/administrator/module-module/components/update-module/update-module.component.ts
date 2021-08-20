import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Module } from '../../domain/module';
import { ModuleService } from '../../services/module.service';
import { SistemService } from '../../../sistem-module/Infraestructure/sistem.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.scss'],
})
export class UpdateModuleComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro modules';
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
  modalInput(module: Module): void {
    this.module = module;
  }
  ngOnInit(): void {
    this.sistemService.getByList().subscribe(result=>{
      this.itemSistem=result;
    })

    this.getModule(this.module);

  }
  getModule(module: Module) {
    this.moduleService.getModule(module.id).subscribe(
      (resultGetModule) => {
        this.module = Module.createModule(resultGetModule);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }
  updateModule() {
    this.moduleService.putModule(this.module.toDataPersistJson()).subscribe(
      (resultPut) => {
        this.alertService.openAlertInfo(resultPut);
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
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateModule();
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
