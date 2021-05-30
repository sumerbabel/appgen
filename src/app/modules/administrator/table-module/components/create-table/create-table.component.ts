import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Table } from '../../domain/table';
import { TableService } from '../../services/table.service';
import { TableMasterEnum } from '../../enum/table-master.enum';
import { TableItemService } from '../../../table-item-module/services/table-item.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss'],
})

export class CreateTableComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro tables';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  itemsTable =[];

  constructor(
    private tableService: TableService,
    private tableItemService:TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  table: Table;
  modalInput(): void {}
  ngOnInit(): void {
    this.getTableItemService(TableMasterEnum.ESTADO_DE_REGISTRO);
    this.table = Table.createTableEmpty();
  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.itemsTable = result;
    });
  }


  createTable() {
    this.tableService.postTable(this.table.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
        this.modalClose(this.table);
      },
      (errorArray) => {
        this.table.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.table.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createTable();
          }
        });
    }
  }

  cancelRegister() {
    if (this.table.isModified) {
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
