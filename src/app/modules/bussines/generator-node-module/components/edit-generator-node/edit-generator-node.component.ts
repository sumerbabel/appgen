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
import { CopyClipBoardService } from '@sharedModule/services/copy-clipboard/copy-clipboard.service';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';

@Component({
  selector: 'app-create-generator-node',
  templateUrl: './edit-generator-node.component.html',
  styleUrls: ['./edit-generator-node.component.scss'],
})
export class EditGeneratorNodeComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro generator_nodes';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
  typesItems = [];
  BTN_TOOL = ActionButton.MINI_TOOL;
  BTN_NEW = ActionButton.MINI_NEW;
  BUTTON_DELETE_NODE = ActionButton.MINI_DELETE;

  constructor(
    private generatorNodeService: GeneratorNodeService,
    private multilineStringService: MultilineStringService,
    private copyClipBoardService: CopyClipBoardService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  generatorNode: GeneratorNode;
  INITIAL_ACTION: ActionGeneric;
  INITIAL_ID_NODE: string;

  modalInput(eventAction: any): void {
    this.INITIAL_ACTION = eventAction.action;
    this.INITIAL_ID_NODE = eventAction.idNode;
  }

  ngOnInit(): void {
    if (this.INITIAL_ACTION === ActionGeneric.NEW) {
      this.generatorNode = GeneratorNode.createGeneratorNodeEmpty();
      this.generatorNode.type =
        TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.codigo;
      this.generatorNode.objetGen.type = TableItemMasterEnum.TIPO_DE_DATO.code;
      this.generatorNode.addChildren();
    }

    if (this.INITIAL_ACTION === ActionGeneric.EDIT) {
      this.getGeneratorNode(this.INITIAL_ID_NODE);
    }
  }

  getGeneratorNode(idNode: string) {
    this.generatorNodeService.getGeneratorNode(idNode).subscribe(
      (regultGeneratorNode) => {
        this.generatorNode = GeneratorNode.createGeneratorNodeRecursive(
          regultGeneratorNode[0]
        );
      },

      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  deleteMenuNode(
    generatorNode: GeneratorNode,
    parentGeneratorNode: GeneratorNode
  ) {
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

  deleteServiceExecute(
    generatorNode: GeneratorNode,
    parentGeneratorNode: GeneratorNode
  ) {
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
          this.modalClose(this.generatorNode);
        },
        (errorArray) => {
          this.generatorNode.errors = errorArray;
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
          this.generatorNode.objetGen.name === '' ||
          this.generatorNode.objetGen.name === undefined ||
          this.generatorNode.objetGen.name === null
        ) {
          throw this.alertService.openAlertWarning(
            'el campo Nombre / Titulo del código es obligatorio'
          );
        }

        if (
          this.generatorNode.objetGen.field === '' ||
          this.generatorNode.objetGen.field === undefined ||
          this.generatorNode.objetGen.field === null
        ) {
          throw this.alertService.openAlertWarning(
            'Ruta y nombre del archivo es obligatorio'
          );
        }

        if (
          this.generatorNode.validateFileName() === false
        ) {
          throw this.alertService.openAlertWarning(
            'Ruta y nombre del archivo es Incorrecto debe ser de la forma : "archivo.[extención]"'
          );
        }

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

  BTN_HELP = ActionButton.MINI_HELP;
  open_help = false;
  actionFormEventHelp() {
    this.open_help = !this.open_help;
  }

  BTN_MULTI_LINES = ActionButton.MINI_ALING_LEFT;
  openToolMultilineString(node: GeneratorNode) {
    this.multilineStringService
      .openDialog('dataDialog')
      .subscribe((resultMultiLine) => {
        this.createRecursiveNode(node, resultMultiLine);
      });
  }

  createRecursiveNode(node: GeneratorNode, data: any[] = []) {
    let nodeParent: GeneratorNode;
    data.forEach((item) => {
      if (item['value']) {
        nodeParent = GeneratorNode.createGeneratorNodeEmpty();
        nodeParent.idParent = node.id;
        nodeParent.objetGen.content = item['value'];
        node.childrenPush = nodeParent;
      }

      if (item['children']) {
        this.createRecursiveNode(nodeParent, item['children']);
      }
    });
  }

  value_legend = [
    { type: '@data@', description: 'Nombre del campo' },
    { type: '@data_ini@', description: 'Nombre del campo inicial' },
    { type: '@data_med@', description: 'Nombre del campo medio' },
    { type: '@data_fin@', description: 'Nombre del campo final' },
    { type: '@data_prev@', description: 'Nombre del campo anterior superior' },
    { type: '@type@', description: 'Tipo' },
    { type: '@name@', description: 'Titulo o descripción del campo' },
    { type: '@length@', description: 'Longitud del campo' },
    { type: '@required@', description: 'Campo requerido, valor: 1, 0' },
    { type: '@rute_1@', description: 'Ruta base principal' },
    { type: '@rute_2@', description: 'Ruta base secundaria' },
    { type: '[camel(@data@)]', description: 'Convierte a camel case' },
    {
      type: '[camelClass(@data@)]',
      description: 'Convierte a camel case tipo clase',
    },
    { type: '[lower(@data@)]', description: 'Convierte a lower case' },
    {
      type: '[lowerClass(@data@)]',
      description: 'Convierte a lower case tipo clase',
    },
    {
      type: '[underScore(@data@)]',
      description: 'Convierte a minúsculas y separa por guion',
    },
    {
      type: '[middledash(@data@)]',
      description: 'Convierte a minúsculas y separa por guion bajo',
    },
    {
      type: '[middledashClass(@data@)]',
      description: 'Convierte a minúsculas y separa por guion bajo tipo clase',
    },
    {
      type: '[if(@required@ ===1){@data@}]',
      description: 'Expresión If valida sólo igualdad',
    },
  ];

  itemCopy(itemType: string) {
    this.copyClipBoardService.copyTextToClipBoard(itemType);
  }

  // validateFileName(filename: string): boolean {
  //   const regularExpression = /^\/?([A-z0-9-_+]+\/)*([A-z0-9]+\.([A-Za-z]{2,4}))$/;
  //   this.value_legend.forEach((item) => {
  //     filename = filename.replace(item.type, '');
  //   });
  //   debugger;
  //   filename = filename.split('[').join('');
  //   filename = filename.split(']').join('');
  //   filename = filename.split('(').join('');
  //   filename = filename.split(')').join('');
  //   filename = filename.split('/').join('\\');
  //   let test = regularExpression.test(String(filename).toLowerCase());
  //   return test;
  // }
}
