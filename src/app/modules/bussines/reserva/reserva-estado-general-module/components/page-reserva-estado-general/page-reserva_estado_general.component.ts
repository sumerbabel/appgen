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
import { CreateReservaEstadoGeneralComponent } from '../create-reserva-estado-general/create-reserva-estado-general.component';
//import { EditReservaEstadoGeneralComponent } from '../update-reserva-estado-general/update-reserva-estado-general.component';
import { ReservaEstadoGeneral } from '../../domain/reserva-estado-general';
import { ReservaEstadoGeneralService } from '../../services/reserva-estado-general.service';
@Component({
    selector: 'app-page-reserva_estado_general',
    templateUrl: './page-reserva_estado_general.component.html',
    styleUrls: ['./page-reserva_estado_general.component.scss'],
})
export class PageReservaEstadoGeneralComponent implements OnInit {
    TITLE_HEADER_FORM = 'Lista de Modules';
    ACTION_BUTTON_CREATE = ActionButton.CREATE;
    SHOW_CLOSE_BUTTON_FORM = false;
    reservaEstadoGeneral: ReservaEstadoGeneral[] = [];
    tableModelReservaEstadoGeneral: TableModel;
    columnsTable: ColumnModel[] = [
        { key: 'id', title: 'identificador unico uuid' },
        { key: 'name', title: 'Nombre estado' },
        { key: 'action', title: 'Acción', actionColum: true }
    ];
    actionsTable: ModelAction[] = [
        ActionButton.MINI_EDIT,
        ActionButton.MINI_DELETE,
    ];
    constructor(
        private reservaEstadoGeneralService: ReservaEstadoGeneralService,
        private alertService: AlertService,
        private dialogService: DialogService,
        private modalService: ModalService
    ) { }
    ngOnInit(): void {
        this.reservaEstadoGeneralService.get().subscribe((resultGet) => {
            this.tableModelReservaEstadoGeneral = new TableModel(
                this.columnsTable,
                this.actionsTable,
                resultGet,
            );
        });
    }
    createReservaEstadoGeneralOpenModal(): void {
        const modalRef = this.modalService.open(CreateReservaEstadoGeneralComponent);
        modalRef.onResult().subscribe((closed) => {
            this.tableModelReservaEstadoGeneral.addModel(closed);
        });
    }
    // updateReservaEstadoGeneralOpenModal(reservaEstadoGeneral: ReservaEstadoGeneral): void {
    // const modalRef = this.modalService.open(UpdateReservaEstadoGeneralComponent, reservaEstadoGeneral);
    // modalRef.onResult().subscribe((closed) => {
    // this.tableModelReservaEstadoGeneral.updateReservaEstadoGeneral(closed);
    // });
    // }
    deleteServiceExecute(reservaEstadoGeneral: ReservaEstadoGeneral) {
        this.reservaEstadoGeneralService.delete(reservaEstadoGeneral.id).subscribe(
            (resultDelete) => {
                this.tableModelReservaEstadoGeneral.deleteModel(reservaEstadoGeneral);
                this.alertService.openAlertSucsses(resultDelete);
            },
            (errorArray) => {
                this.alertService.openAlertWarning(errorArray);
            }
        );
    }
    DeleteReservaEstadoGeneralOpenModal(reservaEstadoGeneral: ReservaEstadoGeneral): void {
        this.dialogService
            .openDialog({
                title: 'Eliminar Registro',
                textDialog: `¿Está seguro de ELIMINAR el registro :  ${name}?`,
            })
            .subscribe((resulModal) => {
                if (resulModal === ActionGeneric.YES) {
                    this.deleteServiceExecute(reservaEstadoGeneral);
                }
            });
    }
    tableReservaEstadoGeneralActions($event: EventAction<ReservaEstadoGeneral>) {
        switch ($event.action) {
            // case ActionGeneric.EDIT:
            // this.updateReservaEstadoGeneralOpenModal($event.dataModel);
            // break;
            case ActionGeneric.DELETE:
                this.DeleteReservaEstadoGeneralOpenModal($event.dataModel);
                break;
        }
    }
}