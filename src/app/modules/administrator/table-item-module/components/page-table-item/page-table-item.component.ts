import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { DataModel } from '@sharedModule/models-core/data-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateTableItemComponent } from '../create-table-item/create-table-item.component';
import { UpdateTableItemComponent } from '../update-table-item/update-table-item.component';
import { TableItem } from '../../domain/table-item';
import { TableItemService } from '../../services/table-item.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { Table } from '../../../table-module/domain/table';

@Component({
  selector: 'app-page-table-item',
  templateUrl: './page-table-item.component.html',
  styleUrls: ['./page-table-item.component.scss'],
})

export class PageTableItemComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Lista de TableItems';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = true;
  tableModelTableItem: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Nombre' },
    { key: 'code', title: 'Código' },
    { key: 'value', title: 'Valor' },
    { key: 'order', title: 'Orden' },
    { key: 'name_state', title: 'Estado' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private tableItemService: TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) { super()}


initialTable: Table
  modalInput(table: Table): void {
    this.initialTable = table;
  }


  ngOnInit(): void {
    this.getTableItemItemsToTable();
  }

  getTableItemItemsToTable() {
    this.tableItemService.getAllTableItem(this.initialTable.id).subscribe((resultGet) => {
      let tableItems = resultGet;
      this.tableModelTableItem = new TableModel(
        this.columnsTable,
        this.actionsTable,
        tableItems
      );
    });
  }

  createTableItemOpenModal(): void {
    const modalRef = this.modalService.open(CreateTableItemComponent,this.initialTable);
    modalRef.onResult().subscribe((closed) => {
      this.getTableItemItemsToTable();
    });
  }

  updateTableItemOpenModal(tableItem: TableItem): void {
    const modalRef = this.modalService.open(
      UpdateTableItemComponent,
      tableItem
    );
    modalRef.onResult().subscribe((closed) => {
      this.getTableItemItemsToTable();
    });
  }

  deleteServiceExecute(tableItem: TableItem) {
    this.tableItemService.deleteTableItem(tableItem.id).subscribe(
      (resultDelete) => {
        this.getTableItemItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteTableItemOpenModal(tableItem: TableItem): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${tableItem['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(tableItem);
        }
      });
  }

  tableTableItemActions($event: EventAction<TableItem>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateTableItemOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteTableItemOpenModal($event.dataModel);
        break;
    }
  }

  formAction($event) {
    switch ($event) {
      case ActionGeneric.CLOSE:
        this.modalClose();
        break;
    }
  }

}
