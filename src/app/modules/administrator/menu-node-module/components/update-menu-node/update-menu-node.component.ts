import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { MenuNode } from '../../domain/menu-node';
import { MenuNodeService } from '../../services/menu-node.service';
import { EventAction } from '@sharedModule/models-core/action-model';
import { ModuleService } from '../../../module-module/services/module.service';
import { SistemService } from '../../../sistem-module/Infraestructure/sistem.service';
import { TableItemService } from '../../../table-item-module/services/table-item.service';
import { TableMasterEnum } from '../../../table-module/enum/table-master.enum';

@Component({
  selector: 'app-update-menu-node',
  templateUrl: './update-menu-node.component.html',
  styleUrls: ['./update-menu-node.component.scss'],
})
export class UpdateMenuNodeComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Editar Nodos de Seguridad';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  errorInForm:string[] =[];
  itemSistem = [];
  itemModule = [];
  idSistem: string;
  idModule: string;

  itemsTable =[];

  constructor(
    private menuNodeService: MenuNodeService,
    private moduleService: ModuleService,
    private sistemService: SistemService,
    private tableItemService:TableItemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  menuNode: MenuNode;
  menuNodeToTree: MenuNode[];
  BTN_NEW = ActionButton.MINI_NEW;
  BTN_TOOL = ActionButton.MINI_TOOL;
  BUTTON_DELETE_NODE = ActionButton.MINI_DELETE;

  INITIAL_ACTION_INPUT = '';

  modalInput(eventAction: any): void {
    this.INITIAL_ACTION_INPUT = eventAction.action;
    if (this.INITIAL_ACTION_INPUT == ActionGeneric.EDIT) {
      this.menuNode = eventAction.menuNode;
    }
  }

  ngOnInit(): void {
    this.getTableItemService(TableMasterEnum.TIPO_DE_MENU_SEGURIDAD)
    this.sistemService.getByList().subscribe((result) => {
      this.itemSistem = result;
    });

    if (this.INITIAL_ACTION_INPUT == ActionGeneric.EDIT) {
      this.getMenuNode(this.menuNode);
    }
  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.itemsTable = result;
    });
  }


  getMenuNode(menuNode: MenuNode) {
    this.menuNodeService.getMenuNode(menuNode.id).subscribe(
      (resultGetMenuNode) => {
        this.menuNode = MenuNode.createMenuNodeRecursive(resultGetMenuNode[0]);
        this.idSistem = this.menuNode.menu.idSistem;
        this.moduleService.getModuleList(this.idSistem).subscribe((result) => {
          this.itemModule = result;

          this.errorInForm = this.menuNode.errors;
          this.idModule = this.menuNode.menu.idModule;
          this.menuNodeToTree = [this.menuNode];

        });
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  updateMenuNode() {
    this.menuNode.toDataAllPersistJson();
    this.menuNodeService
      .putMenuNode(this.menuNode.toDataAllPersistJson())
      .subscribe(
        (resultPut) => {
          this.alertService.openAlertInfo(resultPut);
          this.modalClose(this.menuNode);
        },
        (errorArray) => {
          this.menuNode.errors = [errorArray];
        }
      );
  }

  deleteMenuNode(menuNode: MenuNode, parentMenuNode: MenuNode) {
    if (menuNode.isNew) {
      if (menuNode.getIsNodeInitial()) {
        this.modalCancel();
      } else {
        parentMenuNode.deleteChildren(menuNode);
      }
    } else {
      this.dialogService
        .openDialog({
          title: 'Eliminar Registro',
          textDialog: '¿Está seguro de Eliminar de la base de datos?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.deleteServiceExecute(menuNode, parentMenuNode);
          }
        });
    }
  }

  deleteServiceExecute(menuNode: MenuNode, parentMenuNode: MenuNode) {
    this.menuNodeService.deleteMenuNode(menuNode.id).subscribe(
      (resultDelete) => {
        if (menuNode.getIsNodeInitial()) {
          let eventAction: EventAction<MenuNode> = {
            action: ActionGeneric.DELETE,
            dataModel: this.menuNode,
          };
          this.modalCancel(eventAction);
        } else {
          parentMenuNode.deleteChildren(menuNode);
        }
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  validateSaveRegister() {
    if (this.menuNode.isValid && this.menuNode.getIsModified()) {
      this.dialogService
        .openDialog({
          title: 'Actualizar Registro',
          textDialog: '¿Está seguro de actualizar el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.updateMenuNode();
          }
        });
    } else {
      this.alertService.openAlertInfo(
        'No ha realizado cambios, No es necesario guardar'
      );
    }
  }

  cancelRegister() {
    if (this.menuNode.isModified) {
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

  valueChangeIdSistem() {
    this.moduleService.getModuleList(this.idSistem).subscribe((result) => {
      this.itemModule = result;
    });
  }

  valueChangeIdModule() {
    if (this.INITIAL_ACTION_INPUT == ActionGeneric.CREATE) {
      this.menuNode = MenuNode.createMenuNodeEmpty(
        this.idSistem,
        this.idModule
      );
      this.menuNodeToTree = [this.menuNode];
      this.errorInForm = this.menuNode.errors;
    }
  }
}
