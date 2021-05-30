import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateRolMenuActionComponent } from '../create-rol-menu-action/create-rol-menu-action.component';

import { RolMenuAction } from '../../domain/rol-menu-action';
import { RolMenuActionService } from '../../services/rol-menu-action.service';
@Component({
  selector: 'app-page-rol-menu-action',
  templateUrl: './page-rol-menu-action.component.html',
  styleUrls: ['./page-rol-menu-action.component.scss'],
})
export class PageRolMenuActionComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de RolMenuActions';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  tableModelRolMenuAction: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'idRolMenu', title: 'IdRolMenu' },
    { key: 'idMenu', title: 'IdMenu' },
    { key: 'action', title: 'Action' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];
  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private rolMenuActionService: RolMenuActionService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getRolMenuActionItemsToTable();
  }

  getRolMenuActionItemsToTable() {
    this.rolMenuActionService.getRolMenuAction().subscribe((resultGet) => {
      let rolMenuActions = resultGet;
      this.tableModelRolMenuAction = new TableModel(

        this.columnsTable,
        this.actionsTable,
        rolMenuActions,
      );
    });
  }

  createRolMenuActionOpenModal(): void {
    const modalRef = this.modalService.open(CreateRolMenuActionComponent);
    modalRef.onResult().subscribe((closed) => {
      this.getRolMenuActionItemsToTable();
    });
  }

  deleteServiceExecute(rolMenuAction: RolMenuAction) {
    this.rolMenuActionService.deleteRolMenuAction(rolMenuAction.id).subscribe(
      (resultDelete) => {
        this.getRolMenuActionItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteRolMenuActionOpenModal(rolMenuAction: RolMenuAction): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR la acción :  ${rolMenuAction['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(rolMenuAction);
        }
      });
  }

  tableRolMenuActionActions($event: EventAction<RolMenuAction>) {
    switch ($event.action) {
      case ActionGeneric.DELETE:
        this.DeleteRolMenuActionOpenModal($event.dataModel);
        break;
    }
  }
}
