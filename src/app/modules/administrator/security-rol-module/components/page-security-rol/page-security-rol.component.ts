import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { DataModel } from '@sharedModule/models-core/data-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateSecurityRolComponent } from '../create-security-rol/create-security-rol.component';
import { UpdateSecurityRolComponent } from '../update-security-rol/update-security-rol.component';
import { SecurityRol } from '../../domain/security-rol';
import { SecurityRolService } from '../../services/security-rol.service';
import { PageRolMenuComponent } from '../../../rol-menu-module/components/page-rol-menu/page-rol-menu.component';
import { AccountService } from 'src/app/modules/core/security/service/account.service';

@Component({
  selector: 'app-page-security-rol',
  templateUrl: './page-security-rol.component.html',
  styleUrls: ['./page-security-rol.component.scss'],
})

export class PageSecurityRolComponent implements OnInit {
  TITLE_HEADER_FORM = 'Roles';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  tableModelSecurityRol: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'sistem', title: 'Sistema' },
    { key: 'name', title: 'Nombre' },
    { key: 'desciption', title: 'Descripción' },
    { key: 'name_type', title: 'Tipo' },
    { key: 'name_state', title: 'Estado' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_OPEN,
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private securityRolService: SecurityRolService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getSecurityRolItemsToTable();
    console.log('sesion menu',this.accountService.getMenuSession())
  }

  getSecurityRolItemsToTable() {
    this.securityRolService.getSecurityRol().subscribe((resultGet) => {
      let securityRols = resultGet;
      this.tableModelSecurityRol = new TableModel(

        this.columnsTable,
        this.actionsTable,
        securityRols,
      );
    });
  }

  createSecurityRolOpenModal(): void {
    const modalRef = this.modalService.open(CreateSecurityRolComponent);
    modalRef.onResult().subscribe((closed) => {
      this.getSecurityRolItemsToTable();
    });
  }

  updateSecurityRolOpenModal(securityRol: SecurityRol): void {
    const modalRef = this.modalService.open(
      UpdateSecurityRolComponent,
      securityRol
    );
    modalRef.onResult().subscribe((closed) => {
      this.getSecurityRolItemsToTable();
    });
  }

  deleteServiceExecute(securityRol: SecurityRol) {
    this.securityRolService.deleteSecurityRol(securityRol.id).subscribe(
      (resultDelete) => {
        this.getSecurityRolItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteSecurityRolOpenModal(securityRol: SecurityRol): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${securityRol['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(securityRol);
        }
      });
  }

  PageRolMenuComponentOpenModal(securityRol: SecurityRol): void {
    const modalRef = this.modalService.open(
        PageRolMenuComponent,
      securityRol
    );
    modalRef.onResult().subscribe((closed) => {
      this.getSecurityRolItemsToTable();
    });
  }

  tableSecurityRolActions($event: EventAction<SecurityRol>) {
    switch ($event.action) {
      case ActionGeneric.OPEN:
        this.PageRolMenuComponentOpenModal($event.dataModel);
        break;
      case ActionGeneric.EDIT:
        this.updateSecurityRolOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteSecurityRolOpenModal($event.dataModel);
        break;
    }
  }
}
