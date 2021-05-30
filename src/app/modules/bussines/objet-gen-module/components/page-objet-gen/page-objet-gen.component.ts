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
import { CreateObjetGenComponent } from '../create-objet-gen/create-objet-gen.component';
import { UpdateObjetGenComponent } from '../update-objet-gen/update-objet-gen.component';
import { ObjetGen } from '../../domain/objet-gen';
import { ObjetGenService } from '../../services/objet-gen.service';
@Component({
  selector: 'app-page-objet-gen',
  templateUrl: './page-objet-gen.component.html',
  styleUrls: ['./page-objet-gen.component.scss']
})
export class PageObjetGenComponent implements OnInit {
TITLE_HEADER_FORM = "Lista de ObjetGens";
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
tableModelObjetGen: TableModel
columnsTable: ColumnModel[] = [
{ key: 'name', title: 'Name'},
{ key: 'field', title: 'Field'},
{ key: 'content', title: 'Content'},
{ key: 'order', title: 'Order'},
{ key: 'type', title: 'Type'},
{ key: 'length', title: 'Length'},
{ key: 'level', title: 'Level'},
{ key: 'selected', title: 'Selected'},
{ key: 'required', title: 'Required'},
{ key: 'updated_at', title: 'Fecha Act.' },
{ key: 'action', title: 'Acción', actionColum: true } ]
actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE
  ];
constructor(
    private objetGenService: ObjetGenService,
    private alertService: AlertService,
    private dialogService:DialogService,
    private modalService: ModalService) { }
ngOnInit(): void {
this.getObjetGenItemsToTable();
  }

getObjetGenItemsToTable(){
    this.objetGenService.getObjetGen().subscribe(
      resultGet => {
        let objetGens= resultGet;
        this.tableModelObjetGen = new TableModel(
         objetGens,
         this.columnsTable,
         this.actionsTable)
      }
    )
}
createObjetGenOpenModal(): void {
    const modalRef = this.modalService.open(CreateObjetGenComponent);
    modalRef.onResult().subscribe(closed => {
      this.getObjetGenItemsToTable();
  });
  }
updateObjetGenOpenModal(objetGen: ObjetGen ): void {
    const modalRef = this.modalService.open(UpdateObjetGenComponent, objetGen);
    modalRef.onResult().subscribe(closed => {
       this.getObjetGenItemsToTable();
});
  }
deleteServiceExecute(objetGen: ObjetGen) {
    this.objetGenService.deleteObjetGen(objetGen.id).subscribe(
      resultDelete => {
         this.getObjetGenItemsToTable();
        this.alertService.openAlertSucsses(resultDelete);
      },
      errorArray => {
        this.alertService.openAlertWarning(errorArray);
      }
    )
  }
DeleteObjetGenOpenModal(objetGen: ObjetGen): void {
    this.dialogService.openDialog({
      title: 'Eliminar Registro',
      textDialog: `¿Está seguro de ELIMINAR el registro :  ${objetGen['name']}?`
    }).subscribe(
      resulModal => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(objetGen)
        }
      }
    )
  }
tableObjetGenActions($event: EventAction<ObjetGen>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateObjetGenOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteObjetGenOpenModal($event.dataModel);
        break;
    }
  }
}
