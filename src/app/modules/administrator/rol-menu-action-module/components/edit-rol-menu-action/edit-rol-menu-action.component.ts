import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { RolMenuAction } from '../../domain/rol-menu-action';
import { RolMenuActionService } from '../../services/rol-menu-action.service';
import { TableModel } from '@sharedModule/models-core/table-model';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableItemService } from '../../../table-item-module/services/table-item.service';
import { TableMasterEnum } from '../../../table-module/enum/table-master.enum';

@Component({
  selector: 'ui-edit-rol-menu-action',
  templateUrl: './edit-rol-menu-action.component.html',
  styleUrls: ['./edit-rol-menu-action.component.scss'],
})
export class EditRolMenuActionComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Actualizar Registro rol_menu_actions';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.ACCEPT, ActionButton.CANCEL];

  idRolMenu: string;
  idMenu: string;
  errorInForm: string[] = [];

  actionSelected: string;
  itemsActions = [];

  tableModelRolMenuAction: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Acción' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'accion', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [ActionButton.MINI_DELETE];

  constructor(
    private rolMenuActionService: RolMenuActionService,
    private tableItemService: TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  modalInput(inputs: any): void {
    this.idRolMenu = inputs.idRolMenu;
    this.idMenu = inputs.idMenu;
  }

  ngOnInit(): void {
    this.getTableItemService(TableMasterEnum.ACCIONES_SEGURIDAD);
    this.getAllRolMenuActionToTable();
  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.itemsActions = result;
    });
  }

  getAllRolMenuActionToTable() {
    this.rolMenuActionService
      .getAllRolMenuAction(this.idRolMenu, this.idMenu)
      .subscribe(
        (resultGetRolMenuAction) => {
          let rolMenuActions = resultGetRolMenuAction;
          this.tableModelRolMenuAction = new TableModel(

            this.columnsTable,
            this.actionsTable,
            rolMenuActions,
          );
        },
        (errorArray) => {
          this.alertService.openAlertWarning(errorArray);
        }
      );
  }

  deleteServiceExecute(rolMenuAction: any) {
    this.rolMenuActionService.deleteRolMenuAction(rolMenuAction.id).subscribe(
      (resultDelete) => {
        this.getAllRolMenuActionToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteRolMenuActionOpenModal(rolMenuAction: any): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR la acción  :  ${rolMenuAction['name']}?`,
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

  itemSelect($event) {

    let isUniqueAction = true;
    this.tableModelRolMenuAction.dataArray
    this.tableModelRolMenuAction.dataArray.forEach((item) => {
      if (item.name === $event.name) {
        this.actionSelected=null;
        this.alertService.openAlertWarning(
          'Acción' + $event.name + ' ya se encuentra registrada'
        );
        isUniqueAction = false;

      }
    });

    if (isUniqueAction) {
      let rolMenuAction = RolMenuAction.createRolMenuActionEmpty();
      rolMenuAction.idMenu = this.idMenu;
      rolMenuAction.idRolMenu = this.idRolMenu;
      rolMenuAction.action = $event.id;
      this.saveMenuNode([rolMenuAction.toDataPersistJson()]);
    }

    this.actionSelected=null;
  }

  saveMenuNode(data: any) {
    this.rolMenuActionService.postRolMenuAction(data).subscribe(
      (resultPost) => {
        this.getAllRolMenuActionToTable();
        this.alertService.openAlertInfo(resultPost);
      },
      (errorArray) => {
        this.errorInForm = [errorArray];
      }
    );
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.CLOSE:
        this.modalCancel();
        break;
    }
  }
}
