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
import { CreateRolMenuComponent } from '../create-rol-menu/create-rol-menu.component';
import { UpdateRolMenuComponent } from '../update-rol-menu/update-rol-menu.component';
import { RolMenu } from '../../domain/rol-menu';
import { RolMenuService } from '../../services/rol-menu.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { SecurityRol } from '../../../security-rol-module/domain/security-rol';
import { EditMenuNodeActionComponent } from '../../../rol-menu-action-module/components/edit-menu-node-action/edit-menu-node-action.component';

@Component({
  selector: 'app-page-rol-menu',
  templateUrl: './page-rol-menu.component.html',
  styleUrls: ['./page-rol-menu.component.scss'],
})

export class PageRolMenuComponent extends Modal implements OnInit {

  TITLE_HEADER_FORM = 'Items de Accesos del Rol';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = true;
  tableModelRolMenu: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'menu_name', title: 'Menu' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'actciones', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_OPEN,
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private rolMenuService: RolMenuService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) { super();}

  initialSecurityRol: SecurityRol;

  modalInput(securityRol: SecurityRol): void {
    this.initialSecurityRol = securityRol;
  }

  ngOnInit(): void {
    this.getRolMenuItemsToTable();
  }

  getRolMenuItemsToTable() {
    this.rolMenuService.getAllRolMenu(this.initialSecurityRol.id).subscribe((resultGet) => {
      let rolMenus = resultGet;
      this.tableModelRolMenu = new TableModel(
        this.columnsTable,
        this.actionsTable,
        rolMenus
      );
    });
  }

  createRolMenuOpenModal(): void {
    const modalRef = this.modalService.open(CreateRolMenuComponent,this.initialSecurityRol);
    modalRef.onResult().subscribe((closed) => {
      this.getRolMenuItemsToTable();
    });
  }

  updateRolMenuOpenModal(rolMenu: RolMenu): void {
    const modalRef = this.modalService.open(UpdateRolMenuComponent, rolMenu);
    modalRef.onResult().subscribe((closed) => {
      this.getRolMenuItemsToTable();
    });
  }

  deleteServiceExecute(rolMenu: RolMenu) {
    this.rolMenuService.deleteRolMenu(rolMenu.id).subscribe(
      (resultDelete) => {
        this.getRolMenuItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteRolMenuOpenModal(rolMenu: RolMenu): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${rolMenu['menu_name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(rolMenu);
        }
      });
  }

  editMenuNodeActionComponentOpenModal(rolMenu: RolMenu){
    const modalRef = this.modalService.open( EditMenuNodeActionComponent, rolMenu);
    modalRef.onResult().subscribe((closed) => {
      this.getRolMenuItemsToTable();
    });
  }

  tableRolMenuActions($event: EventAction<RolMenu>) {
    switch ($event.action) {

      case ActionGeneric.OPEN:
        this.editMenuNodeActionComponentOpenModal($event.dataModel);
        break;

      case ActionGeneric.EDIT:
        this.updateRolMenuOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteRolMenuOpenModal($event.dataModel);
        break;
    }
  }

  formAction($event){
    this.modalClose();
  }

}
