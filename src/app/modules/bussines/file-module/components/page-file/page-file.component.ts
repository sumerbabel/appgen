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
import { CreateFileComponent } from '../create-file/create-file.component';
import { UpdateFileComponent } from '../update-file/update-file.component';
import { FileApp } from '../../domain/fileApp';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-page-file',
  templateUrl: './page-file.component.html',
  styleUrls: ['./page-file.component.scss'],
})
export class PageFileComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de Files';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  tableModelFile: TableModel;
  columnsTable: ColumnModel[] = [
    { key: 'idAsociate', title: 'IdAsociate' },
    { key: 'idGroupType', title: 'IdGroupType' },
    { key: 'idFileType', title: 'IdFileType' },
    { key: 'pathBase', title: 'PathBase' },
    { key: 'pathRelative', title: 'PathRelative' },
    { key: 'fileName', title: 'FileName' },
    { key: 'originalFileName', title: 'OriginalFileName' },
    { key: 'size', title: 'Size' },
    { key: 'extencion', title: 'Extencion' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];
  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];
  constructor(
    private fileService: FileService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getFileItemsToTable();
  }

  getFileItemsToTable() {
    this.fileService.getFile().subscribe((resultGet) => {
      let files = resultGet;
      this.tableModelFile = new TableModel(
        this.columnsTable,
        this.actionsTable,
        files
      );
    });
  }

  createFileOpenModal(): void {
    const modalRef = this.modalService.open(CreateFileComponent);
    modalRef.onResult().subscribe((closed) => {
      this.getFileItemsToTable();
    });
  }
  updateFileOpenModal(file: FileApp): void {
    const modalRef = this.modalService.open(UpdateFileComponent, file);
    modalRef.onResult().subscribe((closed) => {
      this.getFileItemsToTable();
    });
  }
  deleteServiceExecute(file: FileApp) {
    this.fileService.deleteFile(file.id).subscribe(
      (resultDelete) => {
        this.getFileItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }
  DeleteFileOpenModal(file: FileApp): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${file['name']}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(file);
        }
      });
  }
  tableFileActions($event: EventAction<FileApp>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateFileOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteFileOpenModal($event.dataModel);
        break;
    }
  }
}
