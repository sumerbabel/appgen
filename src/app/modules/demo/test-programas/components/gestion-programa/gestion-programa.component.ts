import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { Programa } from '../../a-domain/programa';
import { ProgramaDto } from '../../a-domain/programa-dto';
import { CreatePrograma } from '../../b-use-cases/create-programa';
import { GetPrograma } from '../../b-use-cases/get-programa';
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
    private modalService: ModalService,
    private getPrograma: GetPrograma,
    private createPrograma: CreatePrograma
  ) {
  }

programa: Programa
  ngOnInit(): void {

    this.getSitems();
    this.programa = this.createPrograma.newEmptyPrograma()

  }

  async actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.SAVE:
      const resultSave= await this.createPrograma.save()
      const resultGet = await this.createSistemOpenModal(this.programa._id)
      console.log({resultSave})
      console.log({resultGet})
        break;
    }
  }

  getSitems() {

        this.tableModelSistem.setDataTableAndPaginationToResponse([]);

  }
  programaDto :ProgramaDto

  async createSistemOpenModal(id:string) {
    this.programaDto =await this.getPrograma.internalExecute(id)
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
