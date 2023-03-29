import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { GroupCode } from '../../domain/group-code';
import { GroupCodeService } from '../../services/group-code.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { EditGeneratorFieldNodeComponent } from '../../../generator-node-module/components/edit-generator-field-node/edit-generator-field-node.component';
import { GeneratorNode } from '../../../generator-node-module/domain/generator-node';
import { EditGeneratorNodeComponent } from '../../../generator-node-module/components/edit-generator-node/edit-generator-node.component';
import { ViewCodeComponent } from '../view-code/view-code.component';
import { Colors } from '@sharedModule/enums/colors';
import { Icons } from '@sharedModule/enums/icons';
import { StyleButtonEnum } from '@sharedModule/components/atoms/button/style-enum/enum-style-button';
import { PageGeneratorNodeComponent } from '../../../generator-node-module/components/page-generator-node/page-generator-node.component';
import { GroupCodeNodeService } from '../../../group-code-node-module/services/group-code-node.service';
import { GroupCodeNode } from '../../../group-code-node-module/domain/group-code-node';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';

@Component({
  selector: 'app-create-group-code',
  templateUrl: './create-group-code.component.html',
  styleUrls: ['./create-group-code.component.scss'],
})
export class CreateGroupCodeComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Generador de Código';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  ACTION_SAVE = ActionButton.SAVE;
  ACTION_CANCEL = ActionButton.CANCEL;

  ACTION_BUTTON_FIELD_NEW: ModelAction = {
    name: 'Nueva Tabla / Modelo',
    color: Colors.PURPLE_GRADIENT_METAL,
    action: ActionGeneric.NEW,
    icon: Icons.STAR,
    styleClass: [StyleButtonEnum.DEFAULT],
  };

  ACTION_BUTTON_FIELD_ADD: ModelAction = {
    name: 'Agregar Tabla / Modelo',
    color: Colors.PRURPLE_A,
    action: ActionGeneric.CREATE,
    icon: Icons.OPEN,
    styleClass: [StyleButtonEnum.DEFAULT],
  };

  ACTION_BUTTON_CODE_NEW: ModelAction = {
    name: 'Nueva Plantilla Código',
    color: Colors.PURPLE_GRADIENT_METAL,
    action: ActionGeneric.NEW,
    icon: Icons.STAR,
    styleClass: [StyleButtonEnum.DEFAULT],
  };

  ACTION_BUTTON_CODE_ADD: ModelAction = {
    name: 'Agregar Plantilla Código',
    color: Colors.PRURPLE_A,
    action: ActionGeneric.CREATE,
    icon: Icons.OPEN,
    styleClass: [StyleButtonEnum.DEFAULT],
  };

  listErros = [];
  constructor(
    private groupCodeService: GroupCodeService,
    private groupCodeNodeService: GroupCodeNodeService,
    private modalService: ModalService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  groupCode: GroupCode;
  INITIAL_ACTION: string;
  INITIAL_ID_GROUP_NODE: string;

  modalInput(inputObject: any): void {
    this.INITIAL_ACTION = inputObject.action;
    console.log('this.INITIAL_ACTION ',this.INITIAL_ACTION )
    this.INITIAL_ID_GROUP_NODE = inputObject.idGroupCode;
  }

  ngOnInit(): void {
    if (this.INITIAL_ACTION === ActionGeneric.NEW) {
      this.groupCode = GroupCode.createGroupCodeEmpty();
    } else {
      this.getGroupCode(this.INITIAL_ID_GROUP_NODE);
    }
  }

  getGroupCode(idGroupCode: string) {
    this.groupCodeService.getGroupCode(idGroupCode).subscribe(
      (resultGetGroupCode) => {
        this.groupCode = GroupCode.createGroupCode(resultGetGroupCode);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  newNodeField() {
    let object = { action: ActionGeneric.NEW };
    const modalRef = this.modalService.open(
      EditGeneratorFieldNodeComponent,
      object
    );

    modalRef.onResult().subscribe((closed) => {
      if(closed){
        let generator: GeneratorNode = closed;
        this.groupCode.pushGroupCodeNodes(
          generator.id,
          generator.objetGen.name,
          generator.objetGen.field,
          generator.type
        );

        if(this.INITIAL_ACTION=== ActionGeneric.UPDATE){
          this.EditGroupCode(false);
         }
      }

    });
  }

  addNodeField() {
    let inputObject = { idType: TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo};
    const modalRef = this.modalService.open(
      PageGeneratorNodeComponent,
      inputObject
    );
    modalRef.onResult().subscribe((closed) => {
      if(closed) {
        let  resultado = this.groupCode.pushGroupCodeNodes(
          closed.id,
          closed.name,
          closed.field,
          TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo
        );

        if(resultado.error){
          this.alertService.openAlertWarning(resultado.message);
        } else {
           if(this.INITIAL_ACTION=== ActionGeneric.UPDATE){
            this.EditGroupCode(false);
           }
        }
      }
    }
    );
  }

  newNodeCode() {
    let object = { action: ActionGeneric.NEW };
    const modalRef = this.modalService.open(EditGeneratorNodeComponent, object);
    modalRef.onResult().subscribe((closed) => {
      if(closed){
        let generator: GeneratorNode = closed;
        this.groupCode.pushGroupCodeNodes(
          generator.id,
          generator.objetGen.name,
          generator.objetGen.field,
          generator.type
        );
        if(this.INITIAL_ACTION=== ActionGeneric.UPDATE){
          this.EditGroupCode(false);
         }
      }
    });
  }

  addNodeCode() {
    let inputObject = { idType: TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.codigo };
    const modalRef = this.modalService.open(
      PageGeneratorNodeComponent,
      inputObject
    );
    modalRef.onResult().subscribe((closed) => {
      if(closed) {
        let  resultado = this.groupCode.pushGroupCodeNodes(
          closed.id,
          closed.name,
          closed.field,
          TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.codigo
        );

        if(resultado.error){
          this.alertService.openAlertWarning(resultado.message);
        } else {
          if(this.INITIAL_ACTION=== ActionGeneric.UPDATE){
            this.EditGroupCode(false);
           }
        }
      }
    });
  }

  EditGroupCode(isGenerate: boolean) {
    this.groupCodeService
      .putGroupCode(this.groupCode.toDataPersistJsonAll())
      .subscribe(
        (resultPost) => {
          this.INITIAL_ACTION = ActionGeneric.EDIT;

          this.groupCode.updateSaveGroupCodeNodes();
          if (isGenerate) {
            this.getGenerateCode();
          } else {
            this.alertService.openAlertSucsses(resultPost);
          }
        },
        (errorArray) => {
          this.groupCode.errors = errorArray;
        }
      );
  }

  Generate() {
    this.groupCodeService
      .putGroupCode(this.groupCode.toDataPersistJsonAll())
      .subscribe(
        (resultPost) => {
          this.groupCode.updateSaveGroupCodeNodes();
            this.getGenerateCode();
        },
        (errorArray) => {
          this.groupCode.errors = errorArray;
        }
      );
  }

  createGroupCode() {
    console.log('create this.groupCode.toDataPersistJsonAll()',this.groupCode.toDataPersistJsonAll())
    this.groupCodeService
      .postGroupCode(this.groupCode.toDataPersistJsonAll())
      .subscribe(
        (resultPost) => {
          this.INITIAL_ACTION = ActionGeneric.EDIT;
          this.groupCode.updateSaveGroupCodeNodes();
        },
        (errorArray) => {
          this.groupCode.errors = errorArray;
        }
      );
  }

  validateSaveRegister() {
    if (this.groupCode.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            if (this.INITIAL_ACTION === ActionGeneric.NEW){
              this.createGroupCode()
            }
            if (this.INITIAL_ACTION === ActionGeneric.EDIT){
              this.EditGroupCode(false);
            }

          }
        });
    }
  }

  cancelRegister() {
    if (this.groupCode.isModified) {
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
      case ActionGeneric.CREATE:
        this.Generate()
        break;
      case ActionGeneric.CANCEL:
        this.cancelRegister();
        break;
      case ActionGeneric.CLOSE:
        this.cancelRegister();
        break;
    }
  }

  tableModelGroupCode = [];
  columnsTable: ColumnModel[] = [
    { key: 'selected', title: '' },
    { key: 'name', title: 'Nombre' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  columnsTableCode: ColumnModel[] = [
    { key: 'selected', title: '' },
    { key: 'name', title: 'Nombre' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  editGeneratorNodeFieldOpenModal(
    action: ActionGeneric,
    idNode: string = ''
  ): void {
    let object = { action: action, idNode: idNode };
    const modalRef = this.modalService.open(
      EditGeneratorFieldNodeComponent,
      object
    );

    modalRef.onResult().subscribe((closed) => {
      //this.getGeneratorNodeItemsToTable();
    });
  }

  editGeneratorNodeCodeOpenModal(
    action: ActionGeneric,
    idNode: string = ''
  ): void {
    let object = { action: action, idNode: idNode };
    const modalRef = this.modalService.open(EditGeneratorNodeComponent, object);

    modalRef.onResult().subscribe((closed) => {
      //this.getGeneratorNodeItemsToTable();
    });
  }

  tableFIeldActions($event) {
    let groupCodeNode: GroupCodeNode = $event.dataModel;
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.editGeneratorNodeFieldOpenModal(
          ActionGeneric.EDIT,
          $event.dataModel.idNode
        );
        break;
      case ActionGeneric.DELETE:
        this.deleteNodecode(groupCodeNode.id, groupCodeNode.isNew);
        break;
    }
  }

  tableCodeActions($event) {
    let groupCodeNode: GroupCodeNode = $event.dataModel;

    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.editGeneratorNodeCodeOpenModal(
          ActionGeneric.EDIT,
          $event.dataModel.idNode
        );
        break;
      case ActionGeneric.DELETE:
        this.deleteNodecode(groupCodeNode.id, groupCodeNode.isNew);
        break;
    }
  }

  deleteNodecode(idNode: string, isnew:boolean) {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: '¿Está seguro de ELIMINAR el registro?',
      })
      .subscribe((resultDialog) => {
        if (resultDialog === ActionGeneric.YES) {
          if (isnew) {
            this.groupCode.deleteGroupCodeNodes(idNode);
          } else {
            this.groupCodeNodeService
              .deleteGroupCodeNode(idNode)
              .subscribe((resultDelete) => {
                this.groupCode.deleteGroupCodeNodes(idNode);
              });
          }
        }
      });
  }

  // GENERATE SECTION
  ACTION_BUTTON_GENERATE: ModelAction = {
    name: 'Generar Código',
    color: Colors.GREEN_GRADIENT_METAL,
    action: ActionGeneric.CREATE,
    icon: Icons.CODE_CUBE,
    styleClass: [StyleButtonEnum.DEFAULT],
  };

  actionsTableGenerate = [ActionButton.MINI_OPEN, ActionButton.MINI_COPY];
  tableResultGenerate = [];
  columnsTableResultGenerate: ColumnModel[] = [
    { key: 'fileNameComplit', title: 'Archivo' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  viewCodeOpenModal(textCode: string, fileNameComplit: string): void {
    let inputObject = { textCode: textCode, fileNameComplit: fileNameComplit };
    const modalRef = this.modalService.open(ViewCodeComponent, inputObject);
  }

  actionsGenerate($event) {
    switch ($event.action) {
      case ActionGeneric.OPEN:
        this.viewCodeOpenModal(
          $event.dataModel.textCode,
          $event.dataModel.fileNameComplit
        );
        break;
      case ActionGeneric.COPY:
        break;
    }
  }

  idTableAsociate:string;
  initialProcessGenerate=false;
  generateCodeProcesResult(dataresult: any) {
    this.initialProcessGenerate=true;
    this.tableResultGenerate =[];
    this.idTableAsociate =undefined;
    this.tableResultGenerate = dataresult.codeGroup;
    this.idTableAsociate = this.groupCode.id;
  }

  getGenerateCode() {
       this.initialProcessGenerate=false;
    this.groupCodeService.getGenerateCodeGroup(this.groupCode.id).subscribe(
      (resultGetGroupCode) => {
        this.generateCodeProcesResult(resultGetGroupCode);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }
}
