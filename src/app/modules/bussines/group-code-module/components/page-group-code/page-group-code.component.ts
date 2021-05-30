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
import { CreateGroupCodeComponent } from '../create-group-code/create-group-code.component';
import { GroupCode } from '../../domain/group-code';
import { GroupCodeService } from '../../services/group-code.service';
@Component({
  selector: 'app-page-group-code',
  templateUrl: './page-group-code.component.html',
  styleUrls: ['./page-group-code.component.scss'],
})
export class PageGroupCodeComponent implements OnInit {
  TITLE_HEADER_FORM = 'Grupos de Código';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;

  tableModelGroupCode: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Name' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private groupCodeService: GroupCodeService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getGroupCodeItemsToTable();
  }

  getGroupCodeItemsToTable() {
    this.groupCodeService.getGroupCode().subscribe((resultGet) => {
      let groupCodes = resultGet;
      this.tableModelGroupCode = new TableModel(
        this.columnsTable,
        this.actionsTable,
        groupCodes
      );
    });
  }

  createGroupCodeOpenModal(): void {
    let object = { action: ActionGeneric.NEW, idGroupCode: '' };
    const modalRef = this.modalService.open(CreateGroupCodeComponent, object);
    modalRef.onResult().subscribe((closed) => {
      this.getGroupCodeItemsToTable();
    });
  }

  updateGroupCodeOpenModal(idGroupCode: string): void {
    let object = { action: ActionGeneric.UPDATE, idGroupCode: idGroupCode };

    const modalRef = this.modalService.open(CreateGroupCodeComponent, object);
    modalRef.onResult().subscribe((closed) => {
      this.getGroupCodeItemsToTable();
    });
  }

  deleteServiceExecute(groupCode: GroupCode) {
    this.groupCodeService.deleteGroupCode(groupCode.id).subscribe(
      (resultDelete) => {
        this.getGroupCodeItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteGroupCodeOpenModal(groupCode: GroupCode): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${groupCode['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(groupCode);
        }
      });
  }

  tableGroupCodeActions($event: EventAction<GroupCode>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateGroupCodeOpenModal($event.dataModel.id);
        break;
      case ActionGeneric.DELETE:
        this.DeleteGroupCodeOpenModal($event.dataModel);
        break;
    }
  }
}
