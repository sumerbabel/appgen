import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { GeneratorNode } from '../../domain/generator-node';
import { GeneratorNodeService } from '../../services/generator-node.service';
import { EventAction } from '@sharedModule/models-core/action-model';
import { MultilineStringService } from '@sharedModule/components/organims/tool-multiline-string/service/multiline-string.service';
import { TableItemService } from 'src/app/modules/administrator/table-item-module/services/table-item.service';
import { TableMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-master.enum';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';

@Component({
  selector: 'app-edit-generator-field-node',
  templateUrl: './edit-generator-field-node.component.html',
  styleUrls: ['./edit-generator-field-node.component.scss']
})
export class EditGeneratorFieldNodeComponent extends Modal implements OnInit {

  TITLE_HEADER_FORM = 'Nuevo Registro generator_nodes';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  typesItems=[];
  BTN_TOOL = ActionButton.MINI_TOOL;
  BTN_NEW = ActionButton.MINI_NEW;
  BUTTON_DELETE_NODE = ActionButton.MINI_DELETE;

  constructor(
    private generatorNodeService: GeneratorNodeService,
    private tableItemService:TableItemService,
    private multilineStringService: MultilineStringService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  generatorNode: GeneratorNode;
  INITIAL_ACTION:ActionGeneric;
  INITIAL_ID_NODE:string;

  modalInput(eventAction:any): void {
    this.INITIAL_ACTION =eventAction.action;
    this.INITIAL_ID_NODE =eventAction.idNode;
  }

  ngOnInit(): void {
    this.getTableItemService(TableMasterEnum.TIPO_DE_DATO);

    if(this.INITIAL_ACTION === ActionGeneric.NEW){
      this.generatorNode=GeneratorNode.createGeneratorNodeEmpty();
      this.generatorNode.type = TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo;
      this.generatorNode.objetGen.type=TableItemMasterEnum.TIPO_DE_DATO.table;
      this.generatorNode.addChildren();
    }

    if(this.INITIAL_ACTION === ActionGeneric.EDIT){
      this.getGeneratorNode(this.INITIAL_ID_NODE);
    }

  }

  getTableItemService(idTable: TableMasterEnum) {
    this.tableItemService.getItemsTableMaster(idTable).subscribe((result) => {
      this.typesItems = result;
    });
  }

  getGeneratorNode(idNode: string) {
    this.generatorNodeService
      .getGeneratorNode(idNode)
      .subscribe((regultGeneratorNode) => {
        this.generatorNode=GeneratorNode.createGeneratorNodeRecursive(regultGeneratorNode[0])
      },

      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
      );
  }

  deleteMenuNode(generatorNode: GeneratorNode, parentGeneratorNode: GeneratorNode) {
    if (generatorNode.isNew) {
      if (generatorNode.getIsNodeInitial()) {
        this.modalCancel();
      } else {
        parentGeneratorNode.deleteChildren(generatorNode);
      }
    } else {
      this.dialogService
        .openDialog({
          title: 'Eliminar Registro',
          textDialog: '¿Está seguro de Eliminar de la base de datos?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.deleteServiceExecute(generatorNode, parentGeneratorNode);
          }
        });
    }
  }

  deleteServiceExecute(generatorNode: GeneratorNode, parentGeneratorNode: GeneratorNode) {
    this.generatorNodeService.deleteGeneratorNode(generatorNode.id).subscribe(
      (resultDelete) => {
        if (generatorNode.getIsNodeInitial()) {
          let eventAction: EventAction<GeneratorNode> = {
            action: ActionGeneric.DELETE,
            dataModel: this.generatorNode,
          };
          this.modalCancel(eventAction);
        } else {
          parentGeneratorNode.deleteChildren(generatorNode);
        }
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  saveGeneratorNode() {
    this.generatorNodeService
      .putGeneratorNode(this.generatorNode.toDataAllPersistJson())
      .subscribe(
        (resultPut) => {
          this.alertService.openAlertInfo(resultPut);
          this.generatorNode.objetGen.name =  this.generatorNode.children[0].objetGen.name;
          this.generatorNode.objetGen.field =  this.generatorNode.children[0].objetGen.field;
          this.modalClose(this.generatorNode);
        },
        (errorArray) => {
          this.generatorNode.errors = [errorArray];
        }
      );
  }

  validateSaveRegister() {
    if (this.generatorNode.isValid && this.generatorNode.getIsModified()) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de guardar los cambios del registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.saveGeneratorNode();
          }
        });
    } else {
      this.alertService.openAlertInfo(
        'No ha realizado cambios, No es necesario guardar'
      );
    }
  }

  cancelRegister() {
    if (this.generatorNode.isModified) {
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
        if (
           this.generatorNode.children[0].objetGen.name ===''
        || this.generatorNode.children[0].objetGen.name === undefined
        || this.generatorNode.children[0].objetGen.name === null
        || this.generatorNode.children[0].objetGen.field ===''
        || this.generatorNode.children[0].objetGen.field === undefined
        || this.generatorNode.children[0].objetGen.field === null
        ) {
           this.alertService.openAlertWarning('Los datos: Campo y Nombre son obligatorios.');
        } else {
          this.validateSaveRegister();
        }
        break;
      case ActionGeneric.CANCEL:
       this.cancelRegister();
        break;
      case ActionGeneric.CLOSE:
        this.cancelRegister();
        break;
    }
  }

  BTN_MULTI_LINES = ActionButton.MINI_ALING_LEFT;
  openToolMultilineString(node: GeneratorNode) {
    this.multilineStringService.openDialog('dataDialog').subscribe(resultMultiLine=>{
      this.createRecursiveNode(node,resultMultiLine);
    });
  }

  createRecursiveNode(node: GeneratorNode,data:any[]=[]){
    let nodeParent:GeneratorNode;
    data.forEach( item=>{
      if(item['value']){
        nodeParent = GeneratorNode.createGeneratorNodeEmpty();
        nodeParent.idParent =node.id;
        nodeParent.objetGen.field =item['value'];
        node.childrenPush =nodeParent;
      }

      if(item['children']){
        this.createRecursiveNode(nodeParent,item['children'])
      }
    })


  }

}
