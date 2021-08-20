import { Component,OnInit} from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateSistemComponent } from '../create-sistem/create-sistem.component';
import { UpdateSistemComponent } from '../update-sistem/update-sistem.component';
import { Sistem } from '../../domain/sistem';
import { FilterComponent } from './filter/filter.component';
import { AccountService } from 'src/app/modules/core/security/service/account.service';
import { SistemUseCases } from '../../use-case/sistem-use-case';

@Component({
  selector: 'app-page-sistem',
  templateUrl: './page-sistem.component.html',
  styleUrls: ['./page-sistem.component.scss'],
})
export class PageSistemComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de Sistems';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  sistems: Sistem[] = [];

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
    private _sistemUseCases:SistemUseCases
  ) {

  }

 
  ngOnInit(): void {
    this.getSitems();
    const menusession = this.accountService.getMenuSession()
    console.log('4. INICIA PAGE SISTEM MNEU',menusession )
  }

  getSitems() {
    this._sistemUseCases
      .getByFilter(this.tableModelSistem.getParametersQueryString())
      .subscribe((resultGet) => {
        this.tableModelSistem.setDataTableAndPaginationToResponse(resultGet);
      });
  }

  createSistemOpenModal(): void {
    const modalRef = this.modalService.open(CreateSistemComponent);
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  updateSistemOpenModal(sistem: Sistem): void {
    const modalRef = this.modalService.open(UpdateSistemComponent, sistem);
    modalRef.onResult().subscribe(() => {
      this.tableModelSistem.pagination.setInitialPage();
      this.getSitems();
    });
  }

  deleteServiceExecute(sistem: Sistem) {
    this._sistemUseCases.deleteById(sistem.id).subscribe(
      (resultDelete) => {
        this.tableModelSistem.pagination.setInitialPage();
        this.getSitems();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteSistemOpenModal(sistem: Sistem): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${sistem.name}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(sistem);
        }
      });
  }

  tableSistemActions($event: EventAction<any>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateSistemOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteSistemOpenModal($event.dataModel);
        break;
      case ActionGeneric.PAGINATE:
        this.getSitems();
        break;
    }
  }

  filterOpenModal(): void {
    const modalRef = this.modalService.open(
      FilterComponent,
      this.tableModelSistem.searchFilter
    );
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  filterClear() {
    this.getSitems();
  }
}
