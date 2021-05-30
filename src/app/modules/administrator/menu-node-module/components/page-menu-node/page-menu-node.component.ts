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
import { UpdateMenuNodeComponent } from '../update-menu-node/update-menu-node.component';

import { MenuNodeService } from '../../services/menu-node.service';
import { DataModel } from '@sharedModule/models-core/data-model';

@Component({
  selector: 'app-page-menu-node',
  templateUrl: './page-menu-node.component.html',
  styleUrls: ['./page-menu-node.component.scss'],
})
export class PageMenuNodeComponent implements OnInit {
  TITLE_HEADER_FORM = 'Nodos de Seguridad';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;

  tableModelMenuNode: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'name_sistem', title: 'Sistema' },
    { key: 'name_module', title: 'Módulo' },
    { key: 'name', title: 'Nombre' },
    { key: 'name_type', title: 'Tipo' },
    { key: 'rute_web', title: 'Ruta' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];
  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];
  constructor(
    private menuNodeService: MenuNodeService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getMenuNodeItemsToTable();
  }

  getMenuNodeItemsToTable() {
    this.menuNodeService.getMenuNode().subscribe((resultGet) => {
      let menuNodes = resultGet.map((item) => {
        return item as DataModel;
      });
      this.tableModelMenuNode = new TableModel(
        this.columnsTable,
        this.actionsTable,
        menuNodes
      );
    });
  }

  createMenuNodeOpenModal(): void {
    let eventAction = { action: ActionGeneric.CREATE };
    const modalRef = this.modalService.open(
      UpdateMenuNodeComponent,
      eventAction
    );
    modalRef.onResult().subscribe((closed) => {
      this.getMenuNodeItemsToTable();
    });
  }

  updateMenuNodeOpenModal(menuNode: DataModel): void {
    let eventAction = { action: ActionGeneric.EDIT, menuNode: menuNode };
    const modalRef = this.modalService.open(
      UpdateMenuNodeComponent,
      eventAction
    );
    modalRef.onResult().subscribe((closed) => {
      this.getMenuNodeItemsToTable();
    });
  }

  deleteServiceExecute(menuNode: DataModel) {
    this.menuNodeService.deleteMenuNode(menuNode._id).subscribe(
      (resultDelete) => {
        this.tableModelMenuNode.deleteModel(menuNode);
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteMenuNodeOpenModal(menuNode: DataModel): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${name}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(menuNode);
        }
      });
  }

  tableMenuNodeActions($event: EventAction<DataModel>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateMenuNodeOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteMenuNodeOpenModal($event.dataModel);
        break;
    }
  }
}
