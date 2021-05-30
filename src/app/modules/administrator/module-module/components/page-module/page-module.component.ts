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
import { CreateModuleComponent } from '../create-module/create-module.component';
import { UpdateModuleComponent } from '../update-module/update-module.component';
import { Module } from '../../domain/module';
import { ModuleService } from '../../services/module.service';
@Component({
  selector: 'app-page-module',
  templateUrl: './page-module.component.html',
  styleUrls: ['./page-module.component.scss'],
})
export class PageModuleComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de Modules';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  modules: Module[] = [];
  tableModelModule: TableModel;

  columnsTable: ColumnModel[] = [
    { key: 'name_sistem', title: 'Sistema' },
    { key: 'name', title: 'Name' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  constructor(
    private moduleService: ModuleService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.moduleService.getModule().subscribe((resultGet) => {
      this.tableModelModule = new TableModel(

        this.columnsTable,
        this.actionsTable,
        resultGet,
      );
    });
  }
  createModuleOpenModal(): void {
    const modalRef = this.modalService.open(CreateModuleComponent);
    modalRef.onResult().subscribe((closed) => {
      this.tableModelModule.addModel(closed);
    });
  }
  updateModuleOpenModal(module: Module): void {
    const modalRef = this.modalService.open(UpdateModuleComponent, module);
    modalRef.onResult().subscribe((closed) => {
      this.tableModelModule.updateModel(closed);
    });
  }
  deleteServiceExecute(module: Module) {
    this.moduleService.deleteModule(module.id).subscribe(
      (resultDelete) => {
        this.tableModelModule.deleteModel(module);
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }
  DeleteModuleOpenModal(module: Module): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${name}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(module);
        }
      });
  }
  tableModuleActions($event: EventAction<Module>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateModuleOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteModuleOpenModal($event.dataModel);
        break;
    }
  }
}
