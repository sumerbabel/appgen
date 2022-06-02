import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { AccountService } from 'src/app/modules/core/security/service/account.service';
import { Filter2Component } from '../filter/filter.component';

@Component({
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent implements OnInit {

  TITLE_HEADER_FORM = 'Lista de Sistems';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  sistems: any[] = [];

  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Name' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );

  constructor(
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private accountService: AccountService,
  ) {
  }

 
  ngOnInit(): void {

    this.getSitems();

  }

  getSitems() {

        this.tableModelSistem.setDataTableAndPaginationToResponse([]);
      
  }

  createSistemOpenModal(): void {

  }

  updateSistemOpenModal(sistem: any): void {

  }

  deleteServiceExecute(sistem: any) {

  }



  tableSistemActions($event: EventAction<any>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateSistemOpenModal($event.dataModel);
        break;

      case ActionGeneric.PAGINATE:
        this.getSitems();
        break;
    }
  }

  filterOpenModal(): void {
    const modalRef = this.modalService.open(
      Filter2Component,
      this.tableModelSistem.searchFilter
    );
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  filterClear() {
    this.getSitems();
  }

ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

}
