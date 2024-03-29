import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { RolMenu } from '../../domain/rol-menu';
import { RolMenuService } from '../../services/rol-menu.service';
import { MenuNodeService } from '../../../menu-node-module/services/menu-node.service';
import { ModuleService } from '../../../module-module/services/module.service';
import { SistemService } from '../../../sistem-module/Infraestructure/sistem.service';
import { SecurityRol } from '../../../security-rol-module/domain/security-rol';

@Component({
  selector: 'app-create-rol-menu',
  templateUrl: './create-rol-menu.component.html',
  styleUrls: ['./create-rol-menu.component.scss'],
})

export class CreateRolMenuComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro rol_menu';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

  constructor(
    private rolMenuService: RolMenuService,
    private menuNodeService: MenuNodeService,
    private moduleService: ModuleService,
    private sistemService: SistemService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super();
  }

  rolMenu: RolMenu;
  listSistem = [];
  listModule = [];
  listMenuNode = [];
  idSistem:string;
  idModule:string;
  initialSecurityRol: SecurityRol;

  modalInput(securityRol: SecurityRol): void {
    this.initialSecurityRol = securityRol;
  }


  getListSistems(){
    this.sistemService.getByList().subscribe((result) => {
      this.listSistem = result;
    });
  }

  getListModules(idSistem:string){
    this.moduleService.getModuleList(idSistem).subscribe((result) => {
      this.listModule = result;
    });
  }

  getListMenuNodes(idModule:string){
    this.menuNodeService.getListMenuNode(idModule).subscribe((result) => {
      this.listMenuNode = result;
    });
  }


  ngOnInit(): void {
    this.getListSistems();
    this.rolMenu = RolMenu.createRolMenuEmpty();
    this.rolMenu.idRol = this.initialSecurityRol.id;
  }

  createRolMenu() {
    this.rolMenuService.postRolMenu(this.rolMenu.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
        this.modalClose(this.rolMenu);
      },
      (errorArray) => {
        this.rolMenu.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.rolMenu.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createRolMenu();
          }
        });
    }
  }

  cancelRegister() {
    if (this.rolMenu.isModified) {
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
    this.idModule=null;
    this.rolMenu.idMenuNode=null;
    this.getListModules(this.idSistem);
  }

  valueChangeIdModule() {
    this.getListMenuNodes(this.idModule);
  }

}
