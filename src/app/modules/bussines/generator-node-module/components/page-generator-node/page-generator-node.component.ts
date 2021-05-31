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
import { EditGeneratorNodeComponent } from '../edit-generator-node/edit-generator-node.component';
import { GeneratorNode } from '../../domain/generator-node';
import { GeneratorNodeService } from '../../services/generator-node.service';
import { EditGeneratorFieldNodeComponent } from '../edit-generator-field-node/edit-generator-field-node.component';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';

@Component({
  selector: 'app-page-generator-node',
  templateUrl: './page-generator-node.component.html',
  styleUrls: ['./page-generator-node.component.scss'],
})

export class PageGeneratorNodeComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nodos';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = true;
  tableModelGeneratorNode: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Nombre' },
    { key: 'name_type', title: 'Tipo' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_SELECT,
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private generatorNodeService: GeneratorNodeService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {
    super();
  }

  INITIAL_TYPE_NODE: string; //TableItemMasterEnum.TIPO_DE_DATO.table;

  modalInput(inputObject: any): void {
    if (inputObject.idType) {
      this.INITIAL_TYPE_NODE = inputObject.idType;
    }
  }

  ngOnInit(): void {
    this.getGeneratorNodeItemsToTable();
  }

  getGeneratorNodeItemsToTable() {
    if (this.INITIAL_TYPE_NODE) {
      this.generatorNodeService
        .getByTypeGeneratorNode(this.INITIAL_TYPE_NODE)
        .subscribe((resultGet) => {
          let generatorNodes = resultGet;
          this.tableModelGeneratorNode = new TableModel(
            this.columnsTable,
            this.actionsTable,
            generatorNodes
          );
        });
    }
  }

  editGeneratorNodeCodeOpenModal(
    action: ActionGeneric.EDIT,
    idNode: string = ''
  ): void {
    let object = { action: action, idNode };
    const modalRef = this.modalService.open(EditGeneratorNodeComponent, object);

    modalRef.onResult().subscribe((closed) => {
      this.getGeneratorNodeItemsToTable();
    });
  }

  editGeneratorNodeFieldOpenModal(
    action: ActionGeneric.EDIT,
    idNode: string = ''
  ): void {
    let object = { action: action, idNode };
    const modalRef = this.modalService.open(
      EditGeneratorFieldNodeComponent,
      object
    );

    modalRef.onResult().subscribe((closed) => {
      this.getGeneratorNodeItemsToTable();
    });
  }

  deleteServiceExecute(generatorNode: GeneratorNode) {
    this.generatorNodeService.deleteGeneratorNode(generatorNode.id).subscribe(
      (resultDelete) => {
        this.getGeneratorNodeItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteGeneratorNodeOpenModal(generatorNode: GeneratorNode): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${generatorNode['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(generatorNode);
        }
      });
  }

  tableGeneratorNodeActions($event: EventAction<GeneratorNode>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        if (this.INITIAL_TYPE_NODE === TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo) {
          this.editGeneratorNodeFieldOpenModal(
            ActionGeneric.EDIT,
            $event.dataModel.id
          );
        } else {
          this.editGeneratorNodeCodeOpenModal(
            ActionGeneric.EDIT,
            $event.dataModel.id
          );
        }

        break;
      case ActionGeneric.SELECT:
        this.modalClose($event.dataModel);
        break;

      case ActionGeneric.DELETE:
        this.DeleteGeneratorNodeOpenModal($event.dataModel);
        break;
    }
  }

  editGeneratorFieldNodeOpenModal(
    action: ActionGeneric,
    idNode: string = ''
  ): void {
    let object = { action: action, idNode };
    const modalRef = this.modalService.open(
      EditGeneratorFieldNodeComponent,
      object
    );
    modalRef.onResult().subscribe((closed) => {
      this.getGeneratorNodeItemsToTable();
    });
  }

  actionFormEvent($event) {
    this.modalCancel();
  }
}
