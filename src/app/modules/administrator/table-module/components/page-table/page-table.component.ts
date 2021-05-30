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
import { CreateTableComponent } from '../create-table/create-table.component';
import { UpdateTableComponent } from '../update-table/update-table.component';
import { Table } from '../../domain/table';
import { TableService } from '../../services/table.service';
import { PageTableItemComponent } from '../../../table-item-module/components/page-table-item/page-table-item.component';


@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.scss'],
})

export class PageTableComponent implements OnInit {

  TITLE_HEADER_FORM = 'Lista de Tables';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  tableModelTable: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'code', title: 'Código' },
    { key: 'name', title: 'Nombre' },
    { key: 'name_state', title: 'Estado' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_OPEN,
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];
  constructor(
    private tableService: TableService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getTableItemsToTable();
  }

  getTableItemsToTable() {
    this.tableService.getTable().subscribe((resultGet) => {
      let tables = resultGet;
      this.tableModelTable = new TableModel(
        this.columnsTable,
        this.actionsTable,
        tables
      );
    });
  }

  createTableOpenModal(): void {
    const modalRef = this.modalService.open(CreateTableComponent);
    modalRef.onResult().subscribe((closed) => {
      this.getTableItemsToTable();
    });
  }

  updateTableOpenModal(table: Table): void {
    const modalRef = this.modalService.open(UpdateTableComponent, table);
    modalRef.onResult().subscribe((closed) => {
      this.getTableItemsToTable();
    });
  }

  deleteServiceExecute(table: Table) {
    this.tableService.deleteTable(table.id).subscribe(
      (resultDelete) => {
        this.getTableItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteTableOpenModal(table: Table): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${table['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(table);
        }
      });
  }

  PageTableItemComponentOpenModal(table: Table): void {
    const modalRef = this.modalService.open(PageTableItemComponent, table);
    modalRef.onResult().subscribe((closed) => {
      this.getTableItemsToTable();
    });
  }

  tableTableActions($event: EventAction<Table>) {
    switch ($event.action) {

      case ActionGeneric.OPEN:
        this.PageTableItemComponentOpenModal($event.dataModel);
        break;

      case ActionGeneric.EDIT:
        this.updateTableOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteTableOpenModal($event.dataModel);
        break;
    }
  }

}
